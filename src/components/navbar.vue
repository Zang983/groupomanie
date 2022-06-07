<template>
  <div class="navbar">
    <ul class="filtre">
      <li><button class="filtre_btn" v-on:click="requeteDemandee(1)"> Mes posts</button></li>
      <li><button class="filtre_btn" v-on:click="requeteDemandee(2)">Les dernières 24h</button></li>
      <li><button class="filtre_btn" v-on:click="requeteDemandee(0)">Accueil</button></li>
      <li><button class="filtre_btn" v-on:click="requeteDemandee(3)">Mes likes</button></li>
      <li><button class="filtre_btn">Encore une chose ici</button></li>
    </ul>

  </div>

</template>
<script>
export default {
  name: "navBar",

  methods: {
    requeteDemandee(numero){
      this.$store.commit('requeteDemandee', numero)
    },


  },
  data() {
    return {

    };
  },
  beforeMount() {},
};
</script>
<style scoped lang="scss">
.navbar
{
  width:100%
}
.filtre
{
  width:95%;
  margin:auto; 
  display:flex;
  justify-content: space-between;
}
.filtre li
{
width:calc(95% / 5);
display:flex;
justify-content: center;
}
 .filtre_btn
 {
   border:2px solid lightblue;
   background-color:white;
   height:40px;
   width:60%;
   border-radius:30px;
   transition:0.5s;
   font-weight:bold;
 }
  .filtre_btn:hover
  {
    cursor:pointer;
    background-color:lightblue;
    border:2px solid white;
  }
</style>