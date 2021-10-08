// Importation de Sequelize
const Sequelize = require('sequelize')

// Accès aux variables d'environnement
const DB_USER = process.env.DATABASE_USER
const DB_PASSWORD = process.env.DATABASE_PASSWORD
const DB_HOST = process.env.DATABASE_HOST
const DB_DIALECT = process.env.DATABASE_DIALECT

// Connexion à MySQL et exportation de sequelize
const sequelize = new Sequelize('groupomania', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
})
module.exports = sequelize
