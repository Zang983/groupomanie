<template>
<div id="accueil">
    <header>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="-205 207 100 100" preserveAspectRatio="xMidYMid meet">
       <path d="M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z"></path>
        </svg>
      <h1>Groupomania Social Network</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-205 207 100 100" preserveAspectRatio="xMidYMid meet">
       <path d="M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z"></path>
        </svg>
      
    </header>
  <div class="conteneur_connexion">

<div class="illustration_societe">
     <img src="../assets/images/siege_social.jpg">
</div>
     <div class="menu_connexion">
      <div class="connexion_inscription">
    <h2 v-if="status">Connexion</h2>
    <h2 v-if="!status">Inscription</h2>
    <h3 v-if="status"> Vous n'êtes pas inscrit ? <span v-on:click="toggleStatus">Inscrivez-vous !</span></h3>
    <h3 v-if="!status">Vous êtes déjà inscrit ?<span v-on:click="toggleStatus"> Connectez-vous !</span></h3>
    </div>
    <form>
      <label>
        Adresse mail :
        <input
          type="email"
          id="email"
          v-model="email.value"
          v-on:change="checkInput"
          autocomplete="username"
          placeholder="Votre e-mail"
          autofocus
        />
      </label>
              <p v-if="email.isValid == 0" class="erreur_formulaire">
          Veuillez saisir votre adresse e-mail professionnelle.
        </p>
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

      </label>
              <p v-if="pwd.isValid == 0" class="erreur_formulaire">Êtes-vous sûr de votre mot de passe?</p>
      <label v-if="!status">
        Nom :
        <input
          type="text"
          id="lastName"
          placeholder="Votre nom"
          v-model="lastName.value"
          v-on:change="checkInput"
        />
      
      </label>
        <p v-if="lastName.isValid == 0" class="erreur_formulaire">Veuillez saisir votre nom</p>
      <label v-if="!status">
        Prénom :
        <input
          type="text"
          placeholder="Votre prénom"
          v-model="firstName.value"
          v-on:change="checkInput"
          id="firstName"
        />
       
      </label> <p v-if="firstName.isValid == 0" class="erreur_formulaire">Veuillez saisir votre prénom.</p>
          <button v-on:click.prevent="submitForm">Envoyer</button>
    </form>
    <p class="contact_admin">
      Cet espace est réservé aux employés de Groupomania, profitez de cet espace pour échanger et vous détendre ! 
      <br>
      <br>
      Vous avez des difficultés à vous connecter ? Contactez un <a href="mailto:admin@groupomania.fr"> administrateur</a> 
</p>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "fenetre_modale",
  methods: {
    toggleModale(
      value //On récupère le retour de la promesse, si la requête de connexion ou d'inscription à échouée, la modale reste en premier plan.
    ) {
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
          let token = "";
          let tokenCookie = "";
          if (value.token != undefined || value.token === "") {
            /* A adapter selon le retour de la fonction login coté back*/

            this.$store.commit("saveIdUser", value.user.idUser);
            token = value.token.slice(0, value.token.length / 2);
            tokenCookie = value.token.slice(
              value.token.length / 2,
              value.token.length
            );
            let date = new Date(Date.now() + 7200000);
            date = date.toUTCString();
            document.cookie = `token=${tokenCookie};expires=${date};samesite="strict"`;
            localStorage.setItem("token", token);
            localStorage.setItem("access", value.user.access);
            localStorage.setItem("idUser", value.user.idUser);
            this.$store.commit("saveToken", token);
            this.$store.commit("levelPermission", value.user.access);

            this.toggleModale(value);
            this.$emit("showModaleOff");
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
<style lang="scss" scoped src="./connexion.scss">
</style>