// Importation d'Express
const express = require("express");

// Importation des fichiers nécessaires
const postController = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/post-multer-config");
const checkId = require("../middleware/check-user-rights");
const checkContent = require("../middleware/check-post");

// Création du routeur
const router = express.Router();

// Création des routes
router.post("/", auth, multer, checkContent, postController.createPost);
router.get("/", auth, postController.getAllPosts);
router.get("/:id/comments", auth, postController.getPostComments);
router.delete("/:id", auth, checkId.deleteContent, postController.deletePost);

// Exportation du routeur
module.exports = router;
