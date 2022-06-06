const { Sequelize } = require('sequelize');
const commentaire = require('../models/commentaire');
const aimer = require('../models/like')
const Op = Sequelize.Op

exports.sendComment = (req, res, next) => {
    if (req.body.body != '')/* Faire les vérifications au niveau des droits.*/ {
        commentaire.create({
            contenu: req.body.body,
            lockStatus: false,
            posts_idPosts: req.body.idPost,
            users_idUser: req.body.idUser,
        }).then(() => res.status(201).json({ message: "Commentaire enregistré" }))
            .catch(error => res.status(500).json({ error }))
    }
    else {
        res.status(401).json("Commentaire vide")
    }
}
exports.deleteComment = (req, res, next) => {
    commentaire.destroy({
        where: {
            idCommentaire: req.body.id,
            users_idUser: req.body.userId
        }
    }).then(() => res.status(201).json({ message: "Commentaire supprimé" }))
        .catch(error => res.status(401).json({ error }))
}
exports.getComments = (req, res, next) => {
    postId = req.params.postId.split("=")[1]

    commentaire.findAll({
        where: {
            posts_idPosts: postId
        }
    })
        .then(reponse => res.status(200).json(reponse))
        .catch(error => res.status(500).json({ error }))

}
exports.updateAComment = (req, res, next) => {
        let id=req.params.id.split("=")[1]
        commentaire.update({
            contenu: req.body.nouveauCommentaire,
            dateDernierEdit: Sequelize.fn('NOW')
        }, {
            where: {
                idCommentaire: id,
            }
        }).then(result => res.status(201).json({ result }))
            .catch(error => res.status(500).json({ error }))
}
exports.likeAComment = (req, res, next) => {
    if (req.body.valeur === -1) {
        aimer.destroy({
            where: {
                users_idUser: req.body.idUser,
                Commentaires_idCommentaire: req.body.idCommentaire
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
            Commentaires_idCommentaire: req.body.idCommentaire,
            valeur: valeur,
        }).then(()=> res.status(201).json("Vote pris en compte") )
            .catch(() => {
                aimer.update({ valeur: valeur },
                    {
                        where: {
                            users_idUser: req.body.idUser,
                            Commentaires_idCommentaire: req.body.idCommentaire
                        }
                    }).then(() => { res.status(201).json({ message: "Vote bien pris en compte" }) })
                    .catch(() => res.status(500).json({ message: "Problème d'enregistrement du vote" }))

            })
    }


}

exports.lockCommentaire = (req, res, next) => {
    commentaire.update({ lockStatus: req.body.lockStatus }, {
        where: { idCommentaire: req.body.idCommentaire }
    })
        .then(() => { res.status(200).json({ message: "Vérouillage du sujet modifié" }) })
        .catch(error => res.status(500).json({ error }));
}