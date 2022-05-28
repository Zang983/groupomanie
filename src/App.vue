<!--

      -------------------- TO DO LIST --------------------
      Finir les différentes requêtes BACKEND
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
      Refaire tout le style CSS sous SASS en 7-1
      
-->
<template>
  <div id="app">
  <modale></modale>
  <blague></blague>  
  <navBar></navBar>
  <div class="hbody">
    <membersList></membersList>
  <posts></posts>
  <cePosts></cePosts>
</div>

  </div>
</template>

<script>

import modale from "./components/modale.vue";
import blague from "./components/blague.vue";
import navBar from "./components/navbar.vue";
import posts from "./components/posts.vue";
import cePosts from "./components/annonce_ce.vue";
import membersList from "./components/members_list.vue";
//import MenuConnexion from './components/menuConnexion.vue'

export default {
  name: 'App',
  components: {
    modale,
    blague,
    navBar,
    posts,
    cePosts,
    membersList,
  },

}

</script>

<style>
.hbody
{

  display:flex;
  margin-top:5%;
}
body
{
  background-color:rgba(40, 42, 52, 0.151);
}
</style>