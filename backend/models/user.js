const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });
const posts=require("./post")
const User = sequelize.define("user",{
    idUser:{ type: DataTypes.INTEGER, primaryKey: true },
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    password:DataTypes.STRING,
    url_avatar:DataTypes.STRING,
    fonction:DataTypes.STRING,
    telephone:{type : DataTypes.STRING,defaultValue:"0100000000"},
    email:DataTypes.STRING,
    droits:{type : DataTypes.STRING,defaultValue:"00001"},
    userDescription:DataTypes.TEXT,
    },
    {
        tableName:"users",
        timestamps: false ,
    }, 
);


// User.associate = (models) =>{
//     User.hasMany(posts,{
//         foreignKey:'users_idUser',
//         allowNull: true,
//     })
// }

// User.associate = (models) =>{
//     User.hasMany(commentaire,{
//         foreignKey:'users_idUser',
//         allowNull: false,
//         defaultValue: 3
//     })
// }




module.exports=User;