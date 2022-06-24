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

    return res.status(400).json({ message: "Informations d'inscriptions manquantes." })
  }
  console.log(req.body)
  db.user.findOne({ where: { email: req.body.email } })
    .then(value => {
      if (value === null) {
        if (!new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}(groupomania)[.]{1}(fr)$/).test(req.body.email) ||
          !new RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,32})$/).test(req.body.pwd)) {
          console.log(!new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}(groupomania)[.]{1}(fr)$/).test(req.body.email))
          console.log(!new RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,32})$/).test(req.body.pwd))
          return res.status(400).json({ message: "Erreur d'adresse mail ou de mot de passe." })
        }
        bcrypt.hash(pwd, 10)
          .then(hash => {
            db.user.create({ firstname: firstName, lastname: lastName, password: hash, email: email })
              .then(() => { return res.status(201).json({ message: "Utilisateur créé" }) })
          })
          .catch(() => {
            return res.status(500).json({ message: "Problème avec le mot de passe" })
          })

      }
      else {
        return res.status(401).json({ message: "Vous êtes déjà inscrit" })
      }

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
        if (user.droits == "00001") {
          isAdmin = 1
        }
        bcrypt.compare(req.body.pwd, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'E-mail ou mot de passe incorrect' });
            }
            /* On coupe le token en 2 afin de stocker une partie en local storage et l'autre en cookie*/
            res.status(200).json({
              user: {
                idUser: user.idUser,
                access: user.droits
              },
              token: jwt.sign(
                { userId: user.idUser, isAdmin: isAdmin },
                'AuheoO11nNej47Gr,eiUHog@ru::ohga5',
                { expiresIn: '2h' },
              )
            });
          })
      }
    }).catch(error => res.status(404).json(error))
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
    attributes: ["email", "firstName", "lastName", "telephone", "url_avatar", "userDescription"],
    where: {
      idUser: userId
    }
  }).then(value => res.status(200).json(value))
    .catch(error => res.status(404).json(error))
}

exports.parametre = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
  const userId = decodedToken.userId;

  db.user.findOne({ where: { idUser: userId } })
    .then(value => {
      if (value === null) {
        return res.status(404).json({ message: "Utilisateur inéxistant." })
      }
      else {
        if (userId == req.params.id.split("=")[1]) {
          if (req.body.pwd1 != "" && req.body.pwd1 === req.body.pwd2) {
            if (new RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,32})$/).test(req.body.pwd1)) {
              bcrypt.hash(req.body.pwd1, 10)
                .then(hash => {
                  db.user.update({ password: hash, }, { where: { idUser: userId } })
                    .catch(error => res.status(500).json({ error }))
                })
            }
          }
          let telephone = "0100000000";
          if (new RegExp(/^0[\d]{9}/).test(req.body.telephone) && req.body.telephone.length === 10) {
            telephone = req.body.telephone
          }
          if (req.file === undefined) {
            db.user.update({
              userDescription: req.body.userDescription,
              telephone: telephone,
            }, { where: { idUser: userId } }).then(() => res.status(201).json({ message: "Utilisateur modifié" }))
              .catch(error => res.status(500).json({ error }))

          }
          else {
            db.user.findOne({
              where: { idUser: userId }
            }).then(resultat => {
              let url_avatar = ""
              if (resultat.url_avatar != null && resultat.url_avatar != "") {
                url_avatar = "./images" + resultat.url_avatar.split("/images")[1]
              }

              if (fs.existsSync(url_avatar)) {
                fs.unlink(url_avatar, (err) => {
                  if (err) throw err;
                })
              }
              let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              db.user.update({
                userDescription: req.body.userDescription,
                url_avatar: imageUrl,
                telephone: telephone,
              }, { where: { idUser: userId } })
                .then(() => res.status(201).json({ message: "Utilisateur modifié" }))
                .catch(error => res.status(500).json({ error }))

            })
          }
        }
        else {
          return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
        }

      }

    })



}

exports.delete = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
  const userId = decodedToken.userId;


  if (userId == req.params.id.split("=")[1]) {
    db.user.findOne({
      attributes: ["idUser", "url_avatar"],
      where: { idUser: userId }
    })
      .then(resultat => {
        let url_avatar = ""
        if (resultat != null) {
          if (!resultat.url_avatar == "") {
            url_avatar = "./images" + resultat.url_avatar.split("/images")[1]
            if (fs.existsSync(url_avatar)) {
              fs.unlink(url_avatar, (err) => {
                if (err) throw err;
              })
            }
          }
          db.user.destroy({ where: { idUser: userId } })
            .then(() => { return res.status(200).json({ message: "Compte effacé" }) })
            .catch(error => { return res.status(500).json({ error }) })
        }
        else {
          return res.status(404).json({ message: "Vous voulez supprimer un compte non existant" })
        }
      })

  }
  else {
    return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
  }


}
exports.deleteAvatar = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
  const userId = decodedToken.userId;


  if (userId == req.params.id.split("=")[1]) {

    db.user.findOne({
      attributes: ["url_avatar"],
      where: { idUser: userId }
    })
      .then(resultat => {
        if (resultat != null) {
          if (resultat.url_avatar != "") {
            let url_avatar = "./images" + resultat.url_avatar.split("/images")[1]
            if (fs.existsSync(url_avatar)) {
              fs.unlink(url_avatar, (err) => {
                if (err) throw err;
              })
            }
          }
        }
      })
    db.user.update({
      url_avatar: ""
    }, { where: { idUser: userId } }).then(() => res.status(200).json({ message: "Avatar supprimé" })).catch(error => res.status().json({ error }))
  }
  else {
    return res.status(401).json({ message: "Vous n'êtes pas propriétaire du compte" })
  }
}