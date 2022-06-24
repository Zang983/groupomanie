<template>
  <div class="conteneur_principal" >
  <div class="liste_membre" v-if="profilUnique===false">
    <h2>Liste des membres</h2>
    <div
      class="membre"
      v-for="(member, index) of listMembers"
      v-bind:key="index"
      v-on:click="getMemberInformation(member.idUser)"
    >
      {{ member.firstName }} {{ member.lastName }}
    </div>
    </div>
    <!--Partie carte de visite-->
    <div class="profil" v-if="profilUnique">
      <button  v-on:click="toggleCarte()" class="fermeture_profil"><i
        class="fa-solid fa-xmark"
       
      ></i></button>
      
              <img
          v-bind:src="this.infoMembre.avatar"
          class="avatar_profil"
          alt="Image utilisateur"
          v-if="this.infoMembre.avatar != '' && this.infoMembre.avatar != null"
        />
        <img
          src="../assets/images/defaultProfil.jpg"
          class="avatar_profil"
          alt="Avatar par défaut"
          v-if="this.infoMembre.avatar === '' || this.infoMembre.avatar === null"
        />
      <h3 class="nom_profil">{{ infoMembre.firstname }} {{ infoMembre.lastname }}</h3>
      <p class="email_profil"><i class="fa-solid fa-at"></i>{{ infoMembre.email }}</p>
       <p class="telephone_profil"><i class="fa-solid fa-phone"></i>{{ infoMembre.telephone }}</p>
      <p class="description_profil">{{ infoMembre.description}}</p>
     
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
      if(this.profilUnique!=true)
      {
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
            description:value.data.userDescription,
            avatar:value.data.url_avatar
          };
          this.toggleCarte();
        })
        .catch((error) => console.log(error));
      }
      else
      {
        this.toggleCarte();
      }
    },
      toggleCarte() {
      this.profilUnique = !this.profilUnique;
    },
  },

  data() {
    return {
      profilUnique:false,
      listMembers: [],
      infoMembre: {},
    };
  },

  beforeMount() {
    this.getListMembers();
  },
};
</script>

<style lang="scss" src="./members_list.scss" scoped>
</style>
