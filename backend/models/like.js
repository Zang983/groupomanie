const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });
  const user=require ("./user")
  const commentaire= require("./commentaires")


const like = sequelize.define('like',{
    users_idUser:{
        type:DataTypes.INTEGER,
        references:{
            model:user,
            key:'idUser'
        }
    },
    Commentaires_idCommentaire:{
        type:DataTypes.INTEGER,
        references:{
            model:commentaire,
            key:'idCommentaire'
        }
    },
},
)
module.exports=like;