<!--
      -------------------- TO DO LIST --------------------

      Finir les différentes requêtes BACKEND !
        - Requête like
        - Requête editPOst
      /!\ Finir l'association dans les tables like et aimer 
      Rajouter l'authentification middleware
      Faire la navBar et voir si l'utilisation de vue Router est pertinent.
      Modifier la liste des membres pour classer selon les services.
      Coder l'affichage CE.
      Faire la partie "configuration de compte" avec : 
        -> Choix de l'avatar.
        -> Changement de service (liste d'option selon les services présents)
        -> Changement de MDP
      Voir pour l'utilisation de cookies pour stocker le JWT pour le maintien de la session
      Finir de lié les différents boutons des posts aux actions BACKEND.
      Rajouter les boutons "editer", "supprimer" et "lock" aux commentaires.
      Revoir tout les noms de classes et variables.

      -------------------- BUG LIST --------------------
      lors de l'écriture d'un nouveau post, l'affichage ne se refresh pas.
        piste envisagée -> vm.$set || Vue.set mais ne fonctionne pas, à voir pourquoi.
      Lors du vérrouillge d'un post, l'actualisation du dom ne se fait pas.

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
    updateListPost(){
        this.listPostVersion =+1;
        console.log("C'est update normalement" + this.listPostVersion)
      
    },
    showModaleOff() {
      this.show = true;
    },
  },
  data() {
    return {
      listPostVersion:1,
      show: false,
    };
  },
};
</script>

<style>
.hbody {
  display: flex;
  margin-top: 5%;
}
body {
  font-size:1.35em;
  background-color: rgba(40, 42, 52, 0.151);
}
</style>