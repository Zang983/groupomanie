<!-- Sur les fonctions d'édition des messages : 
- IL reste le cas d'un élément entièrement vide le comportement n'est pas celui voulu.
- Il faut coder l'élément commentaire qui sera créer lorsqu'on appuie sur le bouton commentaire.
- L'appuie sur le "+" près du mot commentaire devrait faire apparaître quelques commentaires avec tout en haut le champ pour notre propre commentaire.
- Il faut coder les deux autres composants. Il s'agit dans les deux cas d'appels à la BDD, codé juste le template avec des fonctions injectant des données temporaires
permettra d'avoir un visuel proche du rendu final.
- Il restera à codé la partie "profil, paramètre, déconnexion"
- Une fois ceci fait on rajoute les boutons d'administration (le bouton éditer ne sera pas disponible, le bouton supprimer ou "lock" le sera).
- Les éléments lockés auront une bordure rouge dans la partie "mes messages"
- On fini par l'api avec la BDD et tout sera ok il me semble, il faudra refaire un point à ce moment la et chasser les bugs.
- Révision complète du CSS pour avoir quelque chose de plus jolis notamment au niveau du choix de couleur etc... -->

<template>
  <div class="posts_bloc">
    <h2>Les posts sont ici :</h2>
    <button style="margin-bottom: 3%" v-on:click="newPost()">
      Ecrire un nouveau post.
    </button>
    <article class="user_post" v-if="this.newMessage.showIt == 1">
      <div class="header_post">
        <div class="user_img--post"></div>
        <h4><input v-model="newMessage.title" /></h4>
        <div class="action_post"></div>
      </div>
      <p class="message_post">
        <textarea v-model="newMessage.body"> </textarea>
      </p>
      <button v-on:click="post()">Envoyer</button>
    </article>

    <article class="user_post" v-for="message in posts" :key="message.posts">
      <div class="header_post">
        <div class="user_img--post" :key="message.author">
          <img src="../assets/logo.png">
          {{ message.author }}
        </div>
        <h3 v-bind:contenteditable="message.editMode" @keydown.enter="editPost(message.id)" @keydown.esc="toggleEditPost(message.id)">
          {{ message.title }}
        </h3>
        <div class="action_post">
          <i class="fa-solid fa-pen-to-square" v-on:click="toggleEditPost(message.id)"></i>
          <i class="fa-solid fa-trash-can" v-on:click="deletePostFromList(message.id)"></i>
        </div>
      </div>
      <p class="message_post" @keydown.enter="editPost(message.id)" @keydown.esc="toggleEditPost(message.id)"  v-bind:class='{message_postShort : !message.showAllMessage}'   v-bind:contenteditable="message.editMode">
        {{ message.body }}
      </p>
      <div class="footer_post">
        <p class="info_date_post">
          {{ message.postDate }}
          <span v-show="message.EditDate != ''">
            (Edité le : {{ message.EditDate }})</span>
        </p>
        <div class="triangle_contain">
          <div class="post_triangle" v-if="!message.showAllMessage" v-on:click="showAllMessage(message.id)"></div>
          <div class="post_triangle post_triangle--rotated" v-if="message.showAllMessage" v-on:click="showAllMessage(message.id)"></div>
        </div>
        <div class="action_commentary">
          <button>+</button>
          <button>Affiche les commentaires</button>
        </div>
      </div>
    </article>
  </div>
</template>


