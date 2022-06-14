<template>
  <div class="posts_bloc">
    <h2>
      Fil d'actu
      <i class="fa-solid fa-envelope" v-on:click="newPost"></i>
    </h2>
    <article class="user_new_post" v-if="this.newMessage.showIt == 1">
      <div class="header_new_post">
        <label
          >Titre de votre message :
          <input
            v-model="newMessage.title"
            class="new_title"
            placeholder="Votre titre"
        /></label>
        <div class="action_post"></div>
      </div>
      <p class="message_post">
        <label>
          <textarea
            v-model="newMessage.body"
            class="new_message"
            placeholder="Votre message :"
          >
          </textarea>
        </label>
      </p>
      <div class="send_block">
        <button v-on:click="post()" class="send_button">Envoyer</button>
        <input type="file" id="send_picture" accept=".jpeg,.jpg,png" />
        <!-- <i class="fa-solid fa-image"></i> -->
      </div>
    </article>
    <div
      class="user_post"
      v-for="(message, index) in posts"
      :key="message.statusLock"
    >
      <post
        v-bind:index="index"
        v-bind:lockStatus="message.lockStatus"
        v-bind:body="message.body"
        v-bind:title="message.title"
        v-bind:author="message.author"
        v-bind:id="message.id"
        v-bind:postDate="message.postDate"
        v-bind:editDate="message.editDate"
        v-bind:showAllMessage="message.showAllMessage"
        v-bind:like="message.like"
        v-bind:userId="message.userId"
        v-bind:urlImage="message.urlImage"
        v-bind:editMode="editMode"
        @editPost="editPost"
        @deletePostFromList="deletePostFromList"
        @lockPost="lockPost"
        @deleteImage="deleteImage"
      ></post>
    </div>
    <div class="blocPagination" v-if="nombrePage > 1">
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

export default {
  name: "postList",
  props: ["changementRequete"],
  components: {
    post,
  },
  methods: {
    lockPost(index, id) {
      let requestPath = "http://localhost:3000/api/posts/post/lock";
      let infoPost = {
        idPosts: id,
        lockStatus: !this.posts[index].lockStatus,
      };
      let request = new Request(requestPath, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoPost),
      });
      fetch(request).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      });
    },
    newPost() {
      this.newMessage.showIt = !this.newMessage.showIt;
      this.newMessage.body = "";
      this.newMessage.title = "";
    },
    getListPost(page) {
      let numeroRequete = this.$store.state.numeroRequete;
      let requestPath = `http://localhost:3000/api/posts/post/requete=${numeroRequete}/page=${page}`;
      let promiseThis = this;
      this.posts = [];

      fetch(requestPath)
        .then(function (res) {
          if (res.ok) {
            promiseThis.pageActuelle = page;
            return res.json();
          }
        })
        .then(function (value) {
          for (let message of value.Post) {
            let newMessage = {
              body: "",
              author: "",
              title: "",
              postDate: "",
              editDate: "",
              id: 0,
              editMode: false,
              showAllMessage: true,
              readerRate: "",
              like: null,
              userId: "",
              urlImage: "",
              lockStatus: "",
            };
            newMessage.body = message.contenu;
            newMessage.author = message.user.firstname + " " + message.user.lastname;
            newMessage.title = message.titre;
            newMessage.postDate = message.dateCreation;
            newMessage.editDate = message.dateDernierEdit;
            newMessage.id = message.idPost;
            newMessage.urlImage = message.url_image;
            newMessage.userId = message.idUser;
            newMessage.lockStatus = message.lockStatus;
            newMessage.like = message.likeStatus;
            promiseThis.posts.push(newMessage);
            promiseThis.nombrePage = value.nombrePage / 5;
            promiseThis.nombrePage = Math.ceil(value.nombrePage / 5);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    deletePostFromList(index, id) {
      let requestPath = `http://localhost:3000/api/posts/post/delete/id=${id}`;
      let corps = {
        id: id,
        userId: this.$store.state.idUser,
      };
      let request = new Request(requestPath, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(corps),
      });
      fetch(request)
        .then(() => {
          this.getListPost(this.pageActuelle);
        })
        .catch((error) => console.log(error));
    },
    deleteImage(id) {
      let requestPath = `http://localhost:3000/api/posts/post/update/${id}`;
      let infoPost = new FormData();
        infoPost.append("idPost", id);
        infoPost.append("supprimeImage",1);

      let request = new Request(requestPath, {
        method: "PUT",
        body: infoPost,
      });
      fetch(request).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      });
    },
    editPost(id, newTitle, newBody,image) {
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
      let request = new Request(requestPath, {
        method: "PUT",
        body: infoPost,
      });
      fetch(request).then(function (res) {
        if (res.ok) {
          return res.json();
        }
      });
      this.editMode = false;
    },
    post() {
      let requestPath = "http://localhost:3000/api/posts/post";
      let infoPost = {};
      this.author = this.$store.state.userName;
      let image = document.querySelector("#send_picture").files[0];

      infoPost = new FormData();
      infoPost.append("author", this.$store.state.userName);
      infoPost.append("body", this.newMessage.body);
      infoPost.append("title", this.newMessage.title);
      infoPost.append("users_idUser", this.$store.state.idUser);
      infoPost.append("image", image);
      let request = new Request(requestPath, {
        method: "POST",
        body: infoPost,
      });

      fetch(request)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() => {
          this.getListPost(this.pageActuelle);
          this.newPost();
          this.$emit("updateListPost");
        });
    },
  },

  data() {
    return {
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