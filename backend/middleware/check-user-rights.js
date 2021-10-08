// Vérifie l'id de l'user souhaitant supprimer une publication ou un commentaire
const deleteOrUpdateData = async (req, res, next, model, id) => {
  try {
    const Model = require(`../models/${model}`)
    const content = await Model.findOne({ where: { [id]: req.params.id } })
    const contentCreator = content.user_id

    const contentEditor = req.user

    const User = require('../models/user')
    const editor = await User.findOne({ where: { user_id: contentEditor } })

    if (
      (req.baseUrl === '/api/users' && contentEditor === contentCreator) ||
      (req.baseUrl !== '/api/users' && (contentEditor === contentCreator || editor.admin === 1))
    ) {
      next()
    } else {
      res.status(403).json({ error: 'Vous n\'avez pas les droits requis pour effectuer cette action.' })
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const checkUserRights = async (req, res, next) => {
  try {
    if (req.baseUrl === '/api/users') {
      deleteOrUpdateData(req, res, next, 'User', 'user_id')
    } else if (req.baseUrl === '/api/posts') {
      deleteOrUpdateData(req, res, next, 'Post', 'post_id')
    } else if (req.baseUrl === '/api/comments') {
      deleteOrUpdateData(req, res, next, 'Comment', 'comment_id')
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

// Exportation du middleware
exports.checkUserRights = checkUserRights
