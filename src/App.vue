<template>
  <div id="app">
    <modale @showModaleOff="showModaleOff" v-if="!show"></modale>
    <div id="hideBeforeConnexion" v-if="show == true && showParametre==false">
      <banniere @showModale="showModale" @showParametre="toggleParametre"></banniere>
      <blague></blague>
      <main>
        <membersList></membersList>
        <posts @updateListPost="updateListPost" :key="listPostVersion"></posts>
        <cePosts></cePosts>
      </main>
    </div>
    <parametre v-if="showParametre" @fermeture="toggleParametre" @showModale="showModale"></parametre>
  </div>
</template>

<script>
import blague from "./components/blague.vue";
import modale from "./components/connexion.vue";
import banniere from "./components/banniere.vue";
import posts from "./components/listePosts.vue";
import cePosts from "./components/annonce_ce.vue";
import membersList from "./components/members_list.vue";
import parametre from "./components/parametre.vue";

export default {
  name: "App",
  components: {
    blague,
    modale,
    banniere,
    posts,
    cePosts,
    membersList,
    parametre,
    
  },
  methods: {
    checkCookie(){
      setTimeout(this.checkCookie,10000);
     
      if(document.cookie.length===0)
      {
        this.show=false;
      }
    },
    updateListPost() {
      this.listPostVersion = +1;
    },
    showModale() {
      localStorage.clear();
      document.cookie = `token="";max-age=-5;samesite="strict"`;
      this.show = false;
    },
    toggleParametre()
    {
      this.showParametre = !this.showParametre
    },
    showModaleOff() {
      this.show = true;
    },
  },
  data() {
    return {
      listPostVersion: 1,
      showParametre:false,
      show: false,
    };
  },
  beforeMount() {
    if (localStorage.getItem("token") && localStorage.getItem("access") && localStorage.getItem("idUser")) {
      this.$store.commit("saveToken", localStorage.getItem("token"));
      this.$store.commit("levelPermission", localStorage.getItem("access"));
      this.$store.commit("saveIdUser", localStorage.getItem("idUser"));
      this.show = true;
    }
 this.checkCookie()
  },
};
</script>

<style lang="scss">
$couleur-primaire:#FD2D01;
$couleur-secondaire:#FFd7d7;
$couleur-tertiaire : #4E5166;
$couleur-primaire-opacite:#fd2b0173;

@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');


i, button
{
  cursor:pointer;
}
html
{
  height:fit-content;
}

body {
  font-family:Lato,arial;
  margin: 0px;
  background-color: #5b5e74;
  background-image:url("./assets/images/background.png")
}
main
{
  width:95%;
  margin:auto;
  display:flex;
  justify-content: space-around;
  margin-top:1%;
  background-color:$couleur-primaire-opacite;

}

//Bouton "envoyer"  ou "éditer", similaire au bouton de la page d'accueil
.bouton_envoi {
    display:block;
    color: $couleur-tertiaire;
    font-weight: bold;
    text-transform: uppercase;
    height: 30px;
    width: 95px;
    margin:10px auto;
    border-radius: 20px;
    border: 3px solid lightgray;
        &:hover {
            background-color: #fe765f;
        }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: rotateX(20deg);
        transform: rotatey(180deg);
        opacity: 0.5
    }
    100% {
        opacity: 1;
        transform: rotate(0deg);
    }
}
</style>