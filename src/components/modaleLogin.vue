<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay"></div>
    <div class="modale card">
      <div class="header-card">
        <h1 v-if="status">Connexion</h1>
        <h1 v-if="!status">Inscription</h1>
        <h2 v-if="status"> Vous n'êtes pas inscrit ? <span v-on:click="toggleStatus">Inscrivez-vous !</span></h2>
        <h2 v-if="!status"> Vous êtes déjà inscrit ? <span v-on:click="toggleStatus">Connectez-vous !</span></h2>
        <form>
          <label>
            Adresse mail :
            <input type="email" id="email" v-model="email.value" v-on:change="checkInput" placeholder="Veuillez saisir votre e-mail." />
            <p v-if="email.isValid == 0">
              Veuillez saisir votre adresse e-mail professionnelle.
            </p>
          </label>
          <label>
            Mot de passe :
            <input type="password" id="pwd" v-model="pwd.value" v-on:change="checkInput" placeholder="Votre mot de passe." />
            <p v-if="pwd.isValid == 0">
              Êtes-vous sûr de votre mot de passe?
            </p>
          </label>
           <label v-if="!status">
            Nom :
            <input type="text" id="lastName" placeholder="Votre nom" v-model="lastName.value" v-on:change="checkInput" />
            <p v-if="lastName.isValid == 0">Veuillez saisir votre nom</p>
          </label>
          <label v-if="!status">
            Prénom :
            <input type="text" placeholder="Votre prénom" v-model="firstName.value" v-on:change="checkInput" id="firstName" />
            <p v-if="firstName.isValid == 0">Veuillez saisir votre prénom.</p>
          </label>
        </form>
      </div>
      <button v-on:click="toggleModale">Envoyer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "fenetre_modale",
  // props:['revele','toggleModale','actionVoulue'],
  methods: {
    toggleModale() {
      this.revele = !this.revele;
   
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
            /^[a-zA-Z0-9.-_]+[@]{1}(groupomanie)[.]{1}(fr)$/
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
          validator= new RegExp(/[0-9]/).test(element.value);// eslint-disable-line
          validator = !validator
          break;
        case "lastName":
          element = this.lastName;
          validator= new RegExp(/[0-9]/).test(element.value);// eslint-disable-line
          validator = !validator
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

    sendInformationToDB() {},
  },
  data() {
    return {
      status: true, //defini si on est en mode connexion ou inscription
      revele: true, //pour savoir si on révèle la modale
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
<style scoped>
h1,
h2 {
  padding: 0px;
  margin: 0px;
}
form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 62%;
}
label {
  margin-top: 2%;
}
.header-card {
  margin: 1%;
  padding-bottom: 20px;
}
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:2;
}
.overlay {
  background-color: black;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

}
.modale {
  display: flex;
  flex-direction: column;
  background-color: #4a4343;
  color: rgb(255, 255, 255);
  padding: 15px 20px;
  position: fixed;
  width: 50%;
  border-radius: 25px;
  box-shadow: 1px 1px 2px 2px #6b6161;
  z-index:2;
}
span {
  color: lightblue;
  cursor: pointer;
}
</style>