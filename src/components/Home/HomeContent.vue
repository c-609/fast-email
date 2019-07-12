<template>
  <div>
    <div>
      <van-nav-bar title="主页" :fixed="true" class="content_nav_bar" style="background:#f2f2f2"></van-nav-bar>
    </div>
    <div class="contenet">
      <van-pull-refresh class="main" v-model="isLoading" @refresh="onRefresh">
        <div>
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
              <div slot="title">
                通知送达中
                <span class="number">{{sendNumber}}</span>
              </div>
              <van-list>
                <van-swipe-cell v-for="(item,index) in SendingMsg" :key="index">
                  <base-cell
                    clickable
                    :title="item.title"
                    :value="item.ratio"
                    :time="item.time"
                    :label="item.content|ellipsis"
                    @click="clickSend(item)"
                  ></base-cell>
                </van-swipe-cell>
              </van-list>
            </van-collapse-item>
            <van-collapse-item name="2">
              <div slot="title">
                新到通知
                <span class="number">{{receiptNumber}}</span>
              </div>
              <van-list>
                <van-swipe-cell v-for="(item,index) in messageList" :key="index">
                  <base-cell
                    clickable
                    :title="item.title"
                    value="未读"
                    :time="item.time"
                    :label="item.content|ellipsis"
                    @click="clickmessage(item)"
                  ></base-cell>
                  <!-- <base-panel @click="detail(item)" :title=item.sender :desc=item.title|ellipsis :status=item.status  :time="item.time"></base-panel> -->

                  <!-- <span slot="right">
                    <div id="right_span">
                      <span class="top" @click="handleTop(index)">置顶</span>
                      <span class="delete" @click="handleDelete(index)">删除</span>
                    </div>
                  </span>-->
                </van-swipe-cell>
              </van-list>
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import eventBus from "../../utils/eventBus";
import BasePanel from "../Common/BasePanel";
import BaseCell from "../Common/BaseCell";
import { getNoReadMsg } from "../../api/home.js";
import { getSendList } from "../../api/send";
export default {
  components: {
    BasePanel,
    BaseCell
  },
  created() {
    getNoReadMsg(0).then(res => {
      this.messageList = res.data.data;
      this.receiptNumber = this.messageList.length;
    });
    getSendList(0).then(res => {
      var SMsg = res.data.data;
      var i = 0;
      console.log(res.data.data);
      for (i = 0; i < SMsg.length; i++) {
        if (SMsg[i].readNumber < SMsg[i].number) {
          SMsg[i].ratio = SMsg[i].readNumber + "/" + SMsg[i].number;
          this.SendingMsg.unshift(SMsg[i]);
        }
      }
      console.log(this.SendingMsg);
      this.sendNumber = this.SendingMsg.length;
    });
  },
  data() {
    return {
      SendingMsg: [],
      receiptNumber: 0,
      sendNumber: "",
      span_width: 130,
      active: 0,
      activeNames: ["1", "2"],
      count: 0,
      isLoading: false,
      sendingmessage: "",
      message: "",
      messageList: []
    };
  },
  //获取div宽度
  // mounted() {
  //   var div = document.getElementById("right_span");
  //   var width =
  //     div.style.width || div.clientWidth || div.offsetWidth || div.scrollWidth;
  //   this.span_width = width;
  // },
  beforeDestroy() {
    eventBus.$emit("message", this.message, "0");
    eventBus.$emit("sendMsgContent", this.sendingmessage, "0");
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 8) {
        return value.slice(0, 8) + "......";
      }
      return value;
    }
  },
  methods: {
    clickSend(message) {
      this.sendingmessage = message;
      this.$router.push("/sendmsgcontent");
    },
    clickmessage(message) {
      this.message = message;
      this.$router.push("/message");
    },
    // handleTop(index) {
    //   this.messageList.unshift(this.messageList[index]);
    //   this.messageList.splice(index + 1, 1);
    // },
    // handleDelete(index) {
    //   alert("删除");
    // },
    onRefresh() {
      getNoReadMsg(0).then(res => {
        if (res.data.code == 0) {
          this.$notify({
            message: "刷新成功",
            duration: 500,
            background: "#1989fa"
          });
          this.isLoading = false;
          this.count++;
        } else {
          this.$notify({
            message: "刷新失败，请重试",
            duration: 500,
            background: "#F56C6C"
          });
          this.isLoading = false;
          this.count++;
        }
        this.messageList = res.data.data;
      });
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            instance.close();
          });
          break;
      }
    }
  }
};
</script>

<style >
/* .main{
  height: 640px;
  background: #f2f2f2;
} */
.number {
  color: #f44;
  margin-left: 20px;
}
.notice {
  height: 25px;
  font-size: 10px;
}
.content_nav_bar {
  background: #f2f2f2;
  height: 50px;
}
.root {
  display: flex;
}
.header {
  height: 50rem;
}
.content {
  flex: 1;
  display: none;
}
.van-cell:not(:last-child)::after {
  /* border-bottom-color: red; */
  border: none;
  /* border-bottom-width: 0px; */
}
.van-hairline--top-bottom::after {
  border: none;
}
.van-swipe-cell__right {
  width: 130px;
}
.right {
  display: flex;
  width: 130rem;
}
.top {
  position: absolute;
  font-size: 16px;
  color: white;
  width: 65px;
  height: 64.98px;
  background: #e6a23c;
  text-align: center;
  line-height: 65px;
}
.delete {
  position: absolute;
  font-size: 16px;
  color: white;
  /* margin: 20px 15px; */
  margin-left: 65px;
  height: 64.98px;
  width: 65px;
  background: #f44;
  text-align: center;
  line-height: 65px;
}
.main .van-pull-refresh__track {
  margin-top: 50px;
  margin-bottom: 50px;
  position: absolute;
  width: 100%;
}
</style>

