module.exports=(sequelize,DataTypes)=>
{
    const User = sequelize.define("user",{
        idUser:{ type: DataTypes.INTEGER, primaryKey: true },
        firstName:DataTypes.STRING,
        lastName:DataTypes.STRING,
        password:DataTypes.STRING,
        url_avatar:{type : DataTypes.STRING},
        fonction:DataTypes.STRING,
        telephone:{type : DataTypes.STRING,defaultValue:"0100000000"},
        email:DataTypes.STRING,
        droits:{type : DataTypes.STRING,defaultValue:"00002"},
        userDescription:{type:DataTypes.TEXT,defaultValue:""},
    },{
        tableName:"users",
        timestamps:false,
    })
    return User
}