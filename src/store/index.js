import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUser: "",
    access: "",
    userName: "",
    lastname: "",
    firstname: "",
    token: "",
    email:"",
    telephone:"",
    avatar:null,
    description:"",
  },
  getters: {
  },
  mutations: {
    saveIdUser(state, idUserFromDb) {
      state.idUser = idUserFromDb
    },
    levelPermission(state, permissionFromDb) {
      state.access = permissionFromDb
    },
    saveUserName(state, userName) {
      state.userName = userName
    },
    requeteDemandee(state, numero) {
      state.numeroRequete = numero;
    }, 
    saveFirstname(state, firstname) {
      state.firstname = firstname;
    },     
    saveTelephone(state, telephone) {
      state.telephone = telephone;
    }, 
    saveEmail(state, email) {
      state.email = email;
    }, 
    saveLastname(state, lastname) {
      state.lastname = lastname;
    },
    saveToken(state, token) {
      state.token = token;
    },    
    saveAvatar(state, avatar) {
      state.avatar = avatar;
    }, 
     saveDescription(state, description) {
      state.description = description;
    },
  },
  actions: {
  },
  modules: {
  }
})
