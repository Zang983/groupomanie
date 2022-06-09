<template>
  <div class="members_list">
    <h2>Liste des membres</h2>
    <div
      class="member"
      v-for="(member, index) of listMembers"
      v-bind:key="index"
      v-on:click="getMemberInformation(member.idUser)">
      {{ member.firstName }} {{ member.lastName }}
    </div>
    <div class="carte_visite" v-if="carteVisible">
    <i class="fa-solid fa-xmark fermeture_modale" v-on:click="fermetureCarte()"></i>
      {{infoMembre.firstname}} {{infoMembre.lastname}} {{infoMembre.email}} {{infoMembre.description}}{{infoMembre.telephone}}

    </div>
  </div>
</template>


<script>
export default {
  name: "members-list",

  methods: {
    getListMembers() {
      let requestPath = "http://localhost:3000/api/auth/userList";
      fetch(requestPath)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then((value) => (this.listMembers = value))
        .catch((error) => console.log(error));
    },
    getMemberInformation(id) {
      let requestPath = `http://localhost:3000/api/auth/profil/id=${id}`;
      fetch(requestPath)
      .then(res=>{
      if(res.ok)
      {return res.json()}})
      .then(value=>{
        console.log(value)
      this.infoMembre={firstname:value.firstName, lastname:value.lastName, email:value.email,telephone:value.telephone};
      this.carteVisible=true})
      .catch(error=>console.log(error))
    },
    fermetureCarte()
    {
      this.carteVisible=false
    },
  },

  data() {
    return {
      listMembers: [],
      infoMembre:{},
      carteVisible:false,
    };
  },

  beforeMount() {
    this.getListMembers();
  },
};
</script>

<style lang="scss" src="./members_list.scss" scoped>
</style>
