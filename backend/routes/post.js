// Importation d'Express
const express = require('express')

// Importation des fichiers nécessaires
const postController = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const userId = require('../middleware/check-user-rights')
const validity = require('../middleware/check-text')

// Création du routeur
const router = express.Router()

// Création des routes
router.post('/', auth, multer, validity.checkContent, postController.createPost)
router.get('/', auth, postController.getAllPosts)
router.delete('/:id', auth, userId.checkUserRights, postController.deletePost)

// Exportation du routeur
module.exports = router
