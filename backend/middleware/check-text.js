// Importation de File System
const fs = require('fs')

// Pour supprimer l'image du dossier si les données de la publication sont invalides
const deleteImage = (req) => {
  if (req.file) {
    fs.unlink(`images/${req.file.filename}`, (error) => {
      if (error) throw error
    })
  }
}

// Vérifie la validité de la publication ou du commentaire
const checkPostOrComment = (req, res, next, data) => {
  const regex = /^[a-z0-9A-ZÀ-ÖØ-öø-ÿ,' !.-:;\n]{20,1000}$/
  if (req.body.postContent && (data.length === 0 || regex.test(data) === false)) {
    deleteImage(req)
    res.status(400).json({
      error: 'Votre publication doit contenir entre 20 et 1000 caractères. Certains symboles ne sont pas acceptés.'
    })
  } else if (data.length === 0 || regex.test(data) === false) {
    res.status(400).json({
      error: 'Votre commentaire doit contenir entre 20 et 1000 caractères. Certains symboles ne sont pas acceptés.'
    })
  } else {
    next()
  }
}

const checkContent = async (req, res, next) => {
  try {
    if (req.body.commentContent) {
      const data = req.body.commentContent.trim()
      checkPostOrComment(req, res, next, data)
    } else if (req.body.postContent) {
      const data = req.body.postContent.trim()
      checkPostOrComment(req, res, next, data)
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

// Exportation du middleware
exports.checkContent = checkContent
