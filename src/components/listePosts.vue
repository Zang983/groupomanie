<template>
  <div class="bloc_post">
    <h2>
      Exprimez vous !
      <i class="fa-solid fa-envelope" v-on:click="newPost"></i>
    </h2>
    <div class="bloc_nouveau_post" v-if="this.newMessage.showIt == 1">
      <div class="entete_nouveau_post">
        <label
          >Titre de votre message :
          <input
            v-model="newMessage.title"
            class="titre_nouveau_post"
            placeholder="Votre titre"
        /></label>
        <p class="erreur_titre" v-if="erreur_titre">
          Champ obligatoire, 60 caractères maximum
        </p>
      </div>
      <div class="contenu_nouveau_message">
        <label>
          <textarea
            v-model="newMessage.body"
            class="new_message"
            placeholder="Votre message :"
          >
          </textarea>
        </label>
      </div>
      <div class="bloc_bouton_nouveau_post">
        <button
          v-on:click="post()"
          class="bouton_envoi"
          aria-label="Envoi article"
        >
          Envoyer
        </button>
        <button aria-label="Bouton d'envoi d'image" class="bouton_envoi_image">
          <label class="label_envoi_image">
            <input
              class="envoi_image_cache"
              id="send_picture"
              type="file"
              accept=".jpeg,.jpg,.png"
            />
            <i class="fa-solid fa-image"></i>
          </label>
        </button>

        <!-- <i class="fa-solid fa-image"></i> -->
      </div>
    </div>

    <post
      v-for="(message, index) in posts"
      :key="index"
      v-bind:index="index"
      v-bind:body="message.body"
      v-bind:title="message.title"
      v-bind:author="message.author"
      v-bind:id="message.id"
      v-bind:postDate="message.postDate"
      v-bind:editDate="message.editDate"
      v-bind:showAllMessage="message.showAllMessage"
      v-bind:initLike="message.like"
      v-bind:userId="message.userId"
      v-bind:urlImage="message.urlImage"
      v-bind:editMode="editMode"
      v-bind:avatar="message.avatar"
      @editPost="editPost"
      @deletePostFromList="deletePostFromList"
      @deleteImage="deleteImage"
    ></post>

    <div class="bloc_pagination" v-if="nombrePage > 1">
      <span
        v-for="page in nombrePage"
        v-bind:key="page"
        class="pagination"
        v-on:click="getListPost(page)"
        v-bind:class="{ pageActuelle: page === pageActuelle }"
      >
        {{ page }}</span
      >
    </div>
  </div>
</template>


<script>
import post from "./post.vue";
import axios from "axios";

export default {
  name: "postList",
  props: ["changementRequete"],
  components: {
    post,
  },
  methods: {
    //On reset les champs à chaque nouveau post.
    newPost() {
      this.newMessage.showIt = !this.newMessage.showIt;
      this.newMessage.body = "";
      this.newMessage.title = "";
    },
    //On récupére la liste des posts pour la page voulue.
    getListPost(page) {
      this.pageActuelle = page;
      let requestPath = `http://localhost:3000/api/posts/post/page=${page}`;
      let promiseThis = this;
      this.posts = [];
      let token = this.$store.state.token + document.cookie.split("=")[1];

      axios
        .get(requestPath, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(function (value) {
          for (let message of value.data.Post) {
            let newMessage = {};
            newMessage.body = message.contenu;
            newMessage.author =
              message.user.firstname + " " + message.user.lastname;
            newMessage.title = message.titre;
            newMessage.postDate = message.dateCreation;
            newMessage.editDate = message.dateDernierEdit;
            newMessage.id = message.idPost;
            newMessage.urlImage = message.url_image;
            newMessage.userId = message.idUser;
            if (
              message.user.url_avatar != "" &&
              message.user.url_avatar != null
            ) {
              newMessage.avatar = message.user.url_avatar;
            } else {
              newMessage.avatar =
                "http://localhost:3000/images/defaultProfil.jpg";
            }
            newMessage.like = -1;
            for (let like of message.aimers) {
              if (like.idUser === promiseThis.$store.state.idUser) {
                newMessage.like = like.valeur;
              }
            }
            promiseThis.posts.push(newMessage);
            promiseThis.nombrePage = value.data.nombrePage / 5;
            promiseThis.nombrePage = Math.ceil(value.data.nombrePage / 5);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //On supprime un post
    deletePostFromList(index, id) {
      let requestPath = `http://localhost:3000/api/posts/post/delete/id=${id}`;
      let token = this.$store.state.token + document.cookie.split("=")[1];
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
          this.getListPost(this.pageActuelle);
        })
        .catch((error) => {
          console.log(error);
          this.getListPost(this.pageActuelle);
        });
    },
    //Suppression exclusive de l'image
    deleteImage(id) {
      let requestPath = `http://localhost:3000/api/posts/post/update/${id}`;
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let infoPost = new FormData();
      infoPost.append("idPost", id);
      infoPost.append("supprimeImage", 1);
      infoPost.append("users_idUser", this.$store.state.idUser);

      axios
        .put(requestPath, infoPost, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          console.log("ici");
          this.getListPost(this.pageActuelle);
        })
        .catch((error) => {
          console.log(error);
          this.getListPost(this.pageActuelle);
        });
    },
    //Edition du post
    editPost(id, newTitle, newBody, image) {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/posts/post/update/${id}`;
      let infoPost = {};
      this.author = this.$store.state.userName;
      infoPost = new FormData();
      infoPost.append("idPost", id);
      infoPost.append("author", this.$store.state.userName);
      infoPost.append("body", newBody);
      infoPost.append("title", newTitle);
      infoPost.append("users_idUser", this.$store.state.idUser);
      infoPost.append("image", image[0]);

      axios
        .put(requestPath, infoPost, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.getListPost(this.pageActuelle);
        })
        .catch(this.getListPost(this.pageActuelle));
      this.editMode = false;
    },
    //Ajout d'un nouveau post.
    post() {
      let requestPath = "http://localhost:3000/api/posts/post";
      let infoPost = {};
      this.author = this.$store.state.userName;
      let image = document.querySelector("#send_picture").files[0];
      let token = this.$store.state.token + document.cookie.split("=")[1];
      if (this.newMessage.title.length <= 60 && this.newMessage.title != "") {
        this.erreur_titre=false;
        infoPost = new FormData();
        infoPost.append("author", this.$store.state.userName);
        infoPost.append("body", this.newMessage.body);
        infoPost.append("title", this.newMessage.title);
        infoPost.append("users_idUser", this.$store.state.idUser);
        infoPost.append("image", image);
        axios
          .post(requestPath, infoPost, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then(() => {
            this.getListPost(this.pageActuelle);
            this.newPost();
          })
          .catch((error) => console.log(error));
      } else {
        this.erreur_titre = true;
      }
    },
  },

  data() {
    return {
      erreur_titre: false,
      pageActuelle: 1,
      nombrePage: 0,
      editMode: "",
      posts: {},
      newMessage: {
        body: "",
        title: "",
        postDate: "",
        showIt: false,
      },
    };
  },
  beforeMount() {
    this.getListPost(1);
  },
};
</script>

<style lang="scss" src="./listePost.scss">
</style>