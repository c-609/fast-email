<template>
  <div class="send-message" >
     <div >
      <van-nav-bar  left-arrow left-text="返回" title="编辑通知" :fixed="true" class="content_nav_bar" @click-right="onClickRight">
        <!-- <van-icon name="edit" slot="right" /> -->
        <van-button type="info" slot="right" size="small" @click="sendMessage()">发送</van-button>
      </van-nav-bar>
    </div>
    <div class="message_content_div">
        <van-cell-group>
             <van-field v-model="message_title"   clearable label="标题" placeholder="请输入标题" />
                <van-cell class="send-identify" title="发件身份" >
                  <van-dropdown-menu>
                   <van-dropdown-item v-model="identify" :options="identifyList" />
                  </van-dropdown-menu>
                </van-cell>
                <van-cell class="send-identify" title="收件身份" value="请选择收件人身份  " >
                  <van-dropdown-menu>
                   <van-dropdown-item v-model="identify" :options="identifyList" />
                  </van-dropdown-menu>
                </van-cell>
                <div class="blank" style="height: 10px; background-color:#F2F2F2;"></div>
                <van-cell title="通知内容："></van-cell>
                <van-field
                    v-model="message_content"   
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
          identify:0,
          identifyList: [
            { text: '全部商品', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 }
          ],
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
.send-message{
  height: 100%;
  background-color: white
}
.content_nav_bar{
  background: #F2F2F2;
  height: 50px;
}
.message_content_div{
    padding-top: 50px;
}
.send-identify{
  padding: 0;
}
.send-identify .van-cell__title{
  padding: 14px 90px 0 15px;
}
.send-identify .van-hairline--top-bottom::after {
    border-width: 0;
}
</style>
