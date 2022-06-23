


<template>
  <div class="contenant_commentaire">
    <div class="en_tete_bloc_commentaire">
      <h2>Commentaires</h2>
      <button class="fermeture_commentaire" v-on:click="fermeture()" aria-label="Fermer les commentaires"><i class="fa-solid fa-xmark" ></i></button>
    </div>
    <div class="bloc_nouveau_commentaire">
      <label>Votre commentaire :
      <textarea
        class="nouveau_commentaire"
        v-model="nouveauCommentaire"
      ></textarea></label>
              <button v-on:click="envoieCommentaire()" class="bouton_envoi" aria-label="Envoi commentaire">Envoyer</button>

    </div>
    <commentaire
      v-for="(message, index) of listeCommentaire"
      v-bind:key="index"
      v-bind:message="message"
      v-bind:index="index"
      @deleteCommentaire="deleteCommentaire"
      @editCommentaire="editCommentaire"
    >
    </commentaire>
  </div>
</template>


<script>
import commentaire from "./commentaire.vue";
import axios from "axios";
export default {
  name: "CommentList",
  props: ["postId"],
  components: {
    commentaire,
  },

  methods: {
    getCommentaire() {
      let promiseThis = this;
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/comment/postId=${this.postId}`;

      axios
        .get(requestPath, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((reponse) => {
          this.listeCommentaire = [];
          let valeurLike = -1;
          for (let commentaire of reponse.data) {
            for (let like of commentaire.likes) {
              if (like.idUser === promiseThis.$store.state.idUser) {
                valeurLike = like.valeur;
              }
            }
            let nouveauCommentaire = {
              auteur: commentaire.user.firstname + " " + commentaire.user.lastname,
              avatar:commentaire.user.url_avatar,
              userId: commentaire.idUser,
              valeurLike: valeurLike,
              idCommentaire: commentaire.idCommentaire,
              contenu: commentaire.contenu,
              dateCreation: commentaire.dateCreation,
              dateDernierEdit: commentaire.dateDernierEdit,
              StatutEditMode: false,
            };
            this.listeCommentaire.push(nouveauCommentaire);
          }
        })
        .catch((error) => console.log(error));
    },
    fermeture() {
      this.$emit("showComments");
    },
    envoieCommentaire() {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = "http://localhost:3000/api/comment/";
      let infoCommentaire = {
        idUser: this.$store.state.idUser,
        userName: this.$store.state.userName,
        body: this.nouveauCommentaire,
        idPost: this.postId,
      };
      let promiseThis = this;
      axios
        .post(requestPath, infoCommentaire, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(()=> {

            promiseThis.getCommentaire();
            promiseThis.nouveauCommentaire = "";
       
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCommentaire(id) {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/comment/:id=${id}`;
      let corps = {
        id: id,
        userId: this.$store.state.idUser,
      };

      axios
        .delete(requestPath, {
          data: { corps },
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.getCommentaire();
        })
        .catch((error) => console.log(error));
    },
    editCommentaire(id, nouveauContenu) {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/comment/id=${id}`;
      let infoPost = {
        nouveauCommentaire: nouveauContenu,
        idUser: this.$store.state.idUser,
      };
      axios
        .put(requestPath, infoPost, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.editMode = false;
        });
    },
  },

  data() {
    return {
      auteur: "",
      idCommentaire: "",
      dateCreation: "",
      listeCommentaire: [],
      nouveauCommentaire: "",
    };
  },
  beforeMount() {
    this.getCommentaire();
  },
};
</script>

<style lang="scss" src="./listeCommentaire.scss" scoped>
</style>