<template>
  <div class="ce_posts_container">
    <h2>Annonce C.E.
      <i class="fa-solid fa-message" v-on:click="newAnnounce()"></i>
    </h2>
    <div class="post_CE" v-for="(annonce, index) of annonceList" :key="index">
      <p class="date_ce" v-show="!annonce.editMode">
        Du : {{ annonce.dateDebut }} Au : {{ annonce.dateFin }}
      </p>
      <p>
        Date de début : <input type="date" v-model="annonce.newDateDebut"/>
        Date de fin : <input type="date" v-model="annonce.newDateFin"/>
      </p>
      <button @click="editMessageCE(annonce.index)">Envoyer</button>
      <p class="message_post_ce" v-show="!annonce.editMode">{{ annonce.message }}</p>
      <textarea class="message_post_ce" v-show="annonce.editMode" v-model="annonce.message"></textarea>


      <p class="administration_ce">
        <i
          class="fa-solid fa-pen-to-square edit_button_ce"
          v-on:click="toggleEditMode(index)"
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
    toggleEditMode(index)
    {
      this.annonceList[index].editMode= !this.annonceList[index].editMode

      this.$forceUpdate()
    },
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
            promiseThis.annonceList[message].editMode=false;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // deleteMessageCE(id){
    //   let requestPath = "http://localhost:3000"
    // },
    editMessageCE(index){

      // let id=this.annonceList[index].idCE
      // let requestPath = `http://localhost:3000/api/ceMessage/${id}`;
      // let infoPost={
      // }
      console.log("OK : " + this.annonceList[index].newDateDebut)
      // let request = new Request(requestPath, {
      //   method: "PUT",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(infoPost),
      // });
      // fetch(request)
      //   .then(function (res){
      //     if (res.ok) {
      //       return res.json();
      //     }
      //   })
    }


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
