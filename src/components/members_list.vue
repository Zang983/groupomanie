<template>
  <div class="members_list"> 
    <h2>Liste des membres</h2>
        <div class="list" v-for="member of listMembers" v-bind:key="member">
        {{member}}
            
        </div>
  </div>
</template>


<script>
export default {
  name: "members-list",

  methods: {
      getListMembers()
      {
          this.listMembers.push("Ben","Georges","Charlie","Isa","Elo")

      }
  },

  data() 
  {
      return {
          listMembers:[],
      }
  },

  beforeMount() {
    this.getListMembers();
  },

};

</script>

<style lang="scss" src="./members_list.scss" scoped>
</style>
