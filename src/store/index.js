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
    receiveNum: '',
    message: [],
    user: '',
  },
  mutations: {
    ReceiveNum(state, num) {
      state.receiveNum = num;
    },
    GetMessage(state, message) {
      state.message = message;
    }
  }
})
