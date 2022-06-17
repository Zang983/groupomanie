<template>
  <div class="bloc-modale" v-if="!revele">
    <div class="overlay"></div>
    <div class="modale card">
      <div class="header-card">
        <h1 v-if="status">Connexion</h1>
        <h1 v-if="!status">Inscription</h1>
        <h2 v-if="status">
          Vous n'êtes pas inscrit ?
          <span v-on:click="toggleStatus">Inscrivez-vous !</span>
        </h2>
        <h2 v-if="!status">
          Vous êtes déjà inscrit ?
          <span v-on:click="toggleStatus">Connectez-vous !</span>
        </h2>
        <form>
          <label>
            Adresse mail :
            <input
              type="email"
              id="email"
              v-model="email.value"
              v-on:change="checkInput"
              autocomplete="username"
              placeholder="Veuillez saisir votre e-mail."
            />
            <p v-if="email.isValid == 0">
              Veuillez saisir votre adresse e-mail professionnelle.
            </p>
          </label>
          <label>
            Mot de passe :
            <input
              type="password"
              autocomplete="current-password"
              id="pwd"
              v-model="pwd.value"
              v-on:change="checkInput"
              placeholder="Votre mot de passe."
            />
            <p v-if="pwd.isValid == 0">Êtes-vous sûr de votre mot de passe?</p>
          </label>
          <label v-if="!status">
            Nom :
            <input
              type="text"
              id="lastName"
              placeholder="Votre nom"
              v-model="lastName.value"
              v-on:change="checkInput"
            />
            <p v-if="lastName.isValid == 0">Veuillez saisir votre nom</p>
          </label>
          <label v-if="!status">
            Prénom :
            <input
              type="text"
              placeholder="Votre prénom"
              v-model="firstName.value"
              v-on:change="checkInput"
              id="firstName"
            />
            <p v-if="firstName.isValid == 0">Veuillez saisir votre prénom.</p>
          </label>
        </form>
      </div>
      <button v-on:click="submitForm">Envoyer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "fenetre_modale",
  methods: {
    toggleModale(value) //On récupère le retour de la promesse, si la requête de connexion ou d'inscription à échouée, la modale reste en premier plan. 
    {
      if (value != undefined) {
        this.revele = !this.revele;
      }
    },
    submitForm() {
      let infoUser = "",
        requestPath = "";
      if (this.status) {
        infoUser = { email: this.email.value, pwd: this.pwd.value };
        requestPath = "http://localhost:3000/api/auth/login";
      } else {
        infoUser = {
          email: this.email.value,
          pwd: this.pwd.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
        };
        requestPath = "http://localhost:3000/api/auth/signup";
      }
      let request = new Request(requestPath, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoUser),
      });
      fetch(request)
        .then(function (res) {
            return res.json();
          })
        .then((value) => {
          let token ="";
          let tokenCookie="";
          if(value.token!=undefined ||value.token==="")
          {/* A adapter selon le retour de la fonction login coté back*/

           this.$store.commit('saveIdUser',value.user.idUser)
           token=value.token.slice(0,value.token.length/2)
           tokenCookie=value.token.slice(value.token.length/2,value.token.length)
           let date = new Date(Date.now()+ 7200000)
           date = date.toUTCString();
           document.cookie=`token=${tokenCookie};expires=${date};samesite="strict"`
           localStorage.setItem("token",token)
           localStorage.setItem("access",value.user.access)
           localStorage.setItem("idUser",value.user.idUser)
           this.$store.commit('saveToken',token)
           this.$store.commit('levelPermission',value.user.access)

           this.toggleModale(value);
           this.$emit('showModaleOff')
          }
          });
          
    },
    toggleStatus() {
      this.status = !this.status;
      this.$forceUpdate;
    },
    checkInput(event) {
      let element = null;
      let validator = "";

      switch (event.srcElement.id) {
        case "email":
          element = this.email;
          validator = new RegExp(
            /^[a-zA-Z0-9.-_]+[@]{1}(groupomania)[.]{1}(fr)$/
          ).test(element.value);
          break;
        case "pwd":
          element = this.pwd;
          validator = new RegExp(
            /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,32})$/
          ).test(element.value);
          break;
        case "firstName":
          element = this.firstName;
          validator = new RegExp(/[0-9]/).test(element.value);
          validator = !validator;
          break;
        case "lastName":
          element = this.lastName;
          validator = new RegExp(/[0-9]/).test(element.value);
          validator = !validator;
          break;
      }

      if (!validator) {
        element.isValid = false;
      }
      if (element.value == "" || validator) {
        element.isValid = true;
      }
      this.$forceUpdate();
    },
  },
  data() {
    return {
      status: true, //defini si on est en mode connexion ou inscription
      revele: false,//pour savoir si on révèle la modale
      /* Définition des différents champs du formulaire pour voir s'ils sont valide ou non.*/
      email: {
        value: "",
        isValid: true,
      },
      pwd: {
        value: "",
        isValid: true,
      },
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isvalid: true,
      },
    };
  },
};
</script>
<style lang="scss" scoped src="./modale.scss">
</style>