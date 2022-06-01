const { Sequelize} = require('sequelize');
const post = require('../models/post');
const aimer = require('../models/aimer')
const users= require ('../models/user')
const Op = Sequelize.Op
const sequelize2 = new Sequelize("mydb", 'root', 'zangetsu91', {
    host: 'localhost',
    dialect: 'mysql',
  });

exports.sendPost = (req, res, next) => {

    if (req.body.author === undefined || req.body.body == "" || req.body.title == "") {
        return res.status(400).json({ message: "Informations manquantes" })
    }
    post.create({
        idPost: '',
        titre: req.body.title,
        contenu: req.body.body,
        lockStatus: 0, 
        users_idUser: req.body.users_idUser,
    })
    return res.status(200).json({ message: "OK" })

}
exports.deletePost = (req, res, next) => {
      
    console.log("ID : " + req.body.id)
    post.findOne({where:{idPosts:req.body.id}})
        .then(result=>{
            console.log(result)
            if(!result.lockStatus)
            {
                console.log("ici")
                post.destroy({
                    where: {
                        [Op.and]: [
                            { idPosts: req.body.id },
                            { users_idUser: req.body.userId }
                        ]
                    }
                })
                    .then(result => {
                        if (result === 1) {
                          return  res.status(200).json("Message supprimé")
                        }
                        else {
                           return res.status(401).json("Vous n'êtes pas autorisé à faire cette action")
                        }
            
                    })
            }
            else
            {
                return res.status(401).json("Vous n'êtes pas autorisé à faire cette action")
            }
        }).catch(error =>res.status(501).json("Le serveur n'a pas compris votre demande") )
        

}
exports.getPosts = (req, res, next) => {
    let admin = 1;
   // post.hasOne(users)
    if (admin) {
        // const result = sequelize2.query("SELECT * FROM posts AND * FROM idUser INNER JOIN users ON users_idUser=idUser ")
        post.findAll({
           // include:users,
        }).then(Post => { res.status(200).json(Post) })
        .catch(error => res.status(500).json({ error }));
       
    }
    else {
        post.findAll({
            order: [
                ['idPosts', 'DESC'],
                Sequelize.col('idPosts', 'DESC')
            ],
            where: {
                lockStatus: 0
            }
        })
            .then(Post => { res.status(200).json(Post) })
            .catch(error => res.status(500).json({ error }));
    }

}
exports.lockAPost = (req, res, next) => {
    post.update({ lockStatus: req.body.lockStatus }, {
        where: { idPosts: req.body.idPosts }
    })
        .then(Post => { res.status(200).json({ message: "Vérouillage du sujet modifié" }) })
        .catch(error => res.status(500).json({ erreur: 'Problème' }));
}

exports.updateAPost = (req, res, next) => {
    // if(req.body.idUsers===undefined)
    // {
       
    //res.status(401).json({message:"Vous n'êtes pas connecté"})
    // }
    // else
    // {
        post.update({
            titre: req.body.newTitle,
            contenu: req.body.newBody,
            dateDernierEdit: Sequelize.fn('NOW')
        }, {
            where: { idPosts: req.body.idPosts,
            //users_idUser:req.body.idUsers 
        }
        }).then(result=>res.status(201).json({result}))
        .catch(error=>res.status(500).json({error}))
    // }


}

exports.likeAPost = (req, res, next) => {
    if (req.body.valeur === -1) {
        console.log("On supprimes")
        aimer.destroy({
            where: {
                users_idUser: req.body.idUser,
                posts_idPosts: req.body.idPost
            }
        }).then(()=> {return res.status(200).json({ message: "Vote supprimé" })})
            .catch(()=> {return res.status(404).json({ message: "Vote non existant" })})
    }
    if (req.body.valeur === 0 || req.body.valeur === 1) {
        let valeur=false;
        if(req.body.valeur===1)
        {
            valeur=true;
        }
        aimer.create({
            users_idUser: req.body.idUser,
            posts_idPosts: req.body.idPost,
            valeur:valeur,
        }).then(()=> {return res.status(200).json({ message: "Vote enregistré" })})
            .catch( ()=> {
                aimer.update({valeur:valeur},
                    {where:{
                        users_idUser:req.body.idUser,
                        posts_idPosts:req.body.idPost
                    }}).then(()=>{return res.status(201).json({message:"Mise à jour de votre vote enregistrée"})})
                return res.status(500).json({ message: "Problème d'enregistrement du vote" })})
    }

}

