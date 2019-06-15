<template>
  <div>
    <router-view class="body-main"></router-view>

    <van-tabbar v-model="active" :change="change(active)" style="background:#F2F2F2">
      <van-tabbar-item icon="home-o" to="/homecontent">主页</van-tabbar-item>
      <van-tabbar-item icon="comment-o"  to="/messagecontent">接收</van-tabbar-item>
      <van-tabbar-item icon="friends-o"  style="background:#ff4444;color:white;">盆友</van-tabbar-item>
      <van-tabbar-item icon="upgrade"  to="/sendlist">发出</van-tabbar-item>
      <van-tabbar-item icon="user-o"  to="/minecontent">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import IndexedDB from "../../api/IndexedDB";
export default {
  data() {
    return {
      receiveNum:'',
      active: 0
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
        IndexedDB.getAllData(TestDB, "Test",function(result) {
          _this.receiveNum = result.length
        }); 
      }
    );
    this.$router.push("/homecontent");
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
