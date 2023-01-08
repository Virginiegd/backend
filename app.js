// Importe
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connection à la base de donnée
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USERPASS}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Crée une application express  
const app = express();

// Middleware pour régler les erreurs de CORS qui bloque les appels entre deux serveurs différents
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Permet d'exporter l'application
module.exports = app;