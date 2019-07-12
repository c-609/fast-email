<template>
  <div>
    <van-nav-bar
      fixed="true"
      title="回收站"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="Rheader"
      style="background:#f2f2f2"
    />

    <van-list class="delete_message">
      <van-list v-for="(item,index) in allData" :key="index">
        <van-swipe-cell :right-width="span_width">
          <van-cell-group>
            <base-cell
              clickable
              :title="item.title"
              value="已读"
              :time="item.time"
              :label="item.content|ellipsis"
              @click="clickmessage(item)"
            ></base-cell>
            <!-- <van-panel :title=item.title :desc=item.desc :status=item.status > </van-panel> -->
          </van-cell-group>

          <span slot="right">
            <div id="right_span">
              <span @click="handleDelete(item.id,index)">删除</span>
            </div>
          </span>
        </van-swipe-cell>
      </van-list>
    </van-list>
  </div>
</template>

<script>
import BaseCell from "../Common/BaseCell";
import IndexedDB from "../../api/IndexedDB";
import eventBus from "../../utils/eventBus";
export default {
  components: {
    BaseCell
  },
  data() {
    return {
      allData: [],
      span_width: localStorage.getItem("width"),
      message: ""
    };
  },
  beforeDestroy() {
    eventBus.$emit("message", this.message);
  },
  created() {
    console.log(this.span_width);
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
        IndexedDB.getDeletedData(TestDB, "Test", function(result) {
          console.log(result);
          _this.allData = result;
        });
      }
    );
  },
  methods: {
    handleDelete(id, index) {
      console.log(index);
      let TestDB = null;
      let _this = this;
      var deleteId = id;
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
          IndexedDB.deleteData(TestDB, "Test", deleteId);
        }
      );
      this.allData.splice(index, 1);
    },
    onClickLeft() {
      this.$store.commit("getActive", "3");
      // this.$router.go(-1);
      this.$router.push("/home");
    },
    clickmessage(message) {
      this.message = message;
      this.$router.push("/recyclingmsg");
    }
  }
};
</script>

<style>
.delete_message {
  margin-top: 50px;
}
.Rheader {
  background: #f2f2f2;
  height: 50px;
}
</style>

