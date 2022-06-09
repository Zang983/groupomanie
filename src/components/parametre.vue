<template>
  <div class="parametre">
    <div class="header_parametre">
      <h2>Vos paramètres</h2>
      <i class="fa-solid fa-xmark" v-on:click="fermeture()"></i>
    </div>
    <form>
      <label for="firstname">Prénom :</label
      ><input
        type="text"
        id="firstname"
        v-model="prenom"
        autocomplete="new-username"
      />
      <label for="lastname">Nom : </label
      ><input
        type="text"
        id="lastname"
        v-model="nom"
        autocomplete="new-username"
      />

      <label for="imageUser">Votre photo : </label
      ><input type="file" id="imageUser" accept=".jpeg,.jpg,png" />
      <img v-bind:src="avatar" alt="Image de l'utilisateur" v-if="avatar!=''" v-on:click="supprimeAvatar">
      <label for="telephone">Téléphone :</label>
      <input type="tel" id="telephone" v-model="telephone" autcomplete="new-username"/>
      <label for="description">Description :</label>
      <textarea id="description" v-model="description"></textarea>
      <label for="password1">Nouveau mot de passe :</label>
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
    <button v-on:click="majProfil">Envoyer</button>
    <button v-on:click="supprimerCompte">Supprimer mon compte</button>
  </div>
</template>

<script>

export default {
  name: "modaleParametre",
  data() {
    return {
      prenom: this.$store.state.firstname,
      nom: this.$store.state.lastname,
      description: this.$store.state.description,
      mdp1: "",
      mdp2: "",
      email: this.$store.state.email,
      telephone: this.$store.state.telephone,
      avatar:this.$store.state.avatar,
    };
  },
  methods: {
    majProfil() {
      let image = document.querySelector("#imageUser").files[0];
      let requestPath = `http://localhost:3000/api/auth/parametre/id=${this.$store.state.idUser}`;
      let infoRequete = new FormData();
      infoRequete.append("firstname", this.prenom);
      infoRequete.append("lastname", this.nom);
      infoRequete.append("userDescription", this.description);
      infoRequete.append("pwd1", this.mdp1);
      infoRequete.append("pwd2", this.mdp2);
      infoRequete.append("image", image);
      infoRequete.append("telephone",this.telephone);

      let request = new Request(requestPath, {
        method: "PUT",
        body: infoRequete,
      });
      fetch(request).then(() => console.log("oki"));
    },
    supprimerCompte() {
      let requestPath = `http://localhost:3000/api/auth/delete/id=${this.$store.state.idUser}`;
      let corps = {
        userId: this.$store.state.idUser,
      };
      let request = new Request(requestPath, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(corps),
      });
      fetch(request)
         .then(() => { /*this.showModale()*/})
        .catch((error) => console.log(error));
    },
    supprimeAvatar(){

      let requestPath = `http://localhost:3000/api/auth/deleteAvatar/id=${this.$store.state.idUser}`;
      let corps = {
        userId: this.$store.state.idUser,
      };
      let request = new Request(requestPath, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(corps),
      });
      fetch(request)
         .then(() => { /*this.showModale()*/})
        .catch((error) => console.log(error));

    },
    fermeture() {
      this.$emit("fermeture");
    },
    showModale()//envoi vers le composant bannière un signal pour remettre la modale
    {
      this.$emit("showModale")
    }
  },
};
</script>

<style lang="scss" src="./parametre.scss">
</style>