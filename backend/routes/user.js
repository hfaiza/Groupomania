// Importation d'Express
const express = require("express");

// Importation des fichiers nécessaires
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/pp-multer-config");
const checkId = require("../middleware/check-user-id");
const validity = require("../middleware/check-user-data");

// Création du routeur
const router = express.Router();

// Création des routes
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);
router.get("/:id/posts", auth, userController.getUserPosts);
router.put("/:id", auth, checkId, multer, validity.checkUpdatedUser, userController.modifyProfile);
router.delete("/:id", auth, checkId, userController.deleteAccount);

// Exportation du routeur
module.exports = router;
