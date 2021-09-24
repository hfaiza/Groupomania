// Importation d'Express
const express = require("express");

// Importation des fichiers nécessaires
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const userId = require("../middleware/check-user-rights");
const validity = require("../middleware/check-user-data");

// Création du routeur
const router = express.Router();

// Création des routes
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);
router.get("/:id/posts", auth, userController.getUserPosts);
router.put("/:id", auth, userId.checkUserRights, multer, validity.checkUpdatedUser, userController.modifyProfile);
router.delete("/:id", auth, userId.checkUserRights, userController.deleteAccount);

// Exportation du routeur
module.exports = router;
