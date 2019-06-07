<template>
  <div>
    <van-nav-bar
      :fixed="true"
      title="通知"
      left-text="返回"
      right-text="删除"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="message_top"
    />

    <van-collapse v-model="activeName1" accordion class="detailed">
      <van-collapse-item :title="title" name="1">
        发布时间 : {{time}}
        <br>
        发布人 : {{sender}}
        <br>
        收件人 : {{recipient}}
      </van-collapse-item>
    </van-collapse>

    <van-collapse v-model="activeName2" accordion>
      <van-collapse-item :title="noRead" name="1">{{noReadList}}</van-collapse-item>
    </van-collapse>

    <p class="message_content">{{content}}</p>
  </div>
</template>

<script>
import eventBus from "../../utils/eventBus";
import { getNoReadListById } from "../../api/send";
export default {
  data() {
    return {
      activeName1: "1",
      sender: "",
      title: "",
      recipient: "",
      time: "",
      content: "",
      readRatio: "",
      id: "",
      activeName2: "2",
      noRead: "未读人员：",
      noReadList: " "
    };
  },

  created() {
    eventBus.$on("sendMsgContent", res => {
      this.title = res.title;
      this.sender = res.senderName;
      this.recipient = res.dept.name;
      this.time = res.time;
      this.content = res.content;
      this.readRatio = res.readRatio;
      this.noRead += res.readRatio;
      var _this = this;
      getNoReadListById(res.id).then(respond => {
        var i;
        for (i = 0; i < respond.data.data.length; i++) {
          _this.noReadList += respond.data.data[i].username + "  ";
        }
      });
    });
  },
  beforeDestroy() {
    eventBus.$off("sendMsgContent");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      eventBus.$off("/sendMsgContnet");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style>
.detailed {
  margin-top: 50px;
}
.message_content {
  padding: 30px;
  font-size: 14px;
}
.message_top {
  height: 50px;
}
.van-cell {
  font-size: 16px;
}
</style>
