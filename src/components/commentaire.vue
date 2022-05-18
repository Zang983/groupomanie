<template>
  <div class="commentary_bloc" >
      <div v-if="this.showComment">
      </div>
  </div>
</template>


<script>
export default {
  name: "CommentList",
  props:['showComment','postId'],

  methods: {

    afficheStatut()
      {
          this.$forceUpdate()
      },
  },
  computed:{

    // afficheCommentaire()
    // {
    //   let listCommentaire
    //   if(!this.showComment)
    //   {
    //     console.log("ok")
    //   }
    //   return listCommentaire;
    // },
     

  },
  data() {

    return {

      commentaires:[{
        auteur :"Jean",
        body:"je trouve que tu as totalement raison",
        heure: "le 5 juillet 2020 à 18h20",
        idCommentaire:0,
        idPost:0
      },
      {
        auteur :"ADMIN",
        body:"Pas mal le post !",
        heure: "le 8 juillet 2020 à 18h20",
        idCommentaire:0,
        idPost:1
      },
            {
        auteur :"Ed",
        body:"je trouve que tu as totalement raison",
        heure: "le 5 mai 2020 à 16h20",
        idCommentaire:0,
        idPost:1
      },
            {
        auteur :"Marine",
        body:"je pense que tu as tort",
        heure: "le 5 septembre 2022 à 06h20",
        idCommentaire:0,
        idPost:3
      },],
    afficheCommentaire()
    {
      let listCommentaire
      if(!this.showComment)
      {
        console.log("ok")
      }
      return listCommentaire;
    }
    
    };
  },

};
</script>

<style lang="scss" src="./comment.scss" scoped>
</style>