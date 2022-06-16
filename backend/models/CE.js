module.exports = (sequelize, DataTypes) => {
  const messageCE = sequelize.define("messageCE", {
    idCE:{ type: DataTypes.INTEGER, primaryKey: true },
    visible:DataTypes.BOOLEAN,
    message:DataTypes.TEXT,
    idUser:DataTypes.INTEGER,
    },
      {
          tableName: "CE",
          timestamps: false
      })
  return messageCE
}