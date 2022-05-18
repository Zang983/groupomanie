<template>
  <div class="bloc-blague" v-if="this.joke.answer!=''"><!-- On affiche l'encadré avec la blague que si fetch arrive à en récupérer une-->
    Voici la blague: {{ joke.body }}<br />
    <button v-on:click="toggleAnswer">Voir la réponse</button>
    <button v-on:click="getJoke">Encore !</button>
    <p class="joke_answer" v-if="this.joke.showAnswer">
      Et la réponse : {{ joke.answer }}
    </p>
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
      jokes.random().then((blague) => {
        this.joke.body = blague.joke;
        this.joke.answer = blague.answer;
      }).catch();
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
<style scoped>
</style>