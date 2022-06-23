const db = require("../models/config");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op
const jwt = require('jsonwebtoken');

exports.sendComment = (req, res, next) => {
    console.log(req.body.idUser)

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.idUser) {
        if (req.body.body != '')/* Faire les vérifications au niveau des droits.*/ {
            db.commentaire.create({
                contenu: req.body.body,
                lockStatus: false,
                idPost: req.body.idPost,
                idUser: req.body.idUser,
            }).then(() => res.status(201).json({ message: "Commentaire enregistré" }))
                .catch(error => res.status(500).json({ error }))
        }
        else {
            res.status(401).json({ message: "Commentaire vide" })
        }
    }
    else {
        res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
    }
}
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.corps.userId) {
        db.commentaire.destroy({
            where: {
                idCommentaire: req.body.corps.id,
                idUser: req.body.corps.userId
            }
        }).then(() => res.status(201).json({ message: "Commentaire supprimé" }))
            .catch(error => res.status(401).json({ error }))
    }
    else {
        return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
    }
}
exports.getComments = (req, res, next) => {
    postId = req.params.postId.split("=")[1]

    db.commentaire.findAll({
        include: [
            { model: db.user, attributes: ["firstname", "lastname","url_avatar"] },
            { model: db.like, attributes: ["idUser", "valeur"] }
        ],
        where: {
            idPost: postId
        },
    })
        .then(reponse => res.status(200).json(reponse))
        .catch(error => res.status(500).json({ error }))

}
exports.updateAComment = (req, res, next) => {
    let id = req.params.id.split("=")[1]
    console.log(req.body)

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.idUser) {
        db.commentaire.update({
            contenu: req.body.nouveauCommentaire,
            dateDernierEdit: Sequelize.fn('NOW')
        }, {
            where: {
                idCommentaire: id,
            }
        }).then(result => res.status(201).json({ result }))
            .catch(error => res.status(500).json({ error }))
    }
    else {
        return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
    }
}
exports.likeAComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.idUser) {
        if (req.body.valeur === -1) {
            db.like.destroy({
                where: {
                    idUser: req.body.idUser,
                    idCommentaire: req.body.idCommentaire
                }
            }).then(() => { return res.status(200).json({ message: "Vote supprimé" }) })
                .catch(() => { return res.status(404).json({ message: "Vote non existant" }) })
        }
        if (req.body.valeur === 0 || req.body.valeur === 1) {
            let valeur = false;
            if (req.body.valeur === 1) {
                valeur = true;
            }
            db.like.create({
                idUser: req.body.idUser,
                idCommentaire: req.body.idCommentaire,
                valeur: valeur,
            }).then(() => res.status(201).json("Vote pris en compte"))
                .catch(() => {
                    db.like.update({ valeur: valeur },
                        {
                            where: {
                                idUser: req.body.idUser,
                                idCommentaire: req.body.idCommentaire
                            }
                        }).then(() => { res.status(201).json({ message: "Vote bien pris en compte" }) })
                        .catch(error => { res.status(500).json({ message: "Problème d'enregistrement du vote" }) })
                })
        }
    }
    else {
        return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
    }
}
