<template>
  <div class="commentaire">
    <div class="enTeteCommentaire">
      <div class="auteur_heure">
        <img
          v-bind:src="message.avatar"
          class="avatar_auteur_commentaire"
          alt="Image auteur"
          v-if="message.avatar != '' && message.avatar != null"
        />
        <img
          src="../assets/images/defaultProfil.jpg"
          class="avatar_auteur_commentaire"
          alt="Avatar par défaut"
          v-if="message.avatar === '' || message.avatar === null"
        />
        <span class="nom_auteur">{{ message.auteur }}</span> à écrit le :
        {{ this.commentaireDateFr }}
      </div>
      <div class="interractionCommentaire">
        <button
          aria-label="Suppression commentaire"
          v-if="
            this.idUser == this.$store.state.idUser ||
            this.$store.state.access === '00001'
          "
          v-on:click="deleteCommentaire()"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <button
          aria-label="Édition commentaire"
          v-if="
            this.idUser == this.$store.state.idUser ||
            this.$store.state.access === '00001'
          "
          v-on:click="toggleEditCommentaire"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </div>
    <div class="contenuCommentaire" v-if="!editMode">
      {{ nouveauCommentaire }}
    </div>
    <div class="modificationCommentaire" v-if="editMode">
      <textarea
        class="edition_commentaire"
        v-model="nouveauCommentaire"
      ></textarea>
      <button
        aria-label="Envoi du commentaire édité"
        class="bouton_envoi"
        v-on:click="editCommentaire"
      >
        Éditer
      </button>
    </div>

    <div class="interraction_like">
      <button
        aria-label="Like"
        @click="likeCommentaire(1, message.idCommentaire)"
        class="like"
      >
        <i
          class="fa-solid fa-thumbs-up"
          v-bind:class="{ blueLike: like === 1 }"
        ></i>
      </button>
      <button
        aria-label="Dislike"
        @click="likeCommentaire(0, message.idCommentaire)"
        class="dislike"
      >
        <i
          class="fa-solid fa-thumbs-up"
          v-bind:class="{ redLike: like === 0 }"
        ></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "commentaireUnique",
  props: ["message", "index"],

  data() {
    return {
      like: this.message.valeurLike,
      idUser: this.message.userId,
      nouveauCommentaire: this.message.contenu,
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
      if (confirm("Voulez vous vraiment supprimer votre commentaire ?")) {
        this.$emit("deleteCommentaire", this.message.idCommentaire, this.index);
      }
    },
    likeCommentaire(valeurLike, id) {
      if (this.like === undefined || this.like === null || this.like === -1) {
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
    editCommentaire() {
      this.$emit(
        "editCommentaire",
        this.message.idCommentaire,
        this.nouveauCommentaire
      );
      this.toggleEditCommentaire();
    },
  },
};
</script>

<style lang="scss" scoped src="./commentaire.scss">
</style>