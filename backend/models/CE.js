const { Sequelize, DataTypes } = require('sequelize');
const user= require('./user')
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


  const messageCE = sequelize.define("CE",{
    idCE:{ type: DataTypes.INTEGER, primaryKey: true },
    visible:DataTypes.BOOLEAN,
    message:DataTypes.TEXT,
    users_idUser:DataTypes.INTEGER,
    },
    {
        tableName:"CE",
        timestamps: false ,
    }, 
);

messageCE.associate = (models) =>{
  messageCE.hasOne(users,{
      foreignKey:"users_idUser",
      targetKey:"idUsers",
      defaultValue:1
  })
}

module.exports=messageCE;