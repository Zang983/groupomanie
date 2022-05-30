<template>
    <header>
        <div class="logo"></div>
            <img src="../assets/logo.png">
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
<style scoped>

header
{
    display:flex;
    justify-content:space-between;
    align-items: center;
}
ul
{
    width:15%;
    display:flex;
    justify-content: space-between;
}
li
{
    list-style-type:none;
}
</style>