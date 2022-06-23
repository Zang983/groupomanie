<template>
  <div class="bloc_blague" v-if="this.joke.body != ''">
    <!-- On affiche l'encadré avec la blague que si fetch arrive à en récupérer une-->
    <div v-on:click="toggleAnswer" class="contenu_blague">
    <button aria-label="Nouvelle blague" v-on:click.stop="getJoke"><i class="fa-solid fa-arrows-rotate actualisation_blague" ></i></button>
      <p class="corps_blague" v-if="!this.joke.showAnswer" ><span class="intitule_corps_blague">Blague :</span> {{ joke.body }}</p>  
      <p class="reponse_blague" v-if="this.joke.showAnswer">
        <span class="intitule_corps_blague">Chute :</span> {{ joke.answer }}
      </p> 


    </div>
  </div>
</template>
<script>
import BlaguesAPI from "blagues-api";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODYzNjQzNTE5Njc1NTMxMjk1IiwibGltaXQiOjEwMCwia2V5IjoiUWJjRHFTdzloMDd2NXphRTNGODdNejJ5QnVOZWVpa3duVmEyQ2RYMU9rRWpuYmlBa1QiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNS0wOVQwMTo1MDowMSswMDowMCIsImlhdCI6MTY1MjA2MTAwMX0.ipY3svDAxQzx4BB0qPgm5IjmpzRYGutRyIXm7VokeVw";

const jokes = new BlaguesAPI(token);
export default {
  name: "blagueHeader",

  methods: {
    getJoke() {
      
      jokes
        .random()
        .then((blague) => {
          this.joke.body = blague.joke;
          this.joke.answer = blague.answer;
        })
        .catch();
    },
    toggleAnswer() {
      this.joke.showAnswer = !this.joke.showAnswer;
    },
  },
  data() {
    return {
      joke: {
        body: "",
        answer: "",
        showAnswer: false,
      },
    };
  },
  beforeMount() {
    this.getJoke();
  },
};
</script>
<style scoped lang="scss" src="./blague.scss">
</style>