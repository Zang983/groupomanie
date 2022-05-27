const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


const Commentaire = sequelize.define("commentaire",{
    idCommentaire:{ type: DataTypes.INTEGER, primaryKey: true },
    contenu:DataTypes.TEXT,
    lock:DataTypes.BOOLEAN,
    },
    {
        tableName:"Commentaires",
        updatedAt:"dateDernierEdit",
        createdAt:"dateCreation",
    }, 
);

Commentaire.associate = (models) =>{
    Commentaire.belongsTo(users)
}
Commentaire.associate = (models) =>{
    Commentaire.belongsTo(post)
}
module.exports=Commentaire;