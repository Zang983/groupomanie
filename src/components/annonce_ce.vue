<template>
  <div class="ce_posts"> 
    <h2>Messages de votre CE</h2>
    <div class="body_CE" v-for="(annonce,index) of listAnnonce" :key="index">
      <p>{{annonce.body}}</p>
    </div>

  </div>
</template>


<script>
export default {
  name: "annonceCe",

  methods: {},

  data() {
    return {
      listAnnonce:[
        {
          body:"Vos chèque vacances sont disponibles, veuillez passer les prendre.",
          dateDebut:"15 mai 2022",
          dateFin:"20 juillet 2022",
          id:0,
        },
        {
          body:"Promotion dans différents parcs à thèmes,  veuillez passer au CE pour plus d'info !",
          dateDebut:"15 avril 2022",
          dateFin:"15 juillet 2022",
          id:1
        }

      ],
    }

  },
};
</script>

<style lang="scss" src="./annonce_ce.scss" scoped>
</style>
