// Importation de Sequelize
const Sequelize = require("sequelize");
const sequelize = require("../database");

// Modèle utilisateur
const User = sequelize.define(
  "Users",
  {
    user_id: { type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
    first_name: { type: Sequelize.STRING(100), allowNull: false, required: true },
    last_name: { type: Sequelize.STRING(100), allowNull: false, required: true },
    email: { type: Sequelize.STRING(100), allowNull: false, unique: true, required: true },
    password: { type: Sequelize.STRING(80), allowNull: false, required: true },
    user_picture: { type: Sequelize.STRING, allowNull: false, required: true },
    admin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    timestamps: false,
  }
);

// Exportation du modèle
module.exports = User;
