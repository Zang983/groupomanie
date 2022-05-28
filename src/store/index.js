import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUser:"",
    access:""
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
    }

  },
  actions: {
  },
  modules: {
  }
})
