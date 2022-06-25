const { Sequelize, DataTypes } = require("sequelize");
const env = require("dotenv").config();
const sequelize = new Sequelize(process.env.dbName, "root", process.env.password, {
  host: 'localhost',
  dialect: 'mysql',
});
sequelize.authenticate().then(console.log("Connexion à la BDD réussie!!!")).catch(error => console.log(error))

let db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 



db.user=require("./user")(sequelize,DataTypes);
db.post=require("./post")(sequelize,DataTypes);
db.commentaire=require("./commentaire")(sequelize,DataTypes);
db.like=require("./like")(sequelize,DataTypes);
db.aimer=require("./aimer")(sequelize,DataTypes);
db.annonce=require("./ce")(sequelize,DataTypes);

/* Définition des relations */

db.user.hasMany(db.post,{foreignKey:"idUser", onDelete:"cascade"})
db.post.belongsTo(db.user,{foreignKey:"idUser", onDelete:"cascade"});


db.user.hasMany(db.commentaire,{foreignKey:"idUser", onDelete:"cascade"})
db.commentaire.belongsTo(db.user,{foreignKey:"idUser",onDelete:"cascade"});

db.post.hasMany(db.commentaire,{foreignKey:"idPost" ,onDelete:"cascade"})
db.commentaire.belongsTo(db.post,{foreignKey:"idPost",onDelete:"cascade"})

db.post.hasMany(db.aimer,{foreignKey:"idPost",onDelete:"cascade"})
db.aimer.belongsTo(db.post,{foreignKey:"idPost",onDelete:"cascade"})

db.user.hasMany(db.aimer,{foreignKey:"idUser",onDelete:"cascade"})
db.aimer.belongsTo(db.user,{foreignKey:"idUser",onDelete:"cascade"})

db.commentaire.hasMany(db.like,{foreignKey:"idCommentaire",onDelete:"cascade"})
db.like.belongsTo(db.commentaire,{foreignKey:"idCommentaire",onDelete:"cascade"})

db.user.hasMany(db.like,{foreignKey:"idUser",onDelete:"cascade"})
db.like.belongsTo(db.user,{foreignKey:"idUser",onDelete:"cascade"})

db.user.hasMany(db.annonce,{foreignKey:"idUser", onDelete:"cascade"})
db.annonce.belongsTo(db.user,{foreignKey:"idUser", onDelete:"cascade"});



module.exports=db