const { Sequelize } = require('sequelize');
const db = require("../models/config");
const fs = require("fs");
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op

exports.sendPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.users_idUser) {
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
    else {
        return res.status(401).json({ message: "vous n'êtes pas le propriétaire du compte" })
    }
}
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.corps.userId) {
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
                }).then(() => res.status(204).json({ message: "Post effacé" }))
                    .catch(error => res.status(500).jsons({ error }))
            })
    }
    else {
        return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
    }
}
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
                    { model: db.user, attributes: ["firstname", "lastname", "url_avatar"] },
                    { model: db.aimer, attributes: ["idUser", "valeur"] }
                ],
                offset: page * 5, limit: 5,

            })
                .then(Post => { res.status(200).json({ Post, nombrePage }) })
                .catch(error => { res.status(500).json({ error }) });
        })

}
exports.updateAPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.users_idUser) {
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
                    res.status(203).json({ message: "Image supprimée" })
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
    else {
        return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
    }
}
exports.likeAPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.idUser) {
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
    else {
        return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
    }
}
