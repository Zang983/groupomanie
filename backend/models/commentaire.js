
 module.exports=(sequelize,DataTypes)=>
{
    const commentaire = sequelize.define("commentaire",{
        idCommentaire:{ type: DataTypes.INTEGER, primaryKey: true },
        contenu:DataTypes.TEXT,
        lockStatus:DataTypes.BOOLEAN,    
        idPost:{type: DataTypes.INTEGER},
        idUser:{type: DataTypes.INTEGER},
        },
        {
            tableName:"Commentaires",
            updatedAt:"dateDernierEdit",
            createdAt:"dateCreation",
        },)
    return commentaire
}



