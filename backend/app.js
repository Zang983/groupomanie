const express = require('express');
const postsRoutes = require('./routes/posts');
const ceRoutes= require('./routes/messageCE');
const userRoutes = require('./routes/user');
const commentRoutes=require('./routes/comments')
const path = require('path');
const helmet = require("helmet")
const cors = require("cors")



const app = express();//création de la fonction express permettant de créer le serveur.



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());//permet d'écouter les requêtes avec un content-type JSON cela le met dans req.body
app.use(helmet());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/auth/', userRoutes);
app.use('/api/',commentRoutes)
app.use('/api/',ceRoutes)
module.exports = app;
