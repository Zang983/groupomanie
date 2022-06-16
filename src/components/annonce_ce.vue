<template>
  <div class="ce_posts_container">
    <h2>
      Annonce C.E.
      <button v-on:click="getAnnonceList()" class="refresh_button">
        <i class="fa-solid fa-arrows-rotate"></i>
      </button>
      <i
        class="fa-solid fa-envelope"
        v-on:click="toggleNouvelleAnnonce = !toggleNouvelleAnnonce"
      ></i>
    </h2>
    <div class="envoiAnnonce" v-show="toggleNouvelleAnnonce">
      <textarea v-model="nouvelleAnnonce"></textarea>
      <button
        class="send_button send_button__full_size"
        v-on:click="newAnnounce"
      >
        Envoyer
      </button>
    </div>
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
        class="send_button send_button__full_size"
        v-on:click="editMessageCE(index)"
        v-show="annonce.editMode"
      >
        Éditer
      </button>
      <div class="administration_ce">
        <i
          class="fa-solid fa-pen-to-square edit_button_ce"
          v-on:click="toggleEditMode(index)"
        ></i>
        <i
          class="fa-solid fa-trash-can delete_button_ce"
          v-if="annonce.idCE"
          v-on:click="deleteMessageCE(index)"
        ></i>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "annonceCe",

  methods: {
    newAnnounce() {
      let requestPath = "http://localhost:3000/api/ceMessage/";
      let infoAnnonce = {
        idUser: this.$store.state.idUser,
        body: this.nouvelleAnnonce,
      };
      let promiseThis = this;
      axios
        .post(requestPath, infoAnnonce, {
          headers: { authorization: `Bearer ${this.$store.state.token}` },
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
      this.$forceUpdate();
    },
    getAnnonceList() {
      let requestPath = "http://localhost:3000/api/ceMessage/all";
      let promiseThis = this;
      this.annonceList = [];

      axios
        .get(requestPath, {
          headers: { authorization: `Bearer ${this.$store.state.token}` },
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
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(() => {
          promiseThis.annonceList.splice(index, 1);
        });
    },
    editMessageCE(index) {
      let requestPath = `http://localhost:3000/api/ceMessage/${this.annonceList[index].idCE}`;
      let promiseThis = this;
      let infoAnnonce = {
        idCE: this.annonceList[index].idCE,
        access: this.$store.state.access,
        message: this.annonceList[index].message,
      };

      axios
        .put(requestPath, infoAnnonce, {
          headers: { authorization: `Bearer ${this.$store.state.token}` },
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
