// Importation de Sequelize
const Sequelize = require("sequelize");
const sequelize = require("../database");

// Modèle publication
const Post = sequelize.define(
  "Posts",
  {
    post_id: { type: Sequelize.MEDIUMINT.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
    user_id: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false },
    post_date: { type: Sequelize.DATE, allowNull: false, required: true },
    post_content: { type: Sequelize.TEXT, allowNull: false, required: true },
    image_url: { type: Sequelize.STRING, allowNull: true },
  },
  {
    timestamps: false,
  }
);

// Exportation du modèle
module.exports = Post;
