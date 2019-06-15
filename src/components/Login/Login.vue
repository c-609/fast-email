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
    <van-button type="danger" class="loginBtn" @click="submit" :loading=loading  loading-type="spinner" loading-text="登录中..."> 登录</van-button>
    </div>
  </div>
  
</template>

<script>
import {loginObj, getRolesById,getDeptsById ,getRoleByDept} from '@/api/login.js'
import { mapState } from "vuex";
import IndexedDB from "../../api/IndexedDB";
export default {
  
 data(){
     return{
         loading:false,
         acount:'student1',
         password:'456',
         user: "",
     }
 },
 beforeCreate(){
    let UserDataDB = null;
    let UserInfo = this.user;
    let _this = this;
    IndexedDB.openDB(
    "UserDataDB",
    1,
    UserDataDB,
    {
    name: "UserData",
    key: "username"
    },
    function(db) {
      let UserDataDB = db; 
      IndexedDB.getAllData(UserDataDB, "UserData",function(result){
        let uname = result[0].username;
        let password = result[0].password;
        if(uname!=null && password!=null){
          loginObj(uname,password).then(res=>{
            if(res.data.code == 0){
            _this.$router.push("/home") 
            }else{
              _this.$toast('登录失败')
            }
          })
        }
      });
    }
  ); 
 },
 methods:{
   
   submit(){
     this.loading=true
     if(this.acount==''&&this.password==''){
        this.$notify('请输入账号密码');
     }else if(this.acount == ''){
        this.$notify('请输入账号');
     }else if(this.password == ''){
        this.$notify('请输入密码');
     }else{
        loginObj(this.acount,this.password).then(res=>{  
          this.user = res.data.data;
          if(res.data.code == 0){
          this.user.password = this.password;
          var ids = this.user.roleList.join(",")
          getRolesById(ids).then(res=>{
            var i;
            var roles = res.data.data;
            for (i = 0; i < roles.length; i++) {
             roles[i].text = roles[i].name;
             roles[i].value = i;
            }
            this.user.roles = roles;

            var dids = this.user.deptList.join(",")

            getDeptsById(dids).then(res=>{
              var i;
              var _this = this;
              var depts = res.data.data;
              for (i = 0; i < depts.length; i++) {
                depts[i].text = depts[i].name;
                depts[i].value = i;
                // depts[i].children = [];
                var j = i;
                getRoleByDept(depts[i].id, this.user.id).then(res=>{
                //  console.log( depts[j].text)
                    depts[j].children = res.data.data; 
                    
                    var k=0;
                    for(k;k<res.data.data.length;k++){
                      depts[j].children[k].text = res.data.data[k].name;
                      // console.log(depts[j].children)
                    }           
                })
              }
              this.user.depts = depts;
              let UserDataDB = null;
              let UserInfo = this.user;
                IndexedDB.openDB(
                  "UserDataDB",
                  1,
                  UserDataDB,
                  {
                    name: "UserData",
                    key: "username"
                  },
                  function(db) {
                    let UserDataDB = db; 
                    IndexedDB.putUserInfo(UserDataDB, "UserData",UserInfo);
                  }
                );
              
            })   
          this.$router.push("/home")
        })
        }else{
            this.$notify('账号或密码错误');
            this.loading = false;
        }
     })
     }
     
 }

 }
}
</script>

<style>
.login-container{
  margin-left: 30px;
  margin-top: -25px;
}
.logo{
  width:35px;
  float: left;
  padding-top: 130px;
}
.text{
  font-size: 23px;
  padding-top: 130px;
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
