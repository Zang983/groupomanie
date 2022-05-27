const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });


  const Service = sequelize.define("service",{
    idService:{ type: DataTypes.INTEGER, primaryKey: true },
    nomService:DataTypes.STRING,
    },
    {
        tableName:"Services",
        timestamps: false ,
    }, 
);

Service.associate = (models) =>{
    Service.hasMany(user,{
        foreignKey:'Services_idService'
    })
}
