// Importation du fichier nécessaire
const User = require("../models/user");

// Importation de JSON Web Token
const jwt = require("jsonwebtoken");

// Vérifie l'id de l'user souhaitant modifier/supprimer un profil
module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    const userCreator = user.user_id;

    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, "SECRET_TOKEN");
    const userEditor = decodedToken.userId;

    if (userEditor != userCreator) {
      res.status(403).json({ error: "Vous ne pouvez pas modifer ou supprimer ce profil." });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
