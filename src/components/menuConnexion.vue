<template>
  <div class="conteneur_menu">
    <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale" v-bind:actionVoulue="actionVoulue"></modale>
    <ul v-show="true">
      <li v-on:click="toggleModale">Connexion</li>
      <li v-on:click="toggleModale">S'inscrire</li>
    </ul>
  </div>
</template>

<script>
import modale from "./modaleLogin.vue";

export default {
  name: "menuConnexion",
  data(){
    return{
      revele:false,
      actionVoulue:0,
    }
  },
  components: {
    modale: modale,
  },
  methods: {
    toggleModale() {
      this.revele= !this.revele;
      this.actionVoulue=0;
    },
    choixActionVoulue(){
    this.actionVoulue = !this.actionVoulue
    }
  },
};
</script>

<style scoped="scss">
li {
  list-style-type: none;
  cursor: pointer;
}
</style>