const { Sequelize } = require('sequelize');
const post = require('../models/post');
const aimer = require('../models/aimer')
const users = require('../models/user')
const fs = require("fs");

const Op = Sequelize.Op

exports.sendPost = (req, res, next) => {

    let imageUrl = "";
    if (req.file != undefined) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    if (req.body.author === undefined || req.body.body == "" || req.body.title == "") {
        return res.status(400).json({ message: "Informations manquantes" })
    }
    post.create({
        idPost: '',
        titre: req.body.title,
        contenu: req.body.body,
        lockStatus: 0,
        users_idUser: req.body.users_idUser,
        url_image: imageUrl
    })
    return res.status(200).json({ message: "Post créer" })

}
exports.deletePost = (req, res, next) => {
    post.findOne({ where: { idPosts: req.body.id } })
        .then(result => {
            if (!result.lockStatus) {
                let urlImage = "./images" + result.url_image.split("/images")[1]
                if (result.url_image != "" && fs.existsSync(urlImage)) {
                    fs.unlink(urlImage, (err) => {
                    })
                }
                post.destroy({
                    where: {
                        [Op.and]: [
                            { idPosts: req.body.id },
                            { users_idUser: req.body.userId }
                        ]}
                })
                    .then(result => {
                        if (result === 1) {
                            return res.status(200).json("Message supprimé")
                        }
                        else {
                            return res.status(401).json("Vous n'êtes pas autorisé à faire cette action")
                        }
                    })
            }
            else {
                return res.status(401).json("Vous n'êtes pas autorisé à faire cette action")
            }
        }).catch(error => res.status(501).json("Le serveur n'a pas compris votre demande"))
}
/* Refactoriser, pas besoin du if/else modifier la valeur du lockStatus selon le droit admin */
exports.getPosts = (req, res, next) => {
    let admin = 1;
    let nombrePage = 0;
    let page = req.params.page.split("=")[1]
    if (page > 0) {
        page--;
    }
    post.count()
        .then((value) => {
            nombrePage = value;
            // post.hasOne(users)
            if (admin) {
                // const result = sequelize2.query("SELECT * FROM posts AND * FROM idUser INNER JOIN users ON users_idUser=idUser ")
                post.findAll({ offset: page * 5, limit: 5 })
                    .then(Post => { res.status(200).json({ Post, nombrePage }) })
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

        })



}
exports.lockAPost = (req, res, next) => {
    post.update({ lockStatus: req.body.lockStatus }, {
        where: { idPosts: req.body.idPosts }
    })
        .then(Post => { res.status(200).json({ message: "Vérouillage du sujet modifié" }) })
        .catch(error => res.status(500).json({ erreur: 'Problème' }));
}
exports.updateAPost = (req, res, next) => {
    if (req.body.supprimeImage) {
        post.findOne({
            attributes: ["url_image"],
        },
            {
                where: { idPosts: req.body.idPost }
            })
            .then(resultat => {
                if (!resultat.url_image == "") {
                    let urlImage = "./images" + resultat.url_image.split("/images")[1]
                    if (fs.existsSync(urlImage))
                    {
                    fs.unlink(urlImage, (err) => {
                        if (err) throw err;
                    })}
                }
            })
        post.update({
            url_image: "",
        }, {
            where: { idposts: req.body.idPost }
        })
    }
    else {
        /* Si on édite le post : on vérifie si une nouvelle image est envoyée si oui on récupère le nom en imageUrl sinon on récupère l'ancien path dans la BDD*/
        let imageUrl = "";
        if (req.file != undefined) {
            imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        else {
            post.findOne({
                attributes: ["url_image"],
            },
                {
                    where: { idPosts: req.body.idPost }
                })
                .then(resultat => imageUrl = resultat.url_image)
        }
        post.update({
            titre: req.body.title,
            contenu: req.body.body,
            url_image: imageUrl,
            dateDernierEdit: Sequelize.fn('NOW')
        }, {
            where: {
                idPosts: req.body.idPost,
            }
        }).then(result => res.status(201).json({ result }))
            .catch(error => res.status(500).json({ error }))
    }
}
exports.likeAPost = (req, res, next) => {
    if (req.body.valeur === -1) {
        aimer.destroy({
            where: {
                users_idUser: req.body.idUser,
                posts_idPosts: req.body.idPost
            }
        }).then(() => { return res.status(200).json({ message: "Vote supprimé" }) })
            .catch(() => { return res.status(404).json({ message: "Vote non existant" }) })
    }
    if (req.body.valeur === 0 || req.body.valeur === 1) {
        let valeur = false;
        if (req.body.valeur === 1) {
            valeur = true;
        }
        aimer.create({
            users_idUser: req.body.idUser,
            posts_idPosts: req.body.idPost,
            valeur: valeur,
        }).then(() => res.status(201).json({ message: "Vote bien pris en compte" }))
            .catch(() => {
                aimer.update({ valeur: valeur },
                    {
                        where: {
                            users_idUser: req.body.idUser,
                            posts_idPosts: req.body.idPost
                        }
                    }).then(() => { res.status(201).json({ message: "Vote bien pris en compte" }) })
                    .catch(() => res.status(500).json({ message: "Problème d'enregistrement du vote" }))

            })
    }

}

