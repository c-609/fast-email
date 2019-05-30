<template>
  <div class="send-message">
    <div>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="编辑通知"
        :fixed="true"
        class="content_nav_bar"
        @click-left="onClickLeft"
      >
        <!-- <van-icon name="edit" slot="right" /> -->
        <van-button type="info" slot="right" size="small" @click="sendMessage()">发送</van-button>
      </van-nav-bar>
    </div>
    <div class="message_content_div">
      <van-cell-group>
        <van-field v-model="message_title" clearable label="标题" placeholder="请输入标题"/>
        <van-cell class="send-identify" title="发件身份">
          <van-dropdown-menu>
            <van-dropdown-item v-model="senderIdentity" :options="senderIdentityList"/>
          </van-dropdown-menu>
        </van-cell>
        <van-cell class="send-identify" title="收件身份" value="请选择收件人身份  ">
          <van-dropdown-menu>
            <van-dropdown-item>
              <van-checkbox-group v-model="recipientIdentityIds">
                <van-checkbox
                  v-for="(item, index) in recipientIdentityList"
                  :key="item"
                  :name="item"
                >复选框 {{ item }}</van-checkbox>
              </van-checkbox-group>
            </van-dropdown-item>
          </van-dropdown-menu>
        </van-cell>
        <div class="blank" style="height: 10px; background-color:#F2F2F2;"></div>
        <van-cell title="通知内容："></van-cell>
        <van-field v-model="message_content" type="textarea" placeholder="请输入通知内容" rows="15"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message_title: "",
      message_content: "",
      senderIdentity: 0,
      senderIdentityList: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      recipientIdentityIds: "",
      recipientIdentityList: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      list: ["a", "b", "c"],
      result: ["a", "b"]
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    sendMessage() {
      console.log(this.message_title);
      console.log(this.message_content);
      console.log(this.senderIdentity);
      console.log(this.recipientIdentity);
    }
  }
};
</script>

<style >
.send-message {
  height: 100%;
  background-color: white;
}
.content_nav_bar {
  background: #f2f2f2;
  height: 50px;
}
.message_content_div {
  padding-top: 50px;
}
.send-identify {
  padding: 0;
}
.send-identify .van-cell__title {
  padding: 14px 90px 0 15px;
}
.send-identify .van-hairline--top-bottom::after {
  border-width: 0;
}
.message_content_div .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
</style>
