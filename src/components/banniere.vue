<template>
    <header>
        <div class="logo"></div>
            <img src="../assets/logo/icon-left-font-monochrome-black.svg">
        <blague></blague>
        <ul>
            <li>Paramètres</li>
            <li>Se déconnecter</li>
        </ul>
    </header>
</template>
<script>
import blague from "./blague.vue";

export default {
  name: "V-banniere",

    components: {
        blague,
    },

  methods: {
},
  data() {
      return {

      }
  },
  beforeMount() {
  },
};
</script>
<style src="./banniere.scss" lang="scss">

</style>