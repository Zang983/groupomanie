<template>
  <div class="commentaire">
    <div class="enTeteCommentaire">
      {{ message.auteur }} à écrit le : {{ this.commentaireDateFr }}
      <div class="interractionCommentaire">
        <i
          class="fa-solid fa-trash-can" 
           v-if="this.idUser == this.$store.state.idUser || this.$store.state.access==='00001'" 
          v-on:click="deleteCommentaire()"></i>
        <i
          class="fa-solid fa-pen-to-square"
          v-if="this.idUser == this.$store.state.idUser || this.$store.state.access==='00001'" 
          v-on:click="toggleEditCommentaire"></i>
      </div>
    </div>
    <div class="contenuCommentaire" v-if="!editMode">{{ nouveauCommentaire }}</div>
    <div class="modificationCommentaire"  v-if="editMode"><textarea
        class="nouveau_commentaire"
        v-model="nouveauCommentaire"
      ></textarea>
      <button class="send_button" v-on:click="editCommentaire">Éditer</button></div>

    <div class="interractionLike">
      <i
        class="fa-solid fa-thumbs-up likeUp"
        v-bind:class="{blueLike : like===1}"
        @click="likeCommentaire(1, message.idCommentaire)"></i>
      <i
        class="fa-solid fa-thumbs-up likeDown"
        v-bind:class="{redLike : like===0}"
        @click="likeCommentaire(0, message.idCommentaire)"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "commentaireUnique",
  props: ["message", "index",],

  data() {
    return {
      like:this.message.valeurLike,
      idUser:this.message.userId,
      nouveauCommentaire:this.message.contenu,
      editMode: this.message.statutEditMode,
      commentaireDateFr:
        new Date(this.message.dateCreation).toLocaleDateString("fr") +
        " à " +
        new Date(this.message.dateCreation).toTimeString().slice(0, 8),
      editCommentaireDateFr:
        new Date(this.message.dateDernierEdit).toLocaleDateString("fr") +
        " à " +
        new Date(this.message.dateDernierEdit).toTimeString().slice(0, 8),
    };
  },
  methods: {
    toggleEditCommentaire() {
      this.editMode = !this.editMode;
    },
    deleteCommentaire() {
      this.$emit("deleteCommentaire", this.message.idCommentaire, this.index);
    },
    likeCommentaire(valeurLike, id) {
      if (this.like === undefined || this.like === null || this.like===-1) {
        this.like = valeurLike;
      } //si l'utilisateur à déjà (dis)liké le post
      else {
        if (this.like === valeurLike) {
          //l'utilisateur souhaite être neutre
          valeurLike = -1; //on défini valeurLike à -1, ce qui implique la suppression du statut du like côté API
          this.like = null;
        }
        if (this.like === 1 && valeurLike === 0) {
          // l'utilisateur aimé le like et le dislike
          this.like = 0;
        }
        if (this.like === 0 && valeurLike === 1) {
          //si l'utilisateur like plutôt que dislike un post.
          this.like = 1;
        }
      }
      
      const infoLike = {
        valeur: valeurLike,
        idCommentaire: id,
        idUser: this.$store.state.idUser,
      };
       let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/comment/like/id=${id}`;
      axios.post(requestPath, infoLike, {
          headers: { authorization: `Bearer ${token}` },
        }).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      });
    },
    editCommentaire() {
      this.$emit("editCommentaire", this.message.idCommentaire,this.nouveauCommentaire);
      this.toggleEditCommentaire();
    },
  },
};
</script>

<style lang="scss" src="./commentaire.scss">
</style>