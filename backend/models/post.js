// const Post = sequelize.define("post",{
//     idPosts:{ type: DataTypes.INTEGER, primaryKey: true },
//     titre:DataTypes.STRING,
//     contenu:DataTypes.TEXT,
//     url_image:DataTypes.STRING,
//     lockStatus:DataTypes.BOOLEAN,
//     users_idUser:{type :DataTypes.INTEGER, defaultValue:1},
//     },
//     {
//         tableName:"posts",
//         updatedAt:"dateDernierEdit",
//         createdAt:"dateCreation",
//     }, 
// );
// module.exports=Post;


module.exports=(sequelize,DataTypes)=>
{
    const Post = sequelize.define("post",{
    idPost:{ type: DataTypes.INTEGER, primaryKey: true },
    titre:DataTypes.STRING,
    contenu:DataTypes.TEXT,
    url_image:DataTypes.STRING,
    lockStatus:DataTypes.BOOLEAN,
    idUser:{type :DataTypes.INTEGER},
    },
    {
        tableName:"posts",
        updatedAt:"dateDernierEdit",
        createdAt:"dateCreation",
    })
    return Post
}
