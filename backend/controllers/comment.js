// Importation du fichier nécessaire
const Comment = require('../models/comment')

// Commenter une publication
const commentPost = async (req, res) => {
  try {
    const comment = await Comment.build({
      post_id: req.body.postId,
      user_id: req.user,
      comment_date: Date.now(),
      comment_content: req.body.commentContent
    })
    await comment.save()
    res.status(201).json({ message: 'Commentaire enregistré !' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// Supprimer un commentaire
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { comment_id: req.params.id } })
    await comment.destroy()
    res.status(200).json({ message: 'Commentaire supprimé !' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// Exportation des middlewares
exports.commentPost = commentPost
exports.deleteComment = deleteComment
