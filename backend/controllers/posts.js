const user = require('../models/post');

exports.sendPost = (req, res, next) => {

    if(req.body.author===undefined || req.body.body=="" || req.body.title=="")
    {
        return res.status(400).json({message:"Informations manquantes"})
    }
    console.log(req.body)
    return res.status(200).json({message:"OK"})

}
exports.deletePost = (req, res, next) => {
    
    console.log(req.params.id)
   // console.log(req.body)
   return res.status(200).json({message:"Post delete"})

}
exports.getPosts = (req, res, next) => {
    console.log("On affiche bien les posts")

}
exports.updateAPost = (req, res, next) => {
    console.log("On update bien un post")

}
exports.likeAPost = (req, res, next) => {
        console.log(req.body.valeur)

    if(req.body.valeur===-1)
    {
        return res.status(200).json({message:"Like supprimé"})
    }
    if(req.body.valeur === 0 || req.body.valeur===1)
    {
       return res.status(200).json({message:"Like enregistré"})
    }

    return res.status(400).json({message:"Valeur du like incohérent"})
}

