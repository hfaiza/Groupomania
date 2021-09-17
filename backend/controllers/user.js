// Importation des modules nécessaires
const bcrypt = require("bcrypt");
const fs = require("fs");

// Importation des fichiers nécessaires
const User = require("../models/user");
const Post = require("../models/post");

// Obtention de tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Obtention d'un utilisateur
const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Obtention de toutes les publications d'un utilisateur
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { user_id: req.params.id } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Modification du profil
const modifyProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });

    let image;
    if (!req.file) {
      image = user.user_picture;
    } else {
      const filename = user.user_picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, (error) => {
        if (error) {
          return res.status(400).json({ error });
        }
      });
      image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    let hashedPassword;
    if (req.body.password == undefined) {
      hashedPassword = user.password;
    } else {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    user.first_name = req.body.firstName;
    user.last_name = req.body.lastName;
    user.password = hashedPassword;
    user.user_picture = image;
    await user.save();
    res.status(200).json({ message: "Profil mis à jour !" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Suppression d'un compte
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (user.user_picture != `${req.protocol}://${req.get("host")}/images/default.jpg`) {
      const filename = user.user_picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, (error) => {
        if (error) {
          return res.status(400).json({ error });
        }
      });
    }
    await user.destroy();
    res.status(200).json({ message: "Compte supprimé !" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Exportation des middlewares
exports.getAllUsers = getAllUsers;
exports.getOneUser = getOneUser;
exports.getUserPosts = getUserPosts;
exports.modifyProfile = modifyProfile;
exports.deleteAccount = deleteAccount;
