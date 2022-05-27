const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


  const messageCE = sequelize.define("CE",{
    idCE:{ type: DataTypes.INTEGER, primaryKey: true },
    message:DataTypes.STRING,
    dateDebut:DataTypes.TIMESTAMP,
    dateFin: DataTypes.TIMESTAMP,
    },
    {
        tableName:"CE",
        timestamps: false ,
    }, 
);
