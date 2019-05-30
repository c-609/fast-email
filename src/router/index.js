import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/Login/Login.vue'
import Home from './../components/Home/Home.vue'
import HomeContent from './../components/Home/HomeContent.vue'
import MessageContent from './../components/Message/MessageContent.vue'
import SendList from './../components/Send/SendList.vue'
import Message from './../components/Common/Message.vue'
import MineContent from './../components/Mine/MineContent.vue'
import EditMessage from './../components/Send/EditMessage.vue'
import EditMine from './../components/Mine/EditMine.vue'
import SendMsgContent from './../components/Send/SendMsgContent.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/editmine',
      name: 'EditMine',
      component: EditMine
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/editmessage',
      name: 'EditMessage',
      component: EditMessage
    },
    {
      path: '/sendmsgcontent',
      name: 'SendMsgContent',
      component: SendMsgContent
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
          path: '/homecontent',
          name: 'HomeContent',
          component: HomeContent
        },
        {
          path: '/messagecontent',
          name: 'MessageContent',
          component: MessageContent
        },
        {
          path: '/sendlist',
          name: 'SendList',
          component: SendList
        },
        {
          path: '/minecontent',
          name: 'MineContent',
          component: MineContent
        }
      ]
    },

  ]
})
