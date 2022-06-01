<template>
  <div v-bind:class="{user_post_locked:statusLock}" >
    <div class="header_post">
      <div class="user_img--post">
        <img src="../assets/logo.png" alt="Avatar de l'utilisateur" />
        {{this.author}}
      </div>
      <h3 v-show="!modeEdit">
        {{ this.newTitle }}
      </h3>
      <input type="text" v-show="modeEdit" v-model="newTitle" />
      <div class="action_post">
        <i
          class="fa-solid fa-pen-to-square"
          v-on:click="toggleEditPost()"
        ></i>
        <i
          class="fa-solid fa-trash-can"
          v-on:click="deletePostFromList(index)"
        ></i>
        <i class="fa-solid fa-lock" v-on:click="lockPost(index, id)"> </i>
      </div>
    </div>
    <p class="message_post" v-bind:class="{message_postShort: !showAll,}" v-show="!modeEdit">
      {{ this.newBody }}<br />
    </p>
    <div v-show="modeEdit">
      <textarea class="textarea__edit" v-model="newBody"></textarea>
      <br>
      <div class="send_block"><button @click="editPost(id)" class="send_button">Éditer mon message</button>
      <button class="send_picture"><i class="fa-solid fa-image"></i></button></div>
    </div>
    <div class="footer_post">
      <p class="info_date_post">
         Écrit le : <strong>{{ postDateFr }}</strong><br>
        <span v-if="editDateFr">Dernière édition : <strong>{{editDateFr}}</strong></span>

      </p>
      <div class="triangle_contain">
        <div
          class="post_triangle"
          v-if="!showAllMessage"
          v-on:click="showAllMessage()"
        ></div>
        <div
          class="post_triangle"
          v-if="showAllMessage"
          v-bind:class="{post_triangle__rotated:!showAll}"
          v-on:click="showAllMessage()"
        ></div>
      </div>
      <div class="action_commentary">
        <i class="fa-solid fa-thumbs-up likeUp" @click="sendLike(1, id)"></i>
        <i class="fa-solid fa-thumbs-up likeDown" @click="sendLike(0, id)"></i>
        <button @click="toggleWriteComment(index)">+</button>
        <button @click="toggleStatutShow(index)">
          Affiche les commentaires
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UniquePost",
  props: [
    "index",
    "lockStatus",
    "body",
    "title",
    "author",
    "id",
    "postDate",
    "editDate",
    //"showAllMessage",
    "like",
    "userId",
    "urlImage",
    "editMode"
  ],

  data() {
    return {
      modeEdit:this.editMode,
      statusLock:this.lockStatus,
      newBody:this.body,
      newTitle:this.title,
      showAll:false,
      postDateFr:new Date(this.postDate).toLocaleDateString("fr") + ' à ' + new Date(this.postDate).toTimeString().slice(0,8),
      editDateFr:new Date(this.editDate).toLocaleDateString("fr") + ' à ' + new Date(this.postDate).toTimeString().slice(0,8),
    };
  },
  methods: {
    showAllMessage() {
      this.showAll = !this.showAll;
      this.$forceUpdate();
    },
    toggleWriteComment(index) {
      this.$refs.commentaire[index].toggleWriteComment();
    },
    toggleStatutShow(index) {
      this.$refs.commentaire[index].toggleStatutShow();
    },
     toggleEditPost() {
      this.modeEdit = !this.modeEdit;
    },
    editPost(id)
    {
      this.$emit('editPost',id,this.newTitle,this.newBody)
      this.toggleEditPost();
    },
    deletePostFromList(index)
    {
      this.$emit('deletePostFromList',index)
    },
    lockPost(index,id)
    {
      this.statusLock = !this.statusLock
      this.$emit('lockPost',index,id)
    },
  },

};


</script>

<style lang="scss" src="./post.scss">
</style>