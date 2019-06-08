import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    roles: [],
    depts: [],
    passWord: '',
    phoneNumber: '',

  },
  mutations: {
    login(state, user) {
      state.userName = user.username;
      state.roles = user.roles;
      state.depts = user.depts
    }

  }
})
