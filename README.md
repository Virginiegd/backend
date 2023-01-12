<h1>Backend</h1>
<h2>Piiquante</h2>
<h3>Commandes pour lancer le backend :</h3>
<ul>
    <li>cd backend</li>
    <li>npm init : index.js => server.js (pour initier le projet)</li>
    <li>nodemon server (pour démarrer le backend)</li>
</ul>

<h3>Dépendances à installer :</h3>
<ul>
    <li>npm install express</li>
    <li>npm install mongoose (pour faire le lien avec la base de données)</li>
    <li>npm install mongoose-unique-validator (email unique)</li>
    <li>npm install bcrypt (fonction de hachage)</li>
    <li>npm install jsonwebtoken (pour la création du token)</li>
    <li>npm install multer (pour la gestion des images)</li>
    <li>npm install dotenv --save (pour les variables environnement)</li>
    <li>npm install password-validator (pour la création des mots de passe)</li>
    <li>npm install email-validator (pour la gestion des adresses emails)</li>
    <li>npm install helmet (pour sécuriser l'application)</li>
    <li>npm install mongoose-mongodb-errors --save</li>
</ul>

<h3>Créer:</h3>
<ul>
    <li> un dossier images</li>
    <li> un dossier node_modules</li>
</ul>

<h3>Pour modifier les codes d'accès à la base de données (fichier .env) :</h3>
<ul>
    <li>PORT = 3000</li>
    <li>DB_USERPASS = user1:050186 (utilisateur:motdepasse)</li>
    <li>DB_CLUSTER = cluster0.0goscdu (nom du cluster)</li>
</ul>



