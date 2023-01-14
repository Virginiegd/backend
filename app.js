// Importe
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Sécurise l'application Express en définissant divers en-têtes HTTP
const helmet = require('helmet');

// Charge les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

// Importe les routeurs 
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

/**Enregistre les routes
 * bodParser analyse les corps de requête entrants dans un middleware 
 * avant les gestionnaires, disponibles sous la req.bodypropriété
 */
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Indique qu'il faut gérer la ressource image de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


// Permet d'exporter l'application
module.exports = app;