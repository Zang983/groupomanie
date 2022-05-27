const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });
  const user=require ("./user")
  const posts= require("./post")


const aimer = sequelize.define('aimer',{
    users_idUser:{
        type:DataTypes.INTEGER,
        references:{
            model:user,
            key:'idUser'
        }
    },
    posts_idPosts:{
        type:DataTypes.INTEGER,
        references:{
            model:post,
            key:'idPosts'
        }
    }
})
module.exports=aimer;