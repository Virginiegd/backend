# backend
<h1>Piiquante</h1>
<h2>Commandes pour lancer le backend :</h2>
<ul>
<li>cd backend</li>
<li>nodemon server pour démarrer le backend</li>
<ul>

Dépendances à installer :
npm install express
npm install mongoose pour faire le lien avec la base de données
npm install mongoose-unique-validator ( email unique)
npm install bcrypt (fonction de hachage)
npm install jsonwebtoken pour la création du token
npm install multer pour la gestion des images
npm install dotenv --save pour les variables environnement
npm install password-validator pour la création des mots de passe
npm install email-validator pour la gestion des adresses emails
npm install helmet pour sécuriser l'application

Pour modifier les codes d'accès à la base de données :
.env : 
PORT = 3000
DB_USERPASS = user1:050186 (utilisateur:motdepasse)
DB_CLUSTER = cluster0.0goscdu (nom du cluster)

