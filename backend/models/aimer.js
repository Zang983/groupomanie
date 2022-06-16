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