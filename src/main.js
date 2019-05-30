// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import Axios from 'axios';
import {Tree} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Tree);
Vue.use(Vant)



// Axios.defaults.baseURL = '119.29.101.166:8087'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
