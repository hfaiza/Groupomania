// Importation des modules nécessaires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importation du fichier nécessaire
const User = require("../models/user");

// Création d'un compte
const signup = async (req, res) => {
  try {
    let image;
    if (!req.file) {
      image = `${req.protocol}://${req.get("host")}/images/default.jpg`;
    } else {
      image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = User.build({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      user_picture: image,
    });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Connexion à un compte
const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé ou mot de passe incorrect !" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Utilisateur non trouvé ou mot de passe incorrect !" });
    }
    const token = jwt.sign({ userId: user.user_id }, "SECRET_TOKEN", { expiresIn: "24h" });
    res.status(200).json({ userId: user.user_id, token: token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Exportation des middlewares
exports.signup = signup;
exports.login = login;
