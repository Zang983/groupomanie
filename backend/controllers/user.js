const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const user = require('../models/user');


/*
Fonctionnement de la fonction : 
On vérifie si les 4 champs obligatoires sont bien remplis.
On vérifie la cohérence du mot de passe et du mail.
on hash le MDP et on crée l'utilisateur
*/
exports.signup = (req, res, next) => {
  let email=req.body.email, pwd=req.body.pwd, firstName=req.body.firstName, lastName=req.body.lastName
  if(email==""|| pwd==""|| firstName=="" || lastName=="")
  {
    
    res.status(400).json({message : "Informations d'inscriptions manquantes."})
  }
  if(!new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}(groupomania)[.]{1}(fr)$/).test(req.body.email) ||
  !new RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,32})$/).test(req.body.pwd))
  {
    res.status(400).json({message : "Erreur d'adresse mail ou de mot de passe."})
  }
  bcrypt.hash(pwd, 10)
          .then(hash => {
            user.create({firstName:firstName,lastName:lastName,password:hash,email:email})
            .then(()=>{res.status(201).json({message : "Utilisateur créé"})})
          })
          .catch(error=>
          {
            res.status(500).json({message:"Problème avec le mot de passe"})
          })
        };


/*
Fonctionnement de la fonction : 
on cherche l'utilisateur selon l'adresse mail de la requête.
On vérifie le retour de la requête.
On compare le hash du mot de passe indiqué et celui enregistré si c'est valide on génère un JWT.
*/
  exports.login = (req, res, next) => {
    user.findOne({
      where:
      {email:req.body.email}
    })
    .then(user=>{
      let isAdmin="";

    
      if(user===null)
      {
        res.status(404).json({message:"E-mail ou mot de passe incorrect"})
      }
      else
      {
        if(user.droits==="00001")
        {
          isAdmin=1
        }
        else{
          isAdmin = 0;
        }
        bcrypt.compare(req.body.pwd, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'E-mail ou mot de passe incorrect' });
          }
          res.status(200).json({
            userId: user.idUser,
            firstName : user.firstName,
            lastName:user.lastName,
            isAdmin:isAdmin,
            token: jwt.sign(
              { userId:user.idUser},
              'AuheoO11nNej47Gr,eiUHog@ru::ohga5',
              { expiresIn: '24h' }
            )
          });
        })
      }  
    })
  };

  exports.userList = (req,res,next)=>{
    user.findAll({
     
      attributes:['firstName','lastName','idUser']
    }).then(result=>res.status(200).json(result))
    .catch(error=>res.status(500).json(error))

  }
  
  exports.profil = (req, res, next) => {
    /*Faire une requête renvoyant les informations du profil demandé.
    */

  }