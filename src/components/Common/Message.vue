<template>
  <div>
    <van-nav-bar
      fixed="true"
      title="通知"
      left-text="返回"
      right-text="删除"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="message_top"
    />
    <div class="detail">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item :title="title" name="1">
          发布时间 : {{time}}
          <br>
          发布人 : {{senderName}}
        </van-collapse-item>
      </van-collapse>
      <div class="blank"></div>
      <van-cell title="通知内容："></van-cell>
      <van-field v-model="content" type="textarea" disabled rows="15"/>
      <!-- <p class>{{content}}</p> -->
    </div>
  </div>
</template>

<script>
import eventBus from "../../utils/eventBus";
import { editMsgStatus } from "../../api/home";
import IndexedDB from "../../api/IndexedDB";
export default {
  data() {
    return {
      activeName: "1",
      senderName: "",
      title: "",
      time: "",
      content: "",
      status: "",
      mid: ""
    };
  },

  created() {
   
    eventBus.$on("message", res => {
      console.log(res);
      this.title = res.title;
      this.senderName = res.senderName;
      this.time = res.time;
      this.content = res.content;
      this.status = res.status;
      this.mid = res.id;

      editMsgStatus(this.mid, 1);
      let TestDB = null;
      let _this = this;
      IndexedDB.openDB(
      "TestDB",
      1, 
      TestDB,
      {
        name: "Test",
        key: "id"
      },
      function(db) {
        let TestDB = db;
        IndexedDB.updateStatus(TestDB, "Test",_this.mid, 1)   
      }
    );
    });
  },
  beforeDestroy() {
    eventBus.$off("message");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      // eventBus.$off("/message");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style>
.detail {
  padding-top: 50px;
}

.message_content {
  padding: 30px;
}
.message_top {
  background: #f2f2f2;
  height: 50px;
  /* margin-bottom: 50px; */
}
/* .van-cell {
  font-size: 18px;
} */
</style>
