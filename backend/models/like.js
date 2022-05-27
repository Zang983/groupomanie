const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


const Commentaire = sequelize.define("like",{
    idCommentaire:{ type: DataTypes.INTEGER, primaryKey: true },
    contenu:DataTypes.TEXT,
    lock:DataTypes.BOOLEAN,
    },
    {
        tableName:"users",
        timestamps: false ,
    }, 
);

module.exports=Commentaire;