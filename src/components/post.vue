<template>
  <article>
    <div class="header_post">
      <div class="user_img--post">
        <img v-bind:src="this.avatar" alt="Image utilisateur" v-if="avatar!='' && avatar!=null">
        <img src="../assets/logo.png" alt="Avatar de l'utilisateur" v-if="avatar==='' || avatar===null"/>
        {{this.author}}
      </div>
      <h3 v-show="!modeEdit">{{ this.newTitle }}</h3>
      <input type="text" v-show="modeEdit" v-model="newTitle" />
      <div class="action_post">
        <i
          class="fa-solid fa-pen-to-square"
          v-on:click="toggleEditPost()"
          v-if="this.idUser == this.$store.state.idUser || this.$store.state.access==='00001'" 
        ></i>
        <i
          class="fa-solid fa-trash-can"
          v-on:click="deletePostFromList(index,id)"
          v-if="this.userId == this.$store.state.idUser || this.$store.state.access==='00001'" 
        ></i>

      </div>
    </div>
    <div class="message_post">
    <p class="image_post" v-if="this.urlImage!=undefined && this.urlImage!=''"><img class="image_post" v-bind:src="this.urlImage" alt="image de l'article">        
     <i class="fa-solid fa-trash-can supprimerImage"
          v-on:click="deleteImage"
        ></i></p>
    <p class="corpsMessage" v-show="!modeEdit">
      {{ this.newBody }}
    </p></div>
    <!-- MODE EDIT -->
    <div v-show="modeEdit">
      <textarea class="textarea__edit" v-model="newBody"></textarea>
      <div class="send_block">
        <button v-on:click="editPost(id)" class="send_button">Éditer mon message {{index}}</button>
        <input type="file" class="send_picture" accept=".jpeg,.jpg,png">
      <!-- <button class="send_picture"><i class="fa-solid fa-image"></i></button> -->
      </div>
    </div>
    <!-- FIN DU MODE EDIT -->
    <div class="footer_post">
      <p class="info_date_post">
         Écrit le : <strong>{{ postDateFr }}</strong>
      </p>
      <div class="likeAndCommentary">
        <i class="fa-solid fa-thumbs-up likeUp" v-bind:class="{blueLike : like===1}" @click="sendLike(1, id)"></i>
        <i class="fa-solid fa-thumbs-up likeDown" v-bind:class="{redLike : like===0}" @click="sendLike(0, id)"></i>
        <i class="fa-solid fa-message" @click="showComments(index)" ></i>
        <commentList v-if="commentVisibility" v-bind:postId="id" v-on:showComments="showComments()"></commentList>
      </div>
    </div>
  </article>
</template>

<script>
import commentList from "./listeCommentaire.vue";
import axios from "axios";
export default {
  name: "UniquePost",
  components: {
    commentList,
  },
  props: [
    "index",
    "initLike",
    "body",
    "title",
    "author",
    "id",
    "postDate",
    "editDate",
    "userId",
    "urlImage",
    "editMode",
    "avatar",
  ],

  data() {
    return {
      idUser: this.userId,
      modeEdit: this.editMode,
      like: this.initLike,
      newBody: this.body,
      newTitle: this.title,
      showAll: false,
      postDateFr:
        new Date(this.postDate).toLocaleDateString("fr") +
        " à " +
        new Date(this.postDate).toTimeString().slice(0, 8),
      editDateFr:
        new Date(this.editDate).toLocaleDateString("fr") +
        " à " +
        new Date(this.postDate).toTimeString().slice(0, 8),
      commentVisibility: false,
    };
  },
  methods: {
    showComments() {
      this.commentVisibility = !this.commentVisibility;
    },
    showAllMessage() {
      this.showAll = !this.showAll;
      this.$forceUpdate();
    },
    toggleEditPost() {
      //let file=document.querySelector(".send_button").files[0];
      this.modeEdit = !this.modeEdit;
    },
    editPost() {
      let image = "";
      let bouton = document.querySelectorAll(".send_picture")[this.index];
      image = bouton.files;
      this.$emit("editPost", this.id, this.newTitle, this.newBody, image);
      this.toggleEditPost();
    },
    deleteImage() {
      this.$emit("deleteImage", this.id);
    },
    deletePostFromList(index, id) {
      this.$emit("deletePostFromList", index, id);
    },
    sendLike(valeurLike, id) {
      if (this.like == undefined || this.like == null || this.like === -1) {
        this.like = valeurLike;
      } //si l'utilisateur à déjà (dis)liké le post
      else {
        if (this.like === valeurLike) {
          //l'utilisateur souhaite être neutre
          valeurLike = -1; //on défini valeurLike à -1, ce qui implique la suppression du statut du like côté API
          this.like = -1;
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
        idPost: id,
        idUser: this.$store.state.idUser,
      };
      let requestPath = `http://localhost:3000/api/posts/post/like/id=${id}`;

      axios
        .post(requestPath, infoLike, {
          headers: { authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        });
    },
  },
};
</script>

<style lang="scss" src="./post.scss">
</style>