<template>
  <div>
    
      <router-view class="body-main"></router-view>
    

    <van-tabbar v-model="active" :change="change(active)" style="background:#F2F2F2" >
        <van-tabbar-item icon="home-o" to="/homecontent">主页</van-tabbar-item>
        <van-tabbar-item icon="comment-o" dot to="/messagecontent">接收</van-tabbar-item>
        <van-tabbar-item icon="friends-o" dot style="background:#ff4444;color:white;">盆友</van-tabbar-item>
        <van-tabbar-item icon="upgrade" info="5" to="/sendcontent">发出</van-tabbar-item>
        <van-tabbar-item icon="user-o" info="20" to="/minecontent">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    },
    created(){
      this.$router.push('/homecontent')
    },
    methods:{
      change(active){
        if(active == 1){
          
        }
      }
    }
}
</script>

<style >
.body-main{
 
  height: 100%;
  background: #f2f2f2;
}

</style>
