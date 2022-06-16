


<template>
  <div class="contenantCommentaire">
    <div class="enTeteCommentaire">
      <h2>Commentaires</h2>
      <i class="fa-solid fa-xmark" v-on:click="fermeture()"></i>
    </div>
    <div class="bloc_nouveau_commentaire">
      <textarea
        class="nouveau_commentaire"
        v-model="nouveauCommentaire"
      ></textarea>
      <button v-on:click="envoieCommentaire()">
        <i class="fa-solid fa-envelope"></i>
      </button>
    </div>
    <commentaire
      v-for="(message,index) of listeCommentaire"
      v-bind:key="index"
      v-bind:message="message"
      v-bind:index="index"
      @deleteCommentaire="deleteCommentaire"
      @lockCommentaire="lockCommentaire"
      @editCommentaire="editCommentaire"
      >
    </commentaire>
  </div>
</template>


<script>
import commentaire from "./commentaire.vue";
import axios from "axios"
export default {
  name: "CommentList",
  props: ["postId"],
  components: {
    commentaire,
  },

  methods: {
    getCommentaire() {
      let promiseThis=this
      let requestPath = `http://localhost:3000/api/comment/postId=${this.postId}`;
      
      axios
        .get(requestPath, {
          headers: { authorization: `Bearer ${this.$store.state.token}` },
        })
        .then( reponse=>{
          this.listeCommentaire=[]
          let valeurLike=-1;
          for (let commentaire of reponse.data) {
            for(let like of commentaire.likes)
            {
              if(like.idUser===promiseThis.$store.state.idUser)
              {
               valeurLike = like.valeur
              }
            }
            let nouveauCommentaire = {
              auteur:commentaire.user.firstname + " " + commentaire.user.lastname,
              userId:commentaire.idUser,
              valeurLike : valeurLike,
              idCommentaire: commentaire.idCommentaire,
              contenu: commentaire.contenu,
              dateCreation: commentaire.dateCreation,
              dateDernierEdit: commentaire.dateDernierEdit,
              lockStatus: false,
              StatutEditMode:false,
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
      let requestPath = "http://localhost:3000/api/comment/";
      let infoCommentaire = {
        idUser: this.$store.state.idUser,
        userName: this.$store.state.userName,
        body: this.nouveauCommentaire,
        idPost: this.postId,
      };
      let promiseThis = this;
      axios.post(requestPath,infoCommentaire,{headers: { authorization: `Bearer ${this.$store.state.token}` }})
        .then(function (res) {
          if (res.ok) {
            promiseThis.getCommentaire();
            promiseThis.nouveauCommentaire="";
          } 
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCommentaire(id,index){
      let requestPath = `http://localhost:3000/api/comment/:id=${id}`;
      let corps = {
        id: id,
        userId: this.$store.state.idUser,
      };

        axios.delete(requestPath, {
          data: { corps },
          headers: { authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(() => {
          this.listeCommentaire.splice(index,1)

        })
        .catch((error) => console.log(error));


    },
    lockCommentaire(index,id){
        let requestPath = `http://localhost:3000/api/comment/lock/id=${this.postId}`;
        let promiseThis=this
      let infoPost = {
        idCommentaire: id,
        lockStatus: !this.listeCommentaire[index].lockStatus,
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
          promiseThis.listeCommentaire[index].lockStatus = !promiseThis.listeCommentaire[index].lockStatus
          return res.json();
        }
      });

    },
    editCommentaire(id, nouveauContenu) {
      let requestPath = `http://localhost:3000/api/comment/id=${id}`;
      let infoPost = {
        nouveauCommentaire: nouveauContenu,
        idUser: this.$store.state.idUser,
      };
      axios.put(requestPath,infoPost,{headers:{ authorization: `Bearer ${this.$store.state.token}` }})
      .then(function (res) {
        if (res.ok) {
          this.editMode = false;
          return res.json();
        }
      });
      
    },
  },

  data() {
    return {
      auteur: "",
      idCommentaire: "",
      dateCreation: "",
      lockStatus: "",
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