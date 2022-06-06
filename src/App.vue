<!--
      -------------------- TO DO LIST --------------------
      Faire la barre de navigation/requêtes.
      Liste des membres
        -> créer une modale "carte de visite".
      Composant POST :
        -> Empêcher l'édition des messages locker des deux côtés.
      Composant Paramètres : 
        -> Créer une modale permettant :
          -> L'édition d'un petit message de présentation.
          -> Le changement de service.
          -> Le changement du mdp | adresse mail.
          -> La suppression du compte.
      Mettre en place le middleware d'identification.
      Mettre en place le middleware des images.
      Créer le composant gérant les commentaires (via une modale ?)
      Modifier tout le côté back en rajoutant les vérifications de droits.
-->
<template>
  <div id="app">
    <modale @showModaleOff="showModaleOff" v-if="!show"></modale>
    <div id="hideBeforeConnexion" v-if="show == true">
      <banniere></banniere>
      <navBar></navBar>
      <div class="hbody">
        <membersList></membersList>
        <posts @updateListPost="updateListPost" :key="listPostVersion"></posts>
        <cePosts></cePosts>
      </div>
    </div>
  </div>
</template>

<script>
import modale from "./components/modale.vue";
import banniere from "./components/banniere.vue";
import navBar from "./components/navbar.vue";
import posts from "./components/listePosts.vue";
import cePosts from "./components/annonce_ce.vue";
import membersList from "./components/members_list.vue";

export default {
  name: "App",
  components: {
    modale,
    banniere,
    navBar,
    posts,
    cePosts,
    membersList,
  },
  methods: {
    updateListPost() {
      this.listPostVersion = +1;
    },
    showModaleOff() {
      this.show = true;
    },
  },
  data() {
    return {
      listPostVersion: 1,
      show: false,
    };
  },
};
</script>

<style lang="scss">
.hbody {
  display: flex;
  margin-top: 5%;
  justify-content: space-around;
}

body {
  margin: 0px;
  min-width: 100%;
  font-size: 1.35em;
  background-color: rgba(40, 42, 52, 0.151);
}

.send_button {
  height: 35px;
  background-color: blue;
  width: 80%;
  color: white;
  &__full_size {
    width: 100%;
  }
}

</style>