import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUser:"",
    access:"",
    userName:"",
  },
  getters: {
  },
  mutations: {
    saveIdUser(state,idUserFromDb)
    {
      state.idUser=idUserFromDb
    },
    levelPermission(state,permissionFromDb)
    {
      state.access=permissionFromDb
    },
    saveUserName(state,userName)
    {
      state.userName=userName

    },
  },
  actions: {
  },
  modules: {
  }
})
