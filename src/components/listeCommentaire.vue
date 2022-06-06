<!-- TO DO LIST
  Mise en  forme des commentaires à faire.
jointure à ajouter sur la requête get.
ajout des boutons d'interraction (like/dislike/editer/supprimer/locker)
ajout des routes correspondantes. 
faire un composant "commentaire" celui-ci gérant la liste des commentaires comme pour les posts
-->


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
export default {
  name: "CommentList",
  props: ["postId"],
  components: {
    commentaire,
  },

  methods: {
    getCommentaire() {
      let requestPath = `http://localhost:3000/api/comment/postId=${this.postId}`;
      fetch(requestPath)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then((reponse) => {
          this.listeCommentaire=[]
          for (let commentaire of reponse) {
            let nouveauCommentaire = {
              auteur:
                "Zangetsu" /* A MODIFIER QUAND LES JOINTURES SERONT FAITES */,
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

      let request = new Request(requestPath, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoCommentaire),
      });
      let promiseThis = this;
      fetch(request)
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
          this.listeCommentaire.splice(index,1)

        })
        .catch((error) => console.log(error));


    },
    lockCommentaire(index,id){
        let requestPath = `http://localhost:3000/api/comment/lock/id=${this.postId}`;
        console.log(this.listeCommentaire[index].lockStatus)
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
      console.log(id)
      let requestPath = `http://localhost:3000/api/comment/id=${id}`;
      let infoPost = {
        nouveauCommentaire: nouveauContenu,
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