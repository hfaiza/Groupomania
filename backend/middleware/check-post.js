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

// Vérifie la validité de la publication
module.exports = (req, res, next) => {
  try {
    const post = req.body.postContent;
    const regex = /^[a-z0-9A-ZÀ-ÖØ-öø-ÿ,' !.-:]{20,1000}$/;
    if (regex.test(post) == false) {
      deleteImage(req);
      res.status(400).json({ error: "Les données de la publication sont invalides." });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Requête invalide." });
  }
};
