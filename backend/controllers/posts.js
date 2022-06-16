const { Sequelize } = require('sequelize');
const db = require("../models/config");
const fs = require("fs");
const Op = Sequelize.Op

exports.sendPost = (req, res, next) => {
    console.log(req.body.users_idUser)

    let imageUrl = "";
    if (req.file != undefined) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    if (req.body.author === undefined || req.body.body == "" || req.body.title == "") {
        return res.status(400).json({ message: "Informations manquantes" })
    }
    db.post.create({
        idPost: '',
        titre: req.body.title,
        contenu: req.body.body,
        lockStatus: 0,
        idUser: req.body.users_idUser,
        url_image: imageUrl
    })
    return res.status(200).json({ message: "Post créer" })

}
exports.deletePost = (req, res, next) => {
    let userId = req.body.corps.userId
    console.log(req.body.corps)


   
    db.post.findOne({ where: { idPost: req.body.corps.id } })
        .then(result => {
                let urlImage = "./images" + result.url_image.split("/images")[1]
                if (result.url_image != "" && fs.existsSync(urlImage)) {
                    fs.unlink(urlImage, (err) => {
                    })
                }
                db.post.destroy({
                    where: {
                        [Op.and]: [
                            { idPost: req.body.corps.id },
                            { idUser: userId }
                        ]
                    }
                }).then(()=>res.status(204).json({message:"Post effacé"}))
                .catch(error=>res.status(500).jsons({error}))
})
}
/* Refactoriser, pas besoin du if/else modifier la valeur du lockStatus selon le droit admin */
exports.getPosts = (req, res, next) => {
    let nombrePage = 0;
    let page = req.params.page.split("=")[1]
    if (page > 0) {
        page--;
    }
    db.post.count()
        .then((value) => {
            nombrePage = value;
            let admin = 1
                db.post.findAll({
                    order: [['dateCreation', 'DESC']],
                    include: [
                        { model: db.user, attributes: ["firstname", "lastname"] },
                        {model : db.aimer, attributes:["idUser","valeur"]}
                ],
                    offset: page * 5, limit: 5,

                })
                    .then(Post => {console.log(Post); res.status(200).json({ Post, nombrePage }) })
                    .catch(error => { console.log(error); res.status(500).json({ error }) });
        })

}
// exports.lockAPost = (req, res, next) => {
//     db.post.update({ lockStatus: req.body.lockStatus }, {
//         where: { idPost: req.body.idPosts }
//     })
//         .then(Post => { res.status(200).json({ message: "Vérouillage du sujet modifié" }) })
//         .catch(error => res.status(500).json({ erreur: 'Problème' }));
// }

exports.updateAPost = (req, res, next) => {
    if (req.body.supprimeImage) {
        db.post.findOne({
            attributes: ["url_image"],
        },
            {
                where: { idPost: req.body.idPost }
            })
            .then(resultat => {
                if (!resultat.url_image == "") {
                    let urlImage = "./images" + resultat.url_image.split("/images")[1]
                    if (fs.existsSync(urlImage)) {
                        fs.unlink(urlImage, (err) => {
                            if (err) throw err;
                        })
                    }
                }
            })
        db.post.update({
            url_image: "",
        }, {
            where: { idpost: req.body.idPost }
        })
    }
    else {
        /* Si on édite le post : on vérifie si une nouvelle image est envoyée si oui on récupère le nom en imageUrl sinon on récupère l'ancien path dans la BDD*/
        let imageUrl = "";
        if (req.file != undefined) {
            imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        else {
            db.post.findOne({
                attributes: ["url_image"],
            },
                {
                    where: { idPost: req.body.idPost }
                })
                .then(resultat => imageUrl = resultat.url_image)
        }
        db.post.update({
            titre: req.body.title,
            contenu: req.body.body,
            url_image: imageUrl,
            dateDernierEdit: Sequelize.fn('NOW')
        }, {
            where: {
                idPost: req.body.idPost,
            }
        }).then(result => res.status(201).json({ result }))
            .catch(error => res.status(500).json({ error }))
    }
}
exports.likeAPost = (req, res, next) => {
    console.log(req.body)
    if (req.body.valeur === -1) {
        db.aimer.destroy({
            where: {
                idUser: req.body.idUser,
                idPost: req.body.idPost
            }
        }).then(() => { return res.status(200).json({ message: "Vote supprimé" }) })
            .catch(() => { return res.status(404).json({ message: "Vote non existant" }) })
    }
    if (req.body.valeur === 0 || req.body.valeur === 1) {
        let valeur = false;
        if (req.body.valeur === 1) {
            valeur = true;
        }
        db.aimer.create({
            idUser: req.body.idUser,
            idPost: req.body.idPost,
            valeur: valeur,
        }).then(() => res.status(201).json({ message: "Vote bien pris en compte" }))
            .catch(() => {
                db.aimer.update({ valeur: valeur },
                    {
                        where: {
                            idUser: req.body.idUser,
                            idPost: req.body.idPost
                        }
                    }).then(() => { res.status(201).json({ message: "Vote bien pris en compte" }) })
                    .catch(error => { console.log(error); res.status(500).json({ message: "Problème d'enregistrement du vote" }) })

            })
    }

}
