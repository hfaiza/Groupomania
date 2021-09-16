// Importation de Sequelize
const Sequelize = require("sequelize");

// Accès aux variables d'environnement
const DB_USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;

// Connexion à MySQL et exportation de sequelize
const sequelize = new Sequelize("groupomania", DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;

// Teste la connexion à MySQL
const mysqlConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à MySQL réussie !");
  } catch (error) {
    console.error("Connexion à MySQL échouée !", error);
  }
};
mysqlConnect();
