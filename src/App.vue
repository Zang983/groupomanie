<template>
  <div id="app">
    <modale @showModaleOff="showModaleOff" v-if="!show"></modale>
    <div id="hideBeforeConnexion" v-if="show == true">
      <banniere></banniere>

      <div class="hbody">
        <membersList></membersList>
        <posts @updateListPost="updateListPost" :key="listPostVersion"></posts>
        <cePosts></cePosts>
      </div>
    </div>
  </div>
</template>

<script>
import modale from "./components/modale.vue";
import banniere from "./components/banniere.vue";
import posts from "./components/listePosts.vue";
import cePosts from "./components/annonce_ce.vue";
import membersList from "./components/members_list.vue";

export default {
  name: "App",
  components: {
    modale,
    banniere,
    posts,
    cePosts,
    membersList,
  },
  methods: {
    updateListPost() {
      this.listPostVersion = +1;
    },
    showModaleOff() {
      this.show = true;
    },
  },
  data() {
    return {
      listPostVersion: 1,
      show: false,
    };
  },
};
</script>

<style lang="scss">
.hbody {
  display: flex;
  margin-top: 5%;
  justify-content: space-around;
}

body {
  margin: 0px;
  min-width: 100%;
  font-size: 1.35em;
  background-color: rgba(40, 42, 52, 0.151);
}

.send_button {
  height: 35px;
  background-color: blue;
  width: 80%;
  color: white;
  &__full_size {
    width: 100%;
  }
}

</style>