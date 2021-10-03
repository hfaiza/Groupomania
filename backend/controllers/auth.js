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
    const newUser = await User.findOne({ where: { email: user.email } });
    const token = jwt.sign({ userId: newUser.user_id, admin: newUser.admin }, "SECRET_TOKEN", { expiresIn: "24h" });
    res.status(201).json({ token: token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Connexion à un compte
const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Aucun compte n'est associé à cette adresse e-mail ou le mot de passe est incorrect." });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res
        .status(401)
        .json({ error: "Aucun compte n'est associé à cette adresse e-mail ou le mot de passe est incorrect." });
    }
    const token = jwt.sign({ userId: user.user_id, admin: user.admin }, "SECRET_TOKEN", { expiresIn: "24h" });
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Exportation des middlewares
exports.signup = signup;
exports.login = login;
