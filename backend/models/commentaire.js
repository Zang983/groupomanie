const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


const Commentaire = sequelize.define("commentaire",{
    idCommentaire:{ type: DataTypes.INTEGER, primaryKey: true },
    contenu:DataTypes.TEXT,
    lockStatus:DataTypes.BOOLEAN,    
    posts_idPosts:{type: DataTypes.INTEGER, allowNull:true},
    users_idUser:{type: DataTypes.INTEGER, allowNull:true},
    },
    {
        tableName:"Commentaires",
        updatedAt:"dateDernierEdit",
        createdAt:"dateCreation",
    }, 

);

// Commentaire.associate = (models) =>{
//     Commentaire.belongsTo(users)
// }
// Commentaire.associate = (models) =>{
//     Commentaire.belongsTo(post)
// }
module.exports=Commentaire;