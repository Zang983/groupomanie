<template>
    <header>
        <div class="logo"></div>
            <img src="../assets/logo/icon-left-font-monochrome-black.svg">
        <blague></blague>
        <ul>
            <li v-on:click="toggleParametre">Paramètres</li>
            <li v-on:click="showModale">Se déconnecter</li>
        </ul>
        <parametre v-if="parametreVisible" 
        @fermeture="toggleParametre"
        @showModale="showModale"></parametre>
    </header>
    
</template>
<script>
import blague from "./blague.vue";
import parametre from "./parametre.vue"

export default {
  name: "V-banniere",

    components: {
        blague,
        parametre,
    },

  methods: {
    toggleParametre()
    {
       this.parametreVisible = !this.parametreVisible
    },
    showModale()
    {
      this.$emit("showModale")
    }
},
  data() {
      return {
        parametreVisible:false

      }
  },
  beforeMount() {
  },
};
</script>
<style src="./banniere.scss" lang="scss">

</style>