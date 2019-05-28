<template>
  <div class="main11" >
     <div >
      <van-nav-bar  left-arrow left-text="返回" title="修改信息" :fixed="true" class="content_nav_bar" @click-right="onClickRight">
        <!-- <van-icon name="edit" slot="right" /> -->
        <van-button type="info" slot="right" size="small" @click="sendMessage()">确认修改</van-button>
      </van-nav-bar>
    </div>
    
    <div class="message_content_div">
        
             <van-field v-model="message_title"   clearable label="姓名" placeholder="请输入姓名" />
            <van-cell title="身份" is-link value="查看您的发件身份" />
            <div class="blank"></div>
             <van-field v-model="message_title"   clearable label="电话" placeholder="请输入电话" />
             <div class="blank"></div>
              <van-field v-model="message_title"   clearable label="QQ" placeholder="请输入QQ" /> 
      
    </div>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            message_content:'',
        }
    },
  
    methods:{
      sendMessage(){
          alert(this.message_content)
      }
        
    }
}
</script>

<style >
.content_nav_bar{
  background: #F2F2F2;
  height: 50px;
}
.blank{
  height: 10px;

}

</style>
