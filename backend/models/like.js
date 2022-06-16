module.exports = (sequelize, DataTypes) => {
    const like = sequelize.define("like", {
        valeur: { type: DataTypes.INTEGER, allowNull: true },
        idCommentaire:{ type: DataTypes.INTEGER, primaryKey: true },
        idUser:{ type: DataTypes.INTEGER, primaryKey: true },
    },
        {
            tableName: "liker",
            timestamps: false
        })
    return like
}