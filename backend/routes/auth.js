// Importation des modules nécessaires
const express = require("express");
const rateLimit = require("express-rate-limit");

// Importation des fichiers nécessaires
const authController = require("../controllers/auth");
const multer = require("../middleware/multer-config");
const validity = require("../middleware/check-user-data");

// Pour limiter le nombre de requêtes lors de la connexion
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

// Création du routeur
const router = express.Router();

// Création des routes
router.post("/signup", multer, validity.checkNewUser, authController.signup);
router.post("/login", limiter, authController.login);

// Exportation du routeur
module.exports = router;
