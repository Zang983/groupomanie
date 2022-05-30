<template>
  <div class="posts_bloc">
    <h2>
      Fil d'actu <i class="fa-solid fa-message" v-on:click="newPost('1')"></i>
    </h2>

    <article class="user_new_post" v-if="this.newMessage.showIt == 1">
      <div class="header_new_post">
        <label
          >Titre de votre message :
          <input v-model="newMessage.title" class="new_title" placeholder="Votre titre"
        /></label>
        <div class="action_post"></div>
      </div>
      <p class="message_post">
        <label>
          <textarea v-model="newMessage.body" class="new_message" placeholder="Votre message :"> </textarea>
        </label>
      </p>
            <div class="send_block"><button v-on:click="post()" class="send_button">Envoyer</button>
      <button class="send_picture"><i class="fa-solid fa-image"></i></button></div>
    </article>
      <article class="user_post" v-bind:class="{user_post_locked:message.lockStatus}"  v-for="(message, index) in posts" :key="index">
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
      ></post>
      </article>
  </div>
</template>


<script>
import post from "./post.vue";

export default {
  name: "postList",

  components: {
    post
  },
  methods: {
    lockPost(index,id){

     let requestPath = "http://localhost:3000/api/posts/post/lock";
      let infoPost={
        idPosts:id,
        lockStatus:!this.posts[index].lockStatus
      }
      let promiseThis =this;

      let request = new Request(requestPath, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoPost),
      });
      fetch(request)
        .then(function (res){
          if (res.ok) {
            console.log(res)
            promiseThis.posts[index].statusLock= !promiseThis.posts[index].statusLock
            return res.json();
          }
        })  
        this.$forceUpdate()
    },
    getAllDate() {
      let date = new Date().toLocaleDateString("fr");
      let heure = new Date().toLocaleTimeString("fr");
      date += " à " + heure;
      return date;
    },
    newPost(value) {
      if (value != undefined) {
        this.newMessage.showIt = !this.newMessage.showIt;
        this.newMessage.body = "";
        this.newMessage.title = "";
      }
    },
    getListPost() {
      let requestPath = "http://localhost:3000/api/posts/post/page=1";
      let promiseThis = this;
      this.posts=[]
      fetch(requestPath)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
            for (let message of value) {
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
              userId:"",
              urlImage:"",
              lockStatus:"",
            };
            newMessage.body = message.contenu;
            newMessage.author = "Zangetsu";
            newMessage.title=message.titre;
            newMessage.postDate=message.dateCreation;
            newMessage.editDate=message.dateDernierEdit;
            newMessage.id=message.idPosts;
            newMessage.urlImage=message.url_image;
            newMessage.idUser=message.users_idUser;
            newMessage.lockStatus=message.lockStatus;
            newMessage.like=message.likeStatus;
            promiseThis.posts.push(newMessage);   
          }
        })
        .catch(function (err) {
          console.log(err);
        });
        this.$forceUpdate()         
    },
    deletePostFromList(index) {
      let requestPath = `http://localhost:3000/api/posts/post/delete/id=${this.posts[index].id}`;
      let corps={
        id:this.posts[index].id,
        userId:this.$store.state.idUser,
      }
      let request = new Request(requestPath, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body:JSON.stringify(corps)
      });
      let promiseThis=this;
      fetch(request)
        .then(function (res){
          if(res.ok)
          {
             promiseThis.posts.splice(index, 1);
          }
        });
     
    },
    /*Cette fonction permet au texte d'être éditable et détecte si on appuie sur échap ce qui permet d'annuler toute modification.*/

    editPost(id,newTitle,newBody) {
      let requestPath = `http://localhost:3000/api/posts/post/update/${id}`;
      let infoPost={
        idPosts:id,
        newTitle:newTitle,
        newBody:newBody,
        idUser:this.$store.state.idUser
      
      }
      let request = new Request(requestPath, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoPost),
      });
      fetch(request)
        .then(function (res){
          if (res.ok) {
            return res.json();
          }
        })
      this.editMode=false;
    },
    post() {
      let requestPath = "http://localhost:3000/api/posts/post";
      let infoPost = {};
      this.author = "Zangetsu";
      this.editDate = "";
      infoPost = {
        author: this.author,
        body: this.newMessage.body,
        title: this.newMessage.title,
        users_idUser:this.$store.state.idUser
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
        .then((value) => {
          this.newPost(value);
        });
    },
    sendLike(valeurLike, id) {
      if (this.like == undefined || this.like == null) {
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
        idPost: id,
        idUser:this.$store.state.idUser
      };
      let requestPath = `http://localhost:3000/api/posts/post/like/id=${id}`;

      let request = new Request(requestPath, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoLike),
      });
      fetch(request)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
    },
  },

  data() {
    return {
      editMode:"",
      posts: [],
      newMessage: {
        body: "",
        title: "",
        postDate: "",
        showIt: false,
      },
    };
  },
  beforeMount() {
    this.getListPost();
  },
};
</script>

<style lang="scss" src="./listePost.scss">
</style>