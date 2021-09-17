// Vérifie l'id de l'user souhaitant supprimer une publication ou un commentaire
const deletePostOrComment = async (req, res, next, model, id) => {
  try {
    const Model = require(`../models/${model}`);
    const object = await Model.findOne({ where: { [id]: req.params.id } });
    const objectCreator = object.user_id;

    const objectEditor = req.user;

    const User = require("../models/user");
    const user = await User.findOne({ where: { user_id: objectEditor } });

    if (objectEditor == objectCreator || user.admin == 1) {
      next();
    } else {
      res.status(403).json({ error: "Vous ne pouvez pas supprimer cette publication ou ce commentaire." });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteContent = async (req, res, next) => {
  try {
    if (req.baseUrl == `/api/posts`) {
      deletePostOrComment(req, res, next, "Post", "post_id");
    } else if (req.baseUrl == `/api/comments`) {
      deletePostOrComment(req, res, next, "Comment", "comment_id");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Exportation du middleware
exports.deleteContent = deleteContent;
