// Vérifie la validité du commentaire
module.exports = (req, res, next) => {
  try {
    const comment = req.body.commentContent;
    const regex = /^[a-z0-9A-ZÀ-ÖØ-öø-ÿ,' !.-:]{20,1000}$/;
    if (regex.test(comment) == false) {
      res.status(400).json({ error: "Les données du commentaire sont invalides." });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Requête invalide." });
  }
};
