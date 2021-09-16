// Importation de Sequelize
const Sequelize = require("sequelize");
const sequelize = require("../database");

// Modèle commentaire
const Comment = sequelize.define(
  "Comments",
  {
    comment_id: { type: Sequelize.MEDIUMINT.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
    post_id: { type: Sequelize.MEDIUMINT.UNSIGNED, allowNull: false },
    user_id: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false },
    comment_date: { type: Sequelize.DATE, allowNull: false, required: true },
    comment_content: { type: Sequelize.TEXT, allowNull: false, required: true },
  },
  {
    timestamps: false,
  }
);

// Exportation du modèle
module.exports = Comment;
