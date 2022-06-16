const db = require("../models/config");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");

exports.sendCE = (req, res, next) => {
    if (req.body.idUser === 1 && req.body.body != '') {//modifier la condition
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
}

exports.deleteCE = (req, res, next) => {
    console.log(req.body)
    if (req.body.corps.access)//("A modifier avec la valeur contenue dans le token")
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

}

exports.getCE = (req, res, next) => {
    db.annonce.findAll()
        .then(resultat => res.status(200).json({ resultat }))
        .catch(error => res.status(500).json({ message: error }))
}

exports.updateCE = (req, res, next) => {
    if (req.body.access && req.body.message != "")//a modifier avec la valeur contenue dans le token
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

