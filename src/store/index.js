import Vuex from 'vuex';
import Vue from 'vue';
import {
  stat
} from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    roles: [],
    depts: [],
    passWord: '',
    phoneNumber: '',
    id: '',
    receiveNum:'',
  },
  mutations: {
    login(state, user) {
      state.userName = user.username;
      state.roles = user.roles;
      state.depts = user.depts
      state.id = user.id;
    },
    ReceiveNum(state,num){
      state.receiveNum = num;
    }
  }
})
