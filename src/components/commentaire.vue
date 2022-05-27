<!--
  Il faut : Préparer la fonction permettant d'afficher le formulaire ajoutant un commentaire (faire une réf sur le parent posts.vue).
  Faire une fonction permettant l'édit d'un commentaire.
  Faire une fonction permettant : le like/dislike | le lock | la suppression 
-->
<template>
  <div class="commentaries_bloc">
    <!-- Partie permettant d'écrire le commentaire -->
    <div class="write_comment" v-if="toggleWrite">
      <textarea placeholder="Votre commentaire" v-model="commentaires.body">
      </textarea>
      <button class="btn--no_style" @click="writeComment()">
        <i class="fa-solid fa-envelope-circle-check"></i>
      </button>
    </div>
    <!-- Affichage des commentaires.-->
    <div v-if="showComment">
      <div class="commentary" v-for="(comment,index) of listComment" :key="comment.id">
        <div class="header_commentary">
          <p class="commentary_author">
            <img src="../assets/logo.png" alt="Avatar de l'utilisateur" class="imgUser--commentary"/>
            {{ comment.auteur }}
          </p>
          <p class="commentary_date">{{ comment.heure }}</p>
          <p class="commentary_action">
            <button class="btn--no_style" @click="toggleEditComment(comment.idCommentaire)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn--no_style">
              <i class="fa-solid fa-trash-can" @click="deleteComment(comment.idCommentaire,index)"></i>
            </button>
          </p>
        </div>
        <p v-bind:contenteditable="comment.editMode">
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CommentList",
  props: ["postId"],

  methods: {
    toggleStatutShow() {
      this.showComment = !this.showComment;
      this.getComment();
    },
    toggleWriteComment() {
      this.toggleWrite = !this.toggleWrite;
    },
    getComment() {
      this.listComment = this.commentaires.filter(
        (commentaire) => commentaire.idPost === this.postId
      );
    },
    getAllDate() {
      let date = new Date().toLocaleDateString("fr");
      let heure = new Date().toLocaleTimeString("fr");
      date += " à " + heure;
      return date;
    },
    writeComment() {
      this.commentaires.heure = this.getAllDate();
      this.commentaires.push({
        auteur: "Zang",
        body: this.commentaires.body,
        heure: this.getAllDate(),
        idCommentaire : this.commentaires.length+1,
        idPost:this.postId,
        editMode:false,
      });
      
      this.commentaires.body = "";
      this.getComment();
      this.toggleWriteComment();
      if (!this.showComment) {
        this.toggleStatutShow();
      }
    },
    toggleEditComment(id) {
      this.commentaires[id].editMode = !this.commentaires[id].editMode;
      this.getComment()
      this.$forceUpdate();
    },
    deleteComment(id,index){
      this.listComment.splice(index,1)
    },
    // editComment(index) {
    //   let elementVise;
    //   if (event.code == "Escape") {
    //     if (event.target.localName == "p") {
    //       console.log(index + elementVise);
    //     }
    //     // else {

    //     // }
    //     //event.srcElement.firstChild.textContent = elementVise;
    //   }
    // },
  },
  computed: {},
  data() {
    return {
      listComment: [],
      showComment: false,
      toggleWrite: false,
      commentaires: [
        {
          auteur: "Jean",
          body: "je trouve que tu as totalement raison",
          heure: "5 juillet 2020 à 18h20",
          idCommentaire: 0,
          idPost: 3,
          editMode: false,
        },
        {
          auteur: "ADMIN",
          body: "Pas mal le post !",
          heure: "8 juillet 2020 à 18h20",
          idCommentaire: 1,
          idPost: 1,
          editMode: false,
        },
        {
          auteur: "Ed",
          body: "je trouve que tu as totalement raison",
          heure: "5 mai 2020 à 16h20",
          idCommentaire: 2,
          idPost: 1,
          editMode: false,
        },
        {
          auteur: "Marine",
          body: "je pense que tu as tort",
          heure: "5 septembre 2022 à 06h20",
          idCommentaire: 3,
          idPost: 0,
          editMode: false,
        },
        {
          auteur: "MIka",
          body: "C'est de la merde",
          heure: "5 septembre 2022 à 03h22",
          idCommentaire: 4,
          idPost: 0,
          editMode: false,
        },
        {
          auteur: "Jacky",
          body: "Ou est Michel?",
          heure: "15 septembre 2022 à 06h20",
          idCommentaire: 5,
          idPost: 3,
          editMode: false,
        },
        {
          auteur: "Michel",
          body: "DTC",
          heure: "5 septembre 2022 à 16h20",
          idCommentaire: 6,
          idPost: 2,
          editMode: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./comment.scss" scoped>
</style>