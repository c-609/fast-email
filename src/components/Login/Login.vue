<template>

  <div class="login-container">
    <div >
      <img src="./../../assets/logo.png" class="logo"  />
       <P class="text"> 消息快递 </p>
    </div>
    <div class="loginForm">
    <div class="login-group">
        <van-field left-icon="contact" v-model="acount" placeholder="请输入用户名" class="nameText"/>
        <van-field left-icon="contact" type="password" v-model="password" placeholder="请输入密码" class="passText"/>
        <van-field disabled style="height:0px"></van-field>
    </div>
    <van-button type="danger" class="loginBtn" @click="submit">登录</van-button>
    </div>
  </div>
  
</template>

<script>
import {loginObj} from '@/api/login.js'
export default {
  
 data(){
     return{
         acount:'admin1',
         password:'123',
     }
 },
 methods:{
   
   submit(){
     if(this.acount==''&&this.password==''){
        this.$notify('请输入账号密码');
     }else if(this.acount == ''){
        this.$notify('请输入账号');
     }else if(this.password == ''){
        this.$notify('请输入密码');
     }else{
        loginObj(this.acount,this.password).then(res=>{
          console.log(res);
         
          this.$router.push("/home")
        })
     }
   }
 }

}
</script>

<style>
.login-container{
  margin-left: 30px;
  margin-top: 100px;
}
.logo{
  width:35px;
  float: left;
}
.text{
  font-size: 23px;
  
  
}
.loginForm  .van-hairline--top-bottom::after{
  border-width: 0px 0px 2px 0px;
  
}

.van-cell:not(:last-child)::after {
  width: 270px;
  border-bottom-width:2px;
}
.van-cell:last-child::after {
  width: 270px;
  border-bottom-width:2px;
}

.loginBtn{
  width: 270px;
  margin-left: 13px;
}
</style>
