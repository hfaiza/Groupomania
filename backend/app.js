// Importation des modules nécessaires
const express = require('express')
const path = require('path')
require('dotenv').config()

// Importation des fichiers nécessaires
const sequelize = require('./database')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const userRoutes = require('./routes/user')

// Accès aux variables d'environnement
const ORIGIN = process.env.ALLOW_ORIGIN

// Création de l'application
const app = express()

// Teste la connexion à MySQL
const mysqlConnect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connexion à MySQL réussie !')
  } catch (error) {
    console.error('Connexion à MySQL échouée !', error)
  }
}
mysqlConnect()

// Ajout des headers nécessaires
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ORIGIN)
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

// Pour extraire l'objet JSON des requêtes entrantes
app.use(express.json())

// Enregistrement des routes
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/users', userRoutes)

// Exportation de l'application
module.exports = app