<script>
export default {
  name: "postList",
  methods: {
    newPost() {
      this.newMessage.showIt = !this.newMessage.showIt;
    },
    getListPost() {
      //fonction récupérant la liste des posts. Pour l'instant on créer un tableau de faux posts avec du lorem ipsum.
      this.posts[0] = {
        body: "Bonjour, premier post",
        author: "Zangetsu",
        title: "Premier article",
        postDate: "15 avril 2021",
        EditDate: "12 mai 2021",
        editMode: false,
        id: 0,
        readerRate: "",
      };
      this.posts[1] = {
        body: "Bonjour, second post",
        author: "Z@bimaru",
        title: "Le cours économique de la patate au Zimbabwé",
        postDate: "15 juillet 2021",
        showAllMessage: false,
        editMode: false,
        EditDate: " 12 mai 2022",
        id: 1,
        readerRate: "",
      };
      this.posts[2] = {
        body: "Bonjour, troisième post  Accusantium, quaerat aspernatur, recusandae ipsam doloremque iste modi maiores mollitia id beatae, cumque ipsum labore corporis at blanditiis sed corrupti officia qui Provident corrupti nobis necessitatibus officia sint. Magnam officiis consequuntur incidunt doloremque cumque excepturi, porro quae eveniet commodi, deleniti accusantium debitis eum id nemo quis velit consequatur sunt facere necessitatibus voluptatum?Ad repellat quo dolores, cum odio illo molestias laboriosam temporibus possimus earum non minus, blanditiis explicabo consectetur numquam natus cumque delectus. Tenetur quos iusto quasi quidem minima saepe illum minus?Necessitatibus aliquid illum amet deleniti repellat magni natus similique iusto fugit, quisquam vitae, eaque doloribus minus modi deserunt odit. Officiis iusto temporibus harum reiciendis rem voluptatibus vel beatae pariatur tempore?Rem dolore praesentium iusto quibusdam officia sed. Quis voluptate cumque molestias, odit numquam, excepturi facilis libero facere sint sequi mollitia aut aspernatur nam sapiente dolorum? Quia quam quo",
        author: "Z@bimaru",
        title: "Le cours économique de la patate au Vénézuéla",
        postDate: "15 aout 2021",
        showAllMessage: false,
        EditDate: " 17 mai 2022",
        editMode: false,
        id: 2,
        readerRate: "",
      };
      this.posts[3] = {
        body: ",Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, quaerat aspernatur, recusandae ipsam doloremque iste modi maiores mollitia id beatae, cumque ipsum labore corporis at blanditiis sed corrupti officia qui Provident corrupti nobis necessitatibus officia sint. Magnam officiis consequuntur incidunt doloremque cumque excepturi, porro quae eveniet commodi, deleniti accusantium debitis eum id nemo quis velit consequatur sunt facere necessitatibus voluptatum?Ad repellat quo dolores, cum odio illo molestias laboriosam temporibus possimus earum non minus, blanditiis explicabo consectetur numquam natus cumque delectus. Tenetur quos iusto quasi quidem minima saepe illum minus?Necessitatibus aliquid illum amet deleniti repellat magni natus similique iusto fugit, quisquam vitae, eaque doloribus minus modi deserunt odit. Officiis iusto temporibus harum reiciendis rem voluptatibus vel beatae pariatur tempore?Rem dolore praesentium iusto quibusdam officia sed. Quis voluptate cumque molestias, odit numquam, excepturi facilis libero facere sint sequi mollitia aut aspernatur nam sapiente dolorum? Quia quam quos ab? Corporis!",
        author: "Z@bimaru",
        showAllMessage: false,
        title: "Le cours économique de la carotte au Zimbabwé",
        postDate: "15 decembre 2021",
        EditDate: " 18 mai 2022",
        editMode: false,
        id: 3,
        readerRate: "",
      };
    },
    deletePostFromList(id) {
     this.posts = this.posts.filter(post =>post.id!=id)
    },
    showAllMessage(id) {
      this.posts[id].showAllMessage = !this.posts[id].showAllMessage
      this.$forceUpdate();
    },
    /*Cette fonction permet au texte d'être éditable et détecte si on appuie sur échap ce qui permet d'annuler toute modification.*/
    toggleEditPost(id) {
      let elementVise
      if(event.code == "Escape")
      {
        if(event.target.localName=='h3')
        {
          elementVise= this.posts[id].title
        }
        else
        {
          elementVise=this.posts[id].body
        }
        event.srcElement.firstChild.textContent = elementVise
      }
      this.posts[id].editMode = !this.posts[id].editMode;
      this.$forceUpdate();//on force le rafraîchissement du DOM, vueJs ne détecte pas le changement d'état.
    },
    editPost(id)/*Actuellement seul le DOM est modifié*/
      {
      this.toggleEditPost(id)
      if(event.target.localName=='h3' && event.target.srcElement.innerText!="")
      {
        this.posts[id].title=event.target.srcElement.innerText
      }
      if(event.target.localName=="p")
      {
        this.posts[id].body=event.target.srcElement.innerText
      }

    },
    post() {
      this.author = "Zangetsu";
      this.posts.push({
        body: this.newMessage.body,
        author: this.author,
        title: this.newMessage.title,
        postDate: this.newMessage.postDate,
        id: this.posts.length,
      });
      this.newMessage.body = "";
      this.newMessage.title = "";
      this.newMessage.showIt = 0;
    },
  },

  data() {
    return {
      posts: [
        {
          body: "",
          author: "",
          title: "",
          postDate: "",
          EditDate: "",
          id: 0,
          editMode: false,
          showAllMessage: true,
          readerRate: "",
        },
      ],
      newMessage: {
        body: "",
        title: "",
        postDate: "",
        showIt: false,
      },
    };
  },
  beforeMount() {
    this.getListPost();
  },
};
</script>

<style lang="scss" src="./posts.scss" scoped>
</style>