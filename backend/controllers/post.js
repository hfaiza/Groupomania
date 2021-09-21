// Importation de File System
const fs = require("fs");

// Importation des fichiers nécessaires
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

// Associations
Post.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// Ajout d'une publication
const createPost = async (req, res) => {
  try {
    let image;
    if (!req.file) {
      image = null;
    } else {
      image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    const post = await Post.build({
      user_id: req.user,
      post_date: Date.now(),
      post_content: req.body.postContent,
      image_url: image,
    });

    await post.save();
    res.status(201).json({ message: "Publication enregistrée !" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Obtention de toutes les publications
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        required: true,
      },
      order: [["post_date", "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Obtention de tous les commentaires d'une publication
const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.id },
      include: {
        model: User,
        required: true,
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Suppression d'une publication
const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { post_id: req.params.id } });
    if (post.image_url != null) {
      const filename = post.image_url.split("/images/")[1];
      fs.unlink(`images/${filename}`, (error) => {
        if (error) {
          return res.status(400).json({ error });
        }
      });
    }
    await post.destroy();
    return res.status(200).json({ message: "Publication supprimée !" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Exportation des middlewares
exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
exports.getPostComments = getPostComments;
exports.deletePost = deletePost;
