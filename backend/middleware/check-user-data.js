// Importation de File System
const fs = require("fs");

// Pour supprimer l'image du dossier si les données de l'utilisateur sont invalides
const deleteImage = (req) => {
  if (req.file) {
    fs.unlink(`images/${req.file.filename}`, (error) => {
      if (error) throw error;
    });
  }
};

// Vérifie la validité du prénom et du nom
const checkNames = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,80}$/;
  if (regex.test(firstName) == false || regex.test(lastName) == false) {
    deleteImage(req);
    return false;
  }
  return true;
};

// Vérifie la validité de l'e-mail
const checkEmail = (req, res) => {
  const email = req.body.email;
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@groupomania.com$/;
  if (regex.test(email) == false) {
    deleteImage(req);
    return false;
  }
  return true;
};

// Vérifie la validité du mot de passe
const checkPassword = (req, res) => {
  const password = req.body.password;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
  if (regex.test(password) == false) {
    deleteImage(req);
    return false;
  }
  return true;
};

// Exécute les fonctions de vérification lors de la création d'un compte
const checkNewUser = (req, res, next) => {
  try {
    if (checkNames(req, res) == false) {
      return res.status(400).json({ error: "Prénom et/ou nom invalide(s)." });
    } else if (checkEmail(req, res) == false) {
      return res.status(400).json({ error: "E-mail invalide (le nom de domaine est groupomania.com)." });
    } else if (checkPassword(req, res) == false) {
      return res.status(400).json({
        error:
          "Mot de passe invalide. Il doit contenir une majuscule, une minuscule, un chiffre, un caractère spécial, et entre 8 et 64 caractères.",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "Requête invalide." });
  }
};

// Exécute les fonctions de vérification lors de la modification d'un profil
const checkUpdatedUser = (req, res, next) => {
  try {
    if (checkNames(req, res) == false) {
      return res.status(400).json({ error: "Prénom et/ou nom invalide(s)." });
    }
    if (req.body.password !== undefined && checkPassword(req, res) == false) {
      return res.status(400).json({
        error:
          "Mot de passe invalide. Il doit contenir une majuscule, une minuscule, un chiffre, un caractère spécial, et entre 8 et 64 caractères.",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "Requête invalide." });
  }
};

// Exportation des middlewares
exports.checkNewUser = checkNewUser;
exports.checkUpdatedUser = checkUpdatedUser;
