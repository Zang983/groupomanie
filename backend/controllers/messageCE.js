const db = require("../models/config");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

exports.sendCE = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.idUser) {
        db.user.findOne({ where: { idUser: req.body.idUser }, attributes: ["droits"] })
            .then(value => {
                if (value.droits === "00001" && req.body.body != '') {
                    db.annonce.create({
                        idCE: "",
                        message: req.body.body,
                        idUser: req.body.idUser,
                        visible: true
                    }).then(() => { res.status(200).json(message = "Annonce créée") })
                        .catch(error => res.status(500).json(error))
                }
                else {
                    return res.status(401).json({ message: "Droits insuffisant ou message inexistant" })
                }
            })
    }
    else {
        return res.status(401).json({ message: "Faite ça depuis votre propre compte" })
    }
}

exports.deleteCE = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    if (userId == req.body.corps.userId) {
        db.user.findOne({ where: { idUser: req.body.corps.userId }, attributes: ["droits"] })
            .then(value => {
                if (value.droits === "00001")//("A modifier avec la valeur contenue dans le token")
                {
                    db.annonce.destroy({
                        where: {
                            idCE: req.body.corps.id
                        }
                    }).then(() => res.status(201).json({ message: "Annonce supprimée" }))
                        .catch(() => res.status(500).json({ message: "Erreur lors de la suppression de l'annonce" }))
                }
                else {
                    return res.status(401).json({ message: "Droits insuffisants" })
                }
            })
            .catch(() => res.status(401).json({ message: "Utilisateur inexistant" }))
    }
    else {
        res.status(401).json({ message: "Faite cela depuis votre propre compte" })
    }
}

exports.getCE = (req, res, next) => {
    db.annonce.findAll()
        .then(resultat => res.status(200).json({ resultat }))
        .catch(error => res.status(500).json({ message: error }))
}

exports.updateCE = (req, res, next) => {
    console.log(req.body)
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    console.log(decodedToken)
    if (userId == req.body.users_idUser) {
        if (decodedToken.isAdmin === 1 && req.body.message != "")//a modifier avec la valeur contenue dans le token
        {
            db.annonce.update({
                message: req.body.message,
            }, {
                where: {
                    idCE: req.body.idCE,
                }
            }).then(() => res.status(201).json({ message: "Post mis à jour" }))
                .catch(error => res.status(500).json(error))
        }

    }
    else {
        return res.status(401).json({ message: "Droits insuffisant!" })
    }
}

