<template>
  <div class="ce_posts_container">
    <h2>
      <button class="bouton_gestion_ce" aria-label="Nouvelle annonce CE">
        <i
          class="fa-solid fa-envelope nouveau_ce"
          v-if="this.$store.state.access === '00001'"
          v-on:click="toggleNouvelleAnnonce = !toggleNouvelleAnnonce"
        ></i>
      </button>
      Annonce C.E.
      <button
        aria-label="Actualisation liste"
        v-on:click="getAnnonceList()"
        class="bouton_gestion_ce"
      >
        <i class="fa-solid fa-arrows-rotate rafraichissement_ce"></i>
      </button>
    </h2>
    <div class="envoiAnnonce" v-show="toggleNouvelleAnnonce">
      <textarea v-model="nouvelleAnnonce"></textarea>
      <button
        aria-label="Envoi annonce"
        v-on:click="newAnnounce"
        class="bouton_envoi"
      >
        Envoyer
      </button>
    </div>
    <div class="liste_message_ce">
    <div class="post_CE" v-for="(annonce, index) of annonceList" :key="index">
      <p class="message_post_ce" v-show="!annonce.editMode">
        {{ annonce.message }}
      </p>
      <textarea
        class="message_post_ce"
        v-show="annonce.editMode"
        v-model="annonce.message"
      ></textarea>
      <button
        aria-label="Edition message CE"
        class="bouton_envoi"
        v-on:click="editMessageCE(index)"
        v-show="annonce.editMode"
      >
        Éditer
      </button>
      <div class="administration_ce">
        <button
          aria-label="Edition message CE"
          v-on:click="toggleEditMode(index)"
        >
          <i class="fa-solid fa-pen-to-square edition_ce"></i>
        </button>
        <button
          aria-label="Suppression message"
          v-if="annonce.idCE"
          v-on:click="deleteMessageCE(index)"
        >
          <i class="fa-solid fa-trash-can suppression_ce"></i>
        </button>
      </div>
    </div></div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "annonceCe",

  methods: {
    newAnnounce() {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = "http://localhost:3000/api/ceMessage/";
      let infoAnnonce = {
        idUser: this.$store.state.idUser,
        body: this.nouvelleAnnonce,
      };
      let promiseThis = this;
      axios
        .post(requestPath, infoAnnonce, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          promiseThis.toggleNouvelleAnnonce =
            !promiseThis.toggleNouvelleAnnonce;
          promiseThis.annonceList.push({
            idCe: "",
            message: promiseThis.nouvelleAnnonce,
            visible: 1,
          });
          promiseThis.nouvelleAnnonce = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    toggleEditMode(index) {
      this.annonceList[index].editMode = !this.annonceList[index].editMode;
      this.$forceUpdate(); //vue ne detecte pas le changement dans le tableau
    },
    getAnnonceList() {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = "http://localhost:3000/api/ceMessage/all";
      let promiseThis = this;
      this.annonceList = [];
      axios
        .get(requestPath, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((value) => {
          promiseThis.annonceList = value.data.resultat;
          for (let message in promiseThis.annonceList) {
            promiseThis.annonceList[message].editMode = false;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    deleteMessageCE(index) {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/ceMessage/id=${this.annonceList[index].idCE}`;
      let corps = {
        id: this.annonceList[index].idCE,
        userId: this.$store.state.idUser,
        access: this.$store.state.access,
      };
      let promiseThis = this;

      axios
        .delete(requestPath, {
          data: { corps },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          promiseThis.annonceList.splice(index, 1);
        });
    },
    editMessageCE(index) {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = `http://localhost:3000/api/ceMessage/${this.annonceList[index].idCE}`;
      let promiseThis = this;
      let infoAnnonce = {
        idCE: this.annonceList[index].idCE,
        access: this.$store.state.access,
        message: this.annonceList[index].message,
        userId: parseInt(this.$store.state.idUser),
      };

      axios
        .put(requestPath, infoAnnonce, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(() => {
          promiseThis.toggleEditMode(index);
        })
        .catch((error) => console.log(error));
    },
  },

  data() {
    return {
      nouvelleAnnonce: "",
      annonceList: [],
      toggleNouvelleAnnonce: false,
    };
  },
  beforeMount() {
    this.getAnnonceList();
  },
};
</script>

<style lang="scss" src="./annonce_ce.scss" scoped>
</style>
