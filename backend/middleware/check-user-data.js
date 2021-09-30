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

// Pour tester les données de la requête
const regexTest = (req, regex, data) => {
  if (regex.test(data) == false) {
    deleteImage(req);
    return false;
  }
};

// Vérifie la validité du prénom et du nom
const checkNames = (req) => {
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,80}$/;
  if ((regexTest(req, regex, req.body.firstName) || regexTest(req, regex, req.body.lastName)) == false) {
    return false;
  }
};

// Vérifie la validité de l'e-mail
const checkEmail = (req) => {
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@groupomania.com$/;
  if (regexTest(req, regex, req.body.email) == false) {
    return false;
  }
};

// Vérifie la validité du mot de passe
const checkPassword = (req) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
  if (regexTest(req, regex, req.body.password) == false) {
    return false;
  }
};

// Exécute les fonctions de vérification lors de la création d'un compte
const checkNewUser = (req, res, next) => {
  try {
    if (checkNames(req) == false) {
      return res.status(400).json({ error: "Merci de renseigner un nom et prénom valides." });
    } else if (checkEmail(req) == false) {
      return res.status(400).json({ error: "Merci de renseigner votre e-mail professionnel (@groupomania.com)." });
    } else if (checkPassword(req) == false) {
      return res.status(400).json({
        error:
          "Merci de renseigner un mot de passe entre 8 et 64 caractères, contenant au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
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
    if (checkNames(req) == false) {
      return res.status(400).json({ error: "Merci de renseigner un nom et prénom valides." });
    } else if (req.body.password !== "0" && checkPassword(req) == false) {
      return res.status(400).json({
        error:
          "Merci de renseigner un mot de passe entre 8 et 64 caractères, contenant au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
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
