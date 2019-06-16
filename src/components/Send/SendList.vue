<template>
  <div>
    <div>
      <van-nav-bar title="已发出" :fixed="true" class="content_nav_bar" @click-right="onClickRight">
        <van-icon name="edit" slot="right" size="large"/>
      </van-nav-bar>
    </div>
    <div class="contenet">
      <van-pull-refresh class="main" v-model="isLoading" @refresh="onRefresh">
        <div>
          <van-list v-for="(item,index) in MessageList" :key="index" @click="get(item.title)">
            <van-swipe-cell :right-width="span_width">
              <van-cell-group>
                <base-cell
                  clickable
                  :title="item.title"
                  :value="item.readRatio"
                  :time="item.time"
                  :label="item.content|ellipsis"
                  @click="clickMessage(item)"
                ></base-cell>
              </van-cell-group>
              <span slot="right">
                <div id="right_span">
                  <span @click="handleDelete(index,item.readRatio)">删除</span>
                </div>
              </span>
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
      span_width: this.$store.state.width,
      active: 0,
      count: 0,
      isLoading: false,
      message: "",
      MessageList: []
    };
  },
  created() {
    console.log(this.span_width);
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
    gotouchstart() {
      let that = this;
      clearTimeout(timeOutEvent); //清除定时器
      timeOutEvent = 0;
      timeOutEvent = setTimeout(function() {
        //执行长按要执行的内容，
        alert("rrr");
      }, 600); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(timeOutEvent);
      if (timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
        alert("jjj");
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(timeOutEvent); //清除定时器
      timeOutEvent = 0;
    },

    onClickRight() {
      this.$router.push("/editmessage");
    },
    clickMessage(message) {
      this.message = message;
      this.$router.push("/sendmsgcontent");
    },
    // handleTop(index) {
    //   alert("置顶");
    // },
    handleDelete(index, readRatio) {
      this.span_width = this.width;
      console.log(this.span_width);
      var a = readRatio.split("/");
      if (a[0] != a[1]) {
        this.$toast("消息正在送达中，禁止删除");
      } else {
        getSendList(-1).then(res => {
          if (res.data.code == 0) {
            this.MessageList.splice(index, 1);
          } else {
            this.$toast("删除失败！");
          }
        });
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.$notify({
          message: "刷新成功",
          duration: 500,
          background: "#1989fa"
        });
        this.isLoading = false;
        this.count++;
      }, 500);
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
