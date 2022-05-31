<template>
  <div class="ce_posts_container">
    <h2>Annonce C.E.
      <i class="fa-solid fa-message" v-on:click="newAnnounce()"></i>
    </h2>
    <div class="post_CE" v-for="(annonce, index) of annonceList" :key="index">
      <p class="date_ce">
        Du : {{ annonce.dateDebut }} Au : {{ annonce.dateFin }}
      </p>
      <p class="message_post_ce">{{ annonce.message }}</p>

      <p class="administration_ce">
        <i
          class="fa-solid fa-pen-to-square edit_button_ce"
          v-on:click="editMessageCE(index)"
        ></i>
        <i
          class="fa-solid fa-trash-can delete_button_ce"
          v-on:click="deleteMessageCE(index)"
        ></i>
      </p>
    </div>
  </div>
</template>


<script>
export default {
  name: "annonceCe",

  methods: {
    getAnnonceList() {
      let requestPath = "http://localhost:3000/api/ceMessage/all";
      let promiseThis = this;
      this.annonceList = [];

      fetch(requestPath)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          promiseThis.annonceList = value.resultat;
          for (let message in promiseThis.annonceList) {
            promiseThis.annonceList[message].dateDebut = new Date(
              promiseThis.annonceList[message].dateDebut
            ).toLocaleDateString("fr");
            promiseThis.annonceList[message].dateFin = new Date(
              promiseThis.annonceList[message].dateFin
            ).toLocaleDateString("fr");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
      this.$forceUpdate();
    },
  },

  data() {
    return {
      annonceList: [],
    };
  },
  beforeMount() {
    this.getAnnonceList();
  },
};
</script>

<style lang="scss" src="./annonce_ce.scss" scoped>
</style>
