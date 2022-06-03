<template>
  <div class="posts_bloc">
    <h2>
      Fil d'actu <i class="fa-solid fa-message" v-on:click="newPost('1')"></i>
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
        <button class="send_picture"><i class="fa-solid fa-image"></i></button>
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
      ></post>
    </div>
    <div>
      <span v-for="page in nombrePage" v-bind:key="page" class="pagination" v-on:click="getListPost(page)" > {{page}}</span>
    </div>
  </div>
</template>


<script>
import post from "./post.vue";

export default {
  name: "postList",

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
      let requestPath = `http://localhost:3000/api/posts/post/page=${page}`;
      let promiseThis = this;
      this.posts = [];

      fetch(requestPath)
        .then(function (res) {
          if (res.ok) {
            promiseThis.pageActuelle=page
            return res.json();
          }
        })
        .then(function (value) {

          for (let message of value.Post) {
            let newMessage = {
              body: "",
              author: "Zang",
              title: "",
              postDate: "",
              editDate: "",
              id: 0,
              editMode: false,
              showAllMessage: true,
              readerRate: "",
              showComment: false,
              like: null,
              userId: "",
              urlImage: "",
              lockStatus: "",
            };
            newMessage.body = message.contenu;
            newMessage.author = message.auteur;
            newMessage.title = message.titre;
            newMessage.postDate = message.dateCreation;
            newMessage.editDate = message.dateDernierEdit;
            newMessage.id = message.idPosts;
            newMessage.urlImage = message.url_image;
            newMessage.idUser = message.users_idUser;
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
    editPost(id, newTitle, newBody) {
      let requestPath = `http://localhost:3000/api/posts/post/update/${id}`;
      let infoPost = {
        idPosts: id,
        newTitle: newTitle,
        newBody: newBody,
        idUser: this.$store.state.idUser,
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
      this.editMode = false;
    },
    post() {
      let requestPath = "http://localhost:3000/api/posts/post";
      let infoPost = {};
      this.author = this.$store.state.userName;
      this.editDate = "";
      infoPost = {
        author: this.$store.state.userName,
        body: this.newMessage.body,
        title: this.newMessage.title,
        users_idUser: this.$store.state.idUser,
        userName: this.$store.state.userName,
      };
      let request = new Request(requestPath, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoPost),
      });

      fetch(request)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() => {
          this.getListPost(0);
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