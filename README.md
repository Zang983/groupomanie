# groupomanie

## Project setup
```
Dans un premier terminal ouvert dans le dossier racine du projet effectuer la commande suivante : 
- npm install 
suivi de la commande 
- npm run serve

Dans un second terminal ouvert cette fois dans le dossier /backend du projet effectuer la commande suivante : 
-npm install

Un fichier .env, à la racine du dossier backend, contient les différentes variables d'environnement que vous devez personnaliser selon votre configuration.

Les variables username, password et dbName dépendent de votre configuration mysql.
Concernant la base de donnée une sauvegarde "DUMP.sql" est présente à la racine du projet, vous devrez l'importer via MySQL Workbench par exemple.
Vous pouvez également créer une base de donnée vierge grâce au script de création présent également à la racine.
Auquel cas vous pouvez supprimer les images actuellement présente dans le dossier backend/images.

La variable jwtKey doit être identique à la chaîne de caractère présente dans la partie login du controller user.

Une fois le fichier éditer dans le terminal ouvert dans le dossier backend vous pouvez effectuer la commande : 

nodemon start ou node server.js

Normalement l'intégralité du site est disponible à l'adresse http://localhost:8080, toutefois selon l'occupation de vos ports l'accès est indiqué dans le terminal côté front.

D'autres commande sont disponible comme npm run build permettant de compiler et minifier le code afin de le faire entrer en production.
