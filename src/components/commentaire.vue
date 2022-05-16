<template>
  <div class="commentary_bloc" v-if="this.showComment!='false'">
      <div>
          JE SUIS LE COMMENTAIRE
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
          console.log(this.showComment)
          console.log(this.postId)
          this.$forceUpdate()
      }
  },
  computed:{
     

  },
  data() {
    return {

 
      
      

    };
  },
  beforeMount() {
      this.afficheStatut();
  },
};
</script>

<style lang="scss" src="./comment.scss" scoped>
</style>