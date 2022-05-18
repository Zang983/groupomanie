<!--
  Il faut : Préparer la fonction permettant d'afficher le formulaire ajoutant un commentaire (faire une réf sur le parent posts.vue).
  Faire une fonction permettant l'édit d'un commentaire.
  Faire une fonction permettant : le like/dislike | le lock | la suppression 
-->

<template>
  <div class="commentary_bloc">
    <div class="write_comment" v-if="toggleWrite">
      <textarea placeholder="Votre commentaire" v-model="commentaires.body">
      </textarea>
      <button class="btn--no_style" @click="writeComment()">
        <i class="fa-solid fa-envelope-circle-check"></i>
      </button>
    </div>
    <div v-if="showComment">
      <div class="commentary" v-for="comment of listComment" :key="comment.id">
        <p class="commentary_action">
          <i
            class="fa-solid fa-pen-to-square"
          ></i>
          <i
            class="fa-solid fa-trash-can"
          ></i>
        </p>
        {{ comment.auteur }} à écrit : {{ comment.body }} on était le :
        {{ comment.heure }}.
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
      this.idPost = this.postId;
      this.commentaires.push({
        auteur: "Zang",
        body: this.commentaires.body,
        heure: this.getAllDate(),
        idPost: this.postId,
      });
      this.commentaires.body = "";
      this.toggleWriteComment();
      if (!this.showComment) {
        this.toggleStatutShow();
      }
    },
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
          idPost: 0,
        },
        {
          auteur: "ADMIN",
          body: "Pas mal le post !",
          heure: "8 juillet 2020 à 18h20",
          idCommentaire: 0,
          idPost: 1,
        },
        {
          auteur: "Ed",
          body: "je trouve que tu as totalement raison",
          heure: "5 mai 2020 à 16h20",
          idCommentaire: 0,
          idPost: 1,
        },
        {
          auteur: "Marine",
          body: "je pense que tu as tort",
          heure: "5 septembre 2022 à 06h20",
          idCommentaire: 0,
          idPost: 3,
        },
        {
          auteur: "MIka",
          body: "C'est de la merde",
          heure: "5 septembre 2022 à 03h22",
          idCommentaire: 2,
          idPost: 3,
        },
        {
          auteur: "Jacky",
          body: "Ou est Michel?",
          heure: "15 septembre 2022 à 06h20",
          idCommentaire: 0,
          idPost: 2,
        },
        {
          auteur: "Michel",
          body: "DTC",
          heure: "5 septembre 2022 à 16h20",
          idCommentaire: 0,
          idPost: 2,
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./comment.scss" scoped>
</style>