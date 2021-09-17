// Importation d'Express
const express = require("express");

// Importation des fichiers nécessaires
const commentController = require("../controllers/comment");
const auth = require("../middleware/auth");
const checkId = require("../middleware/check-user-rights");
const validity = require("../middleware/check-text");

// Création du routeur
const router = express.Router();

// Création des routes
router.post("/", auth, validity.checkContent, commentController.commentPost);
router.delete("/:id", auth, checkId.deleteContent, commentController.deleteComment);

// Exportation du routeur
module.exports = router;
