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