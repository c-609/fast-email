<template>
  <div>
    <router-view class="body-main"></router-view>

    <van-tabbar v-model="active" :change="change(active)" style="background:#F2F2F2" class="footer">
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
      docmHeight: "0", //默认屏幕高度

      showHeight: "0", //实时屏幕高度

      hidshow: true, //显示或者隐藏footer,

      isResize: false //默认屏幕高度是否已获取
    };
  },
  mounted() {
    // window.onresize监听页面高度的变化
    if (this.active == 0)
      document.getElementById("home").style = "color:#1989fa";
    else if (this.active == 1)
      document.getElementById("receive").style = "color:#1989fa";
    else if (this.active == 2)
      document.getElementById("send").style = "color:#1989fa";
    else if (this.active == 3)
      document.getElementById("mine").style = "color:#1989fa";
    window.onresize = () => {
      return (() => {
        if (!this.isResize) {
          //默认屏幕高度

          this.docmHeight = document.documentElement.clientHeight;

          this.isResize = true;
        } //实时屏幕高度

        this.showHeight = document.body.clientHeight;
      })();
    };
  },

  created() {
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
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
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
  height: 100%;
  background: #f2f2f2;
}
</style>
