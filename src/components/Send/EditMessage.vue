<template>
  <div >
     <div >
      <van-nav-bar  left-arrow left-text="返回" title="编辑通知" :fixed="true" class="content_nav_bar" @click-right="onClickRight">
        <!-- <van-icon name="edit" slot="right" /> -->
        <van-button type="info" slot="right" size="small" @click="sendMessage()">发送</van-button>
      </van-nav-bar>
    </div>
    <div class="message_content_div">
        <van-cell-group>
             <van-field v-model="message_title"   clearable label="标题" placeholder="请输入标题" />
                <van-cell title="发件身份" is-link value="请选择您的发件身份" />
                <van-cell title="收件身份" is-link value="请选择收件人身份  " />
                <van-field
                    v-model="message_content"
                    label="通知内容"
                    type="textarea"
                    placeholder="请输入通知内容"
                    rows="15"
               
                />
        </van-cell-group>
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
.message_content_div{
    margin-top: 50px
}

</style>
