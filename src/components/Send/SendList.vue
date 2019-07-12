<template>
  <div>
    <div>
      <van-nav-bar
        title="已发出"
        :fixed="true"
        class="content_nav_bar"
        style="background:#F2F2F2"
        @click-right="onClickRight"
      >
        <van-icon name="edit" slot="right" size="large" />
      </van-nav-bar>
    </div>
    <div class="contenet">
      <van-pull-refresh class="main" v-model="isLoading" @refresh="onRefresh">
        <div>
          <van-list v-for="(item,index) in MessageList" :key="index">
            <van-swipe-cell>
              <base-cell
                clickable
                :title="item.title"
                :value="item.readRatio"
                :time="item.time"
                :label="item.content|ellipsis"
                @click="clickMessage(item)"
              ></base-cell>
            </van-swipe-cell>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import eventBus from "../../utils/eventBus";
import BaseCell from "../Common/BaseCell";
import { getSendList } from "../../api/send";
export default {
  components: {
    BaseCell
  },

  data() {
    return {
      span_width: localStorage.getItem("width"),
      active: 0,
      count: 0,
      isLoading: false,
      message: "",
      MessageList: []
    };
  },
  created() {
    getSendList(0).then(res => {
      this.MessageList = res.data.data;
      var i = 0;
      for (i; i < this.MessageList.length; i++) {
        this.MessageList[i].readRatio =
          this.MessageList[i].readNumber + "/" + this.MessageList[i].number;
      }
    });
  },
  // 获取div宽度
  // mounted() {
  //   console.log(this.span_width);

  //   var div = document.getElementById("right_span");
  //   var width =
  //     div.style.width || div.clientWidth || div.offsetWidth || div.scrollWidth;
  //   alert("111");
  //   this.span_width = width;
  //   this.width = width;
  //   console.log(this.span_width);
  // },
  beforeDestroy() {
    eventBus.$emit("sendMsgContent", this.message);
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
    onClickRight() {
      this.$router.push("/editmessage");
    },
    clickMessage(message) {
      this.message = message;
      this.$router.push("/sendmsgcontent");
    },
    onRefresh() {
      getSendList(0).then(res => {
        console.log(res.data.code);
        if (res.data.code == 0) {
          this.MessageList = res.data.data;
          var i = 0;
          for (i; i < this.MessageList.length; i++) {
            this.MessageList[i].readRatio =
              this.MessageList[i].readNumber + "/" + this.MessageList[i].number;
          }
          this.$notify({
            message: "刷新成功",
            duration: 500,
            background: "#1989fa"
          });
          this.isLoading = false;
        } else {
          this.$notify({
            message: "刷新失败，请重试",
            duration: 500,
            background: "#F56C6C"
          });
          this.isLoading = false;
        }
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

.van-swipe-cell__right {
  width: 65px;
  background: #f44;
  text-align: center;
  line-height: 65px;
  color: white;
  font-size: 20px;
}
.right {
  display: flex;
  width: 65rem;
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
  /* margin-left: 65px; */
  height: 64.98px;
  width: 65px;
  background: #f44;
  text-align: center;
  line-height: 65px;
}
.main .van-pull-refresh__track {
  margin-top: 50px;
  /* margin-bottom: 50px; */
  position: absolute;
  width: 100%;
}
</style>
