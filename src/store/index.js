import Vuex from 'vuex';
import Vue from 'vue';
import {
  stat
} from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    active: 0,
    userName: '',
    roles: [],
    depts: [],
    passWord: '',
    phoneNumber: '',
    id: '',
    receiveNum: '',
    message: [],
    user: '',
    width: 65,
  },
  mutations: {
    ReceiveNum(state, num) {
      state.receiveNum = num;
    },
    GetMessage(state, message) {
      state.message = message;
    },
    getWidth(state, width) {
      state.width = width
    },
    getActive(state, active) {
      state.active = active;
    }
  }
})
