<template>
  <div>
    <router-view class="body-main"></router-view>

    <van-tabbar
      v-model="active"
      :change="change(active)"
      style="background:#F2F2F2"
      class="footer"
      v-show="hidshow"
    >
      <van-tabbar-item icon="home-o" to="/homecontent">主页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/messagecontent">接收</van-tabbar-item>
    
      <van-tabbar-item icon="upgrade" to="/sendlist">发出</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/minecontent">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import IndexedDB from "../../api/IndexedDB";
export default {
  data() {
    return {
      receiveNum: "",
      active: 0,
      docmHeight: "0", //默认屏幕高度

      showHeight: "0", //实时屏幕高度

      hidshow: true, //显示或者隐藏footer,

      isResize: false //默认屏幕高度是否已获取
    };
  },
  mounted() {
    // window.onresize监听页面高度的变化

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
    this.$router.push("/homecontent");
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
      if (active == 1) {
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
