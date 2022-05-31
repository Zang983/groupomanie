const express = require('express');
const postsRoutes = require('./routes/posts');
const ceRoutes= require('./routes/messageCE');
const userRoutes = require('./routes/user');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
  host: 'localhost',
  dialect: 'mysql',
});
const posts=require ("./models/CE")

const app = express();//création de la fonction express permettant de créer le serveur.
app.use(express.json());//permet d'écouter les requêtes avec un content-type JSON cela le met dans req.body


sequelize.authenticate().then(console.log("Connexion à la BDD réussie")).catch(error=>console.log(error))


app.use((req, res, next) => {
  console.log(posts)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/',ceRoutes)
module.exports = app;
