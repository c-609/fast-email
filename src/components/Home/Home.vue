<template>
  <div ref="page">
    <router-view class="body-main"></router-view>

    <van-tabbar
      v-model="active"
      v-show="show"
      :change="change(active)"
      style="background:#F2F2F2"
      class="footer"
    >
      <van-tabbar-item id="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item id="receive" icon="comment-o">接收</van-tabbar-item>

      <van-tabbar-item id="send" icon="upgrade">发出</van-tabbar-item>
      <van-tabbar-item id="mine" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import IndexedDB from "../../api/IndexedDB";
export default {
  data() {
    return {
      receiveNum: "",
      active: this.$store.state.active,

      clientHeight1: "",
      show: true
    };
  },
  mounted() {
    if (this.active == 0)
      document.getElementById("home").style = "color:#1989fa";
    else if (this.active == 1)
      document.getElementById("receive").style = "color:#1989fa";
    else if (this.active == 2)
      document.getElementById("send").style = "color:#1989fa";
    else if (this.active == 3)
      document.getElementById("mine").style = "color:#1989fa";

    // 获取浏览器可视区域高度

    let that = this;
    window.onresize = function temp() {
      this.clientHeight1 = `${document.documentElement.clientHeight}`;
      if (that.$refs.page) {
        alert(this.clientHeight1);
        if (clientHeight1 != localStorage.getItem("height")) {
          that.show = false;
        } else {
          that.show = true;
        }
      }
    };
  },

  created() {
    this.show = true;
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
        IndexedDB.getAllData(TestDB, "Test", function(result) {
          _this.receiveNum = result.length;
        });
      }
    );

    if (this.active == 0) {
      this.$router.push("/homecontent");
    } else if (this.active == 1) {
      this.$router.push("/messagecontent");
    } else if (this.active == 2) {
      this.$router.push("/sendlist");
    } else {
      this.$router.push("/minecontent");
    }
  },
  methods: {
    change(active) {
      if (active == 0) {
        this.$router.push("/homecontent");
      } else if (active == 1) {
        this.$router.push("/messagecontent");
      } else if (this.active == 2) {
        this.$router.push("/sendlist");
      } else {
        this.$router.push("/minecontent");
      }
    }
  }
};
</script>

<style >
.body-main {
  height: 50px;
  background: #f2f2f2;
}
</style>
