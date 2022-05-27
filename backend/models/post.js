const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


const Post = sequelize.define("post",{
    idPosts:{ type: DataTypes.INTEGER, primaryKey: true },
    titre:DataTypes.STRING,
    contenu:DataTypes.TEXT,
    url_image:DataTypes.STRING,
    lock:DataTypes.BOOLEAN,
    },
    {
        tableName:"posts",
        updatedAt:"dateDernierEdit",
        createdAt:"dateCreation",
    }, 
);

module.exports=Post;