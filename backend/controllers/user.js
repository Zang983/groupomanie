const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require("fs");
const db = require("../models/config");


/*
Fonctionnement de la fonction : 
On vérifie si les 4 champs obligatoires sont bien remplis.
On vérifie la cohérence du mot de passe et du mail.
on hash le MDP et on crée l'utilisateur
*/
exports.signup = (req, res, next) => {
  let email = req.body.email, pwd = req.body.pwd, firstName = req.body.firstName, lastName = req.body.lastName
  if (email == "" || pwd == "" || firstName == "" || lastName == "") {

    res.status(400).json({ message: "Informations d'inscriptions manquantes." })
  }
  if (!new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}(groupomania)[.]{1}(fr)$/).test(req.body.email) ||
    !new RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,32})$/).test(req.body.pwd)) {
    res.status(400).json({ message: "Erreur d'adresse mail ou de mot de passe." })
  }
  bcrypt.hash(pwd, 10)
    .then(hash => {
      db.user.create({ firstName: firstName, lastName: lastName, password: hash, email: email })
        .then(() => { res.status(201).json({ message: "Utilisateur créé" }) })
    })
    .catch(() => {
      res.status(500).json({ message: "Problème avec le mot de passe" })
    })
};


/*
Fonctionnement de la fonction : 
on cherche l'utilisateur selon l'adresse mail de la requête.
On vérifie le retour de la requête.
On compare le hash du mot de passe indiqué et celui enregistré si c'est valide on génère un JWT.
*/
exports.login = (req, res, next) => {
  db.user.findOne({
    where:
      { email: req.body.email }
  })
    .then(user => {
      let isAdmin = 0;
      if (user === null) {
        res.status(404).json({ message: "E-mail ou mot de passe incorrect" })
      }
      else {
        if (db.user.droits === "00001") {
          isAdmin = 1
        }
        bcrypt.compare(req.body.pwd, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'E-mail ou mot de passe incorrect' });
            }
            /* On coupe le token en 2 afin de stocker une partie en local storage et l'autre en cookie*/
            res.cookie("test", "BONJOUR")

            res.status(200).json({
              user: { idUser: user.idUser, firstName: user.firstName, lastName: user.lastName,
                 email: user.email, telephone: user.telephone, url_avatar: user.url_avatar,
                  description: user.userDescription,
                  access:user.droits },
              token: jwt.sign(
                { userId: user.idUser, isAdmin: isAdmin },
                'AuheoO11nNej47Gr,eiUHog@ru::ohga5',
                { expiresIn: '24h' },
              )
            });
          })
      }
    })
};

exports.userList = (req, res, next) => {
  db.user.findAll({
    attributes: ['firstName', 'lastName', 'idUser']
  }).then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error))

}

exports.profil = (req, res, next) => {
  /*Faire une requête renvoyant les informations du profil demandé.
  */
  let userId = req.params.id.split("=")[1]
  db.user.findOne({
    attributes: ["email", "firstName", "lastName", "telephone", "url_avatar"],
    where: {
      idUser: userId
    }
  }).then(value => res.status(200).json(value))
    .catch(error => res.status(404).json(error))
}

exports.parametre = (req, res, next) => {
  let userId = req.params.id.split("=")[1]
  /* On vérifie s'il faut mettre à jour le MDP*/
  if (req.body.pwd1 != "" && req.body.pwd1 === req.body.pwd2) {
    if (new RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,32})$/).test(req.body.pwd1)) {
      bcrypt.hash(req.body.pwd1, 10)
        .then(hash => {
          db.user.update({ password: hash, }, { where: { idUser: userId } })
            .catch(error => res.status(500).json({ error }))
        })
    }
  }

  if (req.file === undefined) {
    db.user.update({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      userDescription: req.body.userDescription,
      telephone: req.body.telephone,
    }, { where: { idUser: userId } }).then(() => res.status(201).json({ message: "Utilisateur modifié" }))
      .catch(error => res.status(500).json({ error }))

  }
  else {
    let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    db.user.update({
      userName: req.body.firstname,
      lastName: req.body.lastname,
      userDescription: req.body.userDescription,
      url_avatar: imageUrl,
      telephone: req.body.telephone,
    }, { where: { idUser: userId } }).then(() => res.status(201).json({ message: "Utilisateur modifié" }))
      .catch(error => res.status(500).json({ error }))

  }


}

exports.delete = (req, res, next) => {
  let userId = req.params.id.split("=")[1]
  db.user.findOne({
    attributes: ["url_avatar"],
    where: { idUser: userId }
  })
    .then(resultat => {
      if (!resultat.url_avatar == "") {
        let url_avatar = "./images" + resultat.url_avatar.split("/images")[1]
        if (fs.existsSync(url_avatar)) {
          fs.unlink(url_avatar, (err) => {
            if (err) throw err;
          })
        }
      }
    })
  db.user.destroy({ where: { idUser: userId } })
    .then(() => res.status(200).json({ message: "Compte effacé" }))
    .catch(error => res.status(500).json({ error }))
  res.status(200).json({ message: "Compte effacé" })

}

exports.deleteAvatar = (req, res, next) => {
  let userId = req.params.id.split("=")[1]

  db.user.findOne({
    attributes: ["url_avatar"],
    where: { idUser: userId }
  })
    .then(resultat => {
      if (!resultat.url_avatar == "") {
        let url_avatar = "./images" + resultat.url_avatar.split("/images")[1]
        if (fs.existsSync(url_avatar)) {
          fs.unlink(url_avatar, (err) => {
            if (err) throw err;
          })
        }
      }
    })
  db.user.update({
    url_avatar: ""
  }, { where: { idUser: userId } }).then(() => res.status(200).json({ message: "Avatar supprimé" })).catch(error => res.status().json({ error }))
}