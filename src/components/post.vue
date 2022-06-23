<template>
  <article class="conteneur_post">
    <!-- HEURE ET BLOC "NOUVEAU" -->
    <p class="info_date_post">
      Écrit le : <strong>{{ postDateFr }}</strong>
    </p>
    <!-- Titre de larticle -->
    <h3 class="titre_post_utilisateur">
      <span v-show="!modeEdit">{{ this.newTitle }}</span>
      <input
        type="text"
        class="modification_titre_post"
        v-show="modeEdit"
        v-model="newTitle"
      />
    </h3>

    <!-- Avatar, nom de l'auteur et boutons d'actions -->
    <div class="en_tete_post">
      <div class="info_auteur_post">
        <img
          v-bind:src="this.avatar"
          class="avatar_auteur_post"
          alt="Image utilisateur"
          v-if="avatar != '' && avatar != null"
        />
        <img
          src="../assets/logo.png"
          class="avatar_auteur_post"
          alt="Avatar par défaut"
          v-if="avatar === '' || avatar === null"
        />
        {{ this.author }}
      </div>
      <div class="action_post">
        <button
        aria-label="Édition de l'article"
          v-on:click="toggleEditPost()"
          v-if="
            this.idUser == this.$store.state.idUser ||
            this.$store.state.access == '00001'
          "
        >
          <i class="fa-solid fa-pen-to-square modification_post"></i>
        </button>
        <button
        aria-label="Suppression de l'article"
          v-on:click="deletePostFromList(index, id)"
          v-if="
            this.userId == this.$store.state.idUser ||
            this.$store.state.access == '00001'
          "
        >
          <i class="fa-solid fa-trash-can suppression_post"></i>
        </button>
      </div>
    </div>
    <!-- Contenu du message -->
    <div class="message_post">
      <div>
        <figure>
          <div class="conteneur_principal_image" v-if="this.urlImage != undefined && this.urlImage != ''" >
          <img
            class="image_post"
            v-if="this.urlImage != undefined && this.urlImage != ''"
            v-bind:src="this.urlImage"
            alt="image de l'article"
          />
          <button
            aria-label="Suppression image"
            class="supprimer_image"
            v-on:click="deleteImage"
            v-if="
              this.userId == this.$store.state.idUser ||
              this.$store.state.access == '00001'"
       
          >
            <i class="fa-solid fa-trash-can" ></i>
          </button>
          </div>
          <figcaption class="corpsMessage" v-show="!modeEdit">
            {{ this.newBody }}
          </figcaption>
        </figure>
      </div>
    </div>
    <!-- MODE EDIT -->
    <div v-show="modeEdit" class="edition_message">
      <textarea v-model="newBody"></textarea>
      <div class="send_block">
        <button aria-label="Envoi message édité" v-on:click="editPost(id)" class="bouton_envoi">
          Éditer mon message
        </button>
        <button aria-label="Bouton d'envoi d'image" class="bouton_envoi_image">
          <label class="label_envoi_image">
            <input
              class="envoi_image_cache"
              type="file"
              accept=".jpeg,.jpg,png"
            />
            <i class="fa-solid fa-image"></i>
          </label>
        </button>
      </div>
    </div>
    <!-- FIN DU MODE EDIT -->
    <div class="footer_post">
      <button aria-label="Like" class="like" @click="sendLike(1, id)">
        <i
          class="fa-solid fa-thumbs-up"
          v-bind:class="{ blueLike: like === 1 }"
        ></i>
      </button>
      <button aria-label="Dislike" class="dislike" @click="sendLike(0, id)">
        <i
          class="fa-solid fa-thumbs-up"
          v-bind:class="{ redLike: like === 0 }"
        ></i>
      </button>
      <button aria-label="Voir commentaires de l'article" @click="showComments(index)">
        <i class="fa-solid fa-message"></i>
      </button>
    </div>
    <commentList
      v-if="commentVisibility"
      v-bind:postId="id"
      v-on:showComments="showComments()"
    ></commentList>
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
    toggleEditPost() {
      //let file=document.querySelector(".send_button").files[0];
      this.modeEdit = !this.modeEdit;
    },
    editPost() {
      let image = "";
      let bouton = document.querySelectorAll(".envoi_image_cache")[this.index];
      image = bouton.files;
      this.$emit("editPost", this.id, this.newTitle, this.newBody, image);
      this.toggleEditPost();
    },
    deleteImage() {
      if (confirm("Voulez vous vraiment supprimer votre image ?")) {
        this.$emit("deleteImage", this.id);
      }
    },
    deletePostFromList(index, id) {
      if (confirm("Voulez vous vraiment supprimer votre message ?")) {
        this.$emit("deletePostFromList", index, id);
      }
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
      let token = this.$store.state.token + document.cookie.split("=")[1];
      const infoLike = {
        valeur: valeurLike,
        idPost: id,
        idUser: this.$store.state.idUser,
      };
      let requestPath = `http://localhost:3000/api/posts/post/like/id=${id}`;

      axios
        .post(requestPath, infoLike, {
          headers: { authorization: `Bearer ${token}` },
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

<style lang="scss" scoped src="./post.scss">
</style>