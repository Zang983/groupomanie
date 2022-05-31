const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


  const messageCE = sequelize.define("CE",{
    idCE:{ type: DataTypes.INTEGER, primaryKey: true },
    message:DataTypes.STRING,
    dateDebut:{type :Sequelize.DATE},
    dateFin: {type :Sequelize.DATE},
    },
    {
        tableName:"CE",
        timestamps: false ,
    }, 
);
module.exports=messageCE;