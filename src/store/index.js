import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    passWord: '',
    identities: '',
    phoneNumber: '',
  },
  mutations: {
    login(state, user) {
      state.userName = user.username;
    }
  }
})
