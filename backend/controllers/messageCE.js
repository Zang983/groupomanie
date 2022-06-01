const annonce = require('../models/CE');
const { Sequelize} = require('sequelize');
const { Op } = require("sequelize");

exports.sendCE = (req, res, next) => {


}
exports.deleteCE = (req, res, next) => {

}
exports.getCE = (req, res, next) => {

    let requete = annonce.findAll()
    .then(resultat=>res.status(200).json({resultat}))
    .catch(error=>res.status(500).json({message:error}))
}
exports.updateCE = (req, res, next) => {
    

}

