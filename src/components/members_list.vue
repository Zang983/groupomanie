<template>
  <div class="members_list">
    <h2>Liste des membres</h2>
    <div class="member" v-for="member of listMembers" v-bind:key="member">
      {{ member.firstName }} {{member.lastName}}
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
      }
      ).then(value=>this.listMembers=value)
      .catch(error=>console.log(error));

    },
  },

  data() {
    return {
      listMembers: [],
    };
  },

  beforeMount() {
    this.getListMembers();
  },
};
</script>

<style lang="scss" src="./members_list.scss" scoped>
</style>
