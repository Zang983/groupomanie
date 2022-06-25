<template>
  <div class="parametre">
    <button class="fermeture_parametre"><i class="fa-solid fa-xmark" v-on:click="fermeture()"></i></button>
    <div class="header_parametre">
      <div class="avatar_utilisateur_parametre">
        <button class="edition_image" aria-label="Edition image">
          <label>
            <input
              type="file"
              id="imageUser"
              class="invisible"
              accept=".jpeg,.jpg,.png" />
            <i class="fa-solid fa-pen-to-square"></i
          ></label>
        </button>
        <img
          v-bind:src="avatar"
          alt="Votre image"
          v-if="avatar !== '' && avatar !== null"
        />
        <img
          src="../assets/images/defaultProfil.jpg"
          class="avatar_auteur_post"
          alt="Avatar par défaut"
          v-if="avatar === '' || avatar === null"
        />
        <button
          class="supprimer_image"
          aria-label="Suppression image"
          v-on:click="supprimeAvatar"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <h2>
        {{ this.prenom }} {{ this.nom }}
      </h2>
    </div>

    <form>
      <label for="telephone" title="Dix numéros consécutifs."
        >Téléphone* :</label
      >
      <input
        type="tel"
        id="telephone"
        v-model="telephone"
        autocomplete="new-username"
      />
      <label for="description">Description :</label>
      <textarea id="description" v-model="description"></textarea>
      <label
        for="password1"
        title="Une majuscule, un chiffre et 8 caractères minimum"
        >Nouveau mot de passe* :</label
      >
      <input
        type="password"
        autocomplete="new-password"
        v-model="mdp1"
        id="password1"
      />
      <label for="password2">Confirmation nouveau mot de passe</label>
      <input
        type="password"
        autocomplete="new-password"
        id="password2"
        v-model="mdp2"
      /><br />
    </form>
    <button
      aria-label="Mise à jour du profil"
      class="bouton_envoi"
      v-on:click="majProfil"
    >
      Envoyer
    </button>
    <button
      aria-label="Suppression du compte"
      class="bouton_envoi suppression_compte"
      v-on:click="supprimerCompte"
    >
      Supprimer mon compte
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "modaleParametre",
  data() {
    return {
      prenom: "",
      nom: "",
      description: "",
      mdp1: "",
      mdp2: "",
      email: this.$store.state.email,
      telephone: "",
      image2: "",
      avatar: "",
    };
  },
  methods: {
    getMyProfil() {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/auth/profil/id=${this.$store.state.idUser}`;
      axios
        .get(requestPath, { headers: { authorization: `Bearer ${token}` } })
        .then((value) => {
          this.prenom = value.data.firstName;
          this.nom = value.data.lastName;
          this.description = value.data.userDescription;
          this.avatar = value.data.url_avatar;
          this.telephone = value.data.telephone;
        })
        .catch((error) => console.log("error\n" + error));
    },
    majProfil() {
      if (this.mdp1 != this.mdp2) {
        alert("Mots de passe incorrect");
      } else {
        let token = this.$store.state.token + document.cookie.split("=")[1];
        let image = document.querySelector("#imageUser").files[0];
        let requestPath = `http://localhost:3000/api/auth/parametre/id=${this.$store.state.idUser}`;
        let infoRequete = new FormData();
        infoRequete.append("userDescription", this.description);
        infoRequete.append("pwd1", this.mdp1);
        infoRequete.append("pwd2", this.mdp2);
        infoRequete.append("image", image);
        infoRequete.append("telephone", this.telephone);
        axios
          .put(requestPath, infoRequete, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then(() => {
            alert("Vos modifications sont enregistrées");
            this.$emit("fermeture");
          })
          .catch((error) => console.log(error));
      }
    },
    supprimerCompte() {
    if(confirm("Voulez vous supprimer votre compte"))
    {
            let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/auth/delete/id=${this.$store.state.idUser}`;
      let corps = {
        userId: this.$store.state.idUser,
      };
      axios
        .delete(requestPath, {
          data: { corps },
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.showModale();
        })
        .catch((error) => console.log(error));

    }

    },
    supprimeAvatar() {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/auth/deleteAvatar/id=${this.$store.state.idUser}`;
      let corps = {
        userId: this.$store.state.idUser,
      };
      axios
        .delete(requestPath, {
          data: { corps },
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.getMyProfil();
        })
        .catch((error) => {
          alert("Problème lors de la suppresion de votre compte");
          console.log(error);
        });
    },
    fermeture() {
      this.$emit("fermeture");
    },
    showModale() {
      //envoi vers le composant bannière un signal pour remettre la modale
      this.$emit("showModale");
    },
  },
  beforeMount() {
    this.getMyProfil();
  },
};
</script>

<style lang="scss" scoped src="./parametre.scss">
</style>