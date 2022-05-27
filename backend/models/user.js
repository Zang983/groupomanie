const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });

const User = sequelize.define("user",{
    idUser:{ type: DataTypes.INTEGER, primaryKey: true },
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    password:DataTypes.STRING,
    url_avatar:DataTypes.STRING,
    fonction:DataTypes.STRING,
    telephone:{type : DataTypes.STRING,defaultValue:"0100000000"},
    email:DataTypes.STRING,
    Services_idService:{type: DataTypes.INTEGER,defaultValue: 7},
    droits:{type : DataTypes.STRING,defaultValue:"00001"},
    },
    {
        tableName:"users",
        timestamps: false ,
    }, 
);

User.associate = (models) =>{
    User.belongsTo(service)
}

User.associate = (models) =>{
    User.hasMany(posts,{
        foreignKey:'users_idUser',
        allowNull: false,
        defaultValue:3
    })
}

User.associate = (models) =>{
    User.hasMany(commentaire,{
        foreignKey:'users_idUser',
        allowNull: false,
        defaultValue: 3
    })
}


module.exports=User;



// CREATE TABLE IF NOT EXISTS `mydb`.`users` (
//     `idUser` INT NOT NULL AUTO_INCREMENT,
//     `firstname` STRING(45) NOT NULL,
//     `lastname` STRING(45) NOT NULL,
//     `password` STRING(255) NOT NULL,
//     `url_avatar` STRING(45) NULL,
//     `fonction` STRING(45) NULL,
//     `telephone` STRING(10) NULL,
//     `email` STRING(45) NULL,
//     `droits` STRING(5) NULL,
//     `Services_idService` INT NOT NULL,
//     PRIMARY KEY (`idUser`, `Services_idService`),
//     UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
//     INDEX `fk_users_Services1_idx` (`Services_idService` ASC) VISIBLE,
//     CONSTRAINT `fk_users_Services1`
//       FOREIGN KEY (`Services_idService`)
//       REFERENCES `mydb`.`Services` (`idService`)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION);