<template>
  <div id="app">
  <modale></modale>
  <blague></blague>  
  <navBar></navBar>
  <posts></posts>
  </div>
</template>

<script>
import modale from "./components/modaleLogin.vue";
import blague from "./components/blague.vue";
import navBar from "./components/navbar.vue";
import posts from "./components/posts.vue"
//import MenuConnexion from './components/menuConnexion.vue'

export default {
  name: 'App',
  components: {
    modale,
    blague,
    navBar,
    posts,
  //  MenuConnexion
  },

}

</script>

<style>

</style>