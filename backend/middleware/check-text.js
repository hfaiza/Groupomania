// Importation de File System
const fs = require("fs");

// Pour supprimer l'image du dossier si les données de la publication sont invalides
const deleteImage = (req) => {
  if (req.file) {
    fs.unlink(`images/${req.file.filename}`, (error) => {
      if (error) throw error;
    });
  }
};

// Vérifie la validité de la publication ou du commentaire
const checkPostOrComment = (req, res, next, data) => {
  const regex = /^[a-z0-9A-ZÀ-ÖØ-öø-ÿ,' !.-:]{20,1000}$/;
  if (regex.test(data) == false && req.body.postContent) {
    deleteImage(req);
    res.status(400).json({ error: "Les données de la publication sont invalides." });
  } else if (regex.test(data) == false) {
    res.status(400).json({ error: "Les données du commentaire sont invalides." });
  } else {
    next();
  }
};

const checkContent = async (req, res, next) => {
  try {
    if (req.body.commentContent) {
      const data = req.body.commentContent;
      checkPostOrComment(req, res, next, data);
    } else if (req.body.postContent) {
      const data = req.body.postContent;
      checkPostOrComment(req, res, next, data);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Exportation du middleware
exports.checkContent = checkContent;
