// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize("mydb", 'root', 'zangetsu91', {
//     host: 'localhost',
//     dialect: 'mysql',
// });
// const user = require("./user")
// const commentaire = require("./commentaire")


// const like = sequelize.define('like',{
//     users_idUser:{
//         type:DataTypes.INTEGER,
//         primaryKey:true,
//         references:{
//             model:user,
//             key:'idUser'
//         }
//     },
//     Commentaires_idCommentaire:{
//         type:DataTypes.INTEGER,
//         references:{
//             model:commentaire,
//             key:'idCommentaire'
//         }
//     },
//         valeur:DataTypes.BOOLEAN,
// },    {
//     tableName:"like",
//     timestamps: false ,
// },
// {
// indexes: [
//     {
//         unique: true,
//         fields: ['users_idUser', 'Commentaires_idCommentaire']
//     }
// ]
// },
//  )
// module.exports=like;


module.exports = (sequelize, DataTypes) => {
    const like = sequelize.define("like", {
        valeur: { type: DataTypes.INTEGER, allowNull: true },
        idPost:{ type: DataTypes.INTEGER, primaryKey: true },
        idUser:{ type: DataTypes.INTEGER, primaryKey: true },
    },
        {
            tableName: "liker",
            timestamps: false
        })
    return like
}