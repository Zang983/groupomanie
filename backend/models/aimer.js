// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
//     host: 'localhost',
//     dialect: 'mysql',
//   });



// const aimer = sequelize.define('aimer',{
//     users_idUser:{
//         type:DataTypes.INTEGER,
//         primaryKey:true,
//         references:{
//             model:user,
//             key:'idUser'
//         }
//     },
//     posts_idPosts:{
//         type:DataTypes.INTEGER,
//         references:{
//             model:post,
//             key:'idPosts'
//         }
//     },
//     lockStatus:{
//         type:DataTypes.BOOLEAN,
//     },
//     valeur:DataTypes.BOOLEAN,
// },    {
//     tableName:"aimer",
//     timestamps: false ,
// },
// {
// indexes: [
//     {
//         unique: true,
//         fields: ['users_idUser', 'posts_idPosts']
//     }
// ]
// },
//  )
// module.exports=aimer;

module.exports = (sequelize, DataTypes) => {
    const aimer = sequelize.define("aimer", {
        valeur: { type: DataTypes.INTEGER, allowNull: true },
        idPost:{ type: DataTypes.INTEGER, primaryKey: true },
        idUser:{ type: DataTypes.INTEGER, primaryKey: true },
    },
        {
            tableName: "aimer",
            timestamps: false
        })
    return aimer
}