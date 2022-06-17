<template>
  <div class="members_list">
    <h2>Liste des membres</h2>
    <div
      class="member"
      v-for="(member, index) of listMembers"
      v-bind:key="index"
      v-on:click="getMemberInformation(member.idUser)"
    >
      {{ member.firstName }} {{ member.lastName }}
    </div>
    <div class="carte_visite" v-if="carteVisible">
      <i
        class="fa-solid fa-xmark fermeture_modale"
        v-on:click="fermetureCarte()"
      ></i>
      {{ infoMembre.firstname }} {{ infoMembre.lastname }}
      {{ infoMembre.email }} {{ infoMembre.description
      }}{{ infoMembre.telephone }}
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "members-list",

  methods: {
    getListMembers() {
      let token = this.$store.state.token + document.cookie.split("=")[1];
      let requestPath = "http://localhost:3000/api/auth/userList";
      axios
        .get(requestPath, { headers: { authorization: `Bearer ${token}` } })
        .then((value) => (this.listMembers = value.data))
        .catch((error) => console.log(error));
    },
    getMemberInformation(id) {
      let requestPath = `http://localhost:3000/api/auth/profil/id=${id}`;
      let token = this.$store.state.token + document.cookie.split("=")[1];
      axios
        .get(requestPath, { headers: { authorization: `Bearer ${token}` } })
        .then((value) => {
          this.infoMembre = {
            firstname: value.data.firstName,
            lastname: value.data.lastName,
            email: value.data.email,
            telephone: value.data.telephone,
          };
          this.carteVisible = true;
        })
        .catch((error) => console.log(error));
    },
    fermetureCarte() {
      this.carteVisible = false;
    },
  },

  data() {
    return {
      listMembers: [],
      infoMembre: {},
      carteVisible: false,
    };
  },

  beforeMount() {
    this.getListMembers();
  },
};
</script>

<style lang="scss" src="./members_list.scss" scoped>
</style>
