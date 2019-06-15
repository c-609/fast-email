<template>
  <div>
    <div>
      <van-nav-bar title="收件箱" :fixed="true" class="content_nav_bar">
        <van-icon name="ellipsis" slot="right"/>
      </van-nav-bar>
    </div>

    <div class="contenet">
      <van-pull-refresh class="main" v-model="isLoading" @refresh="onRefresh">
        <div>
          <van-search
            v-model="search"
            placeholder="请输入搜索关键词"
            shape="round"
            @search="onSearch"
            class="search"
          ></van-search>
          <!-- <div class="blank"></div>
          <van-cell
            title="筛选"
            is-link
            :value="select_time+select_content"
            class="shaixuan"
            @click="openprop()"
          />-->
          <div class="blank"></div>
         
        </div>
        <div class="accept-message">
          <van-list v-for="(item,index) in messageList" :key="index" @click="get(item.title)">
            <van-swipe-cell :right-width="span_width">
              <van-cell-group>
                <base-cell
                  clickable
                  :title="item.title"
                  :value="item.status"
                  :time="item.time"
                  :label="item.content|ellipsis"
                  @click="clickmessage(item)"
                ></base-cell>
                <!-- <van-panel :title=item.title :desc=item.desc :status=item.status > </van-panel> -->
              </van-cell-group>
         
              <span slot="right" >
                  <div id ="right_span">
                      <span @click="handleDelete(item.id,index,item.status)">删除</span>
                  </div>
                </span> 
              
   
              
              
            </van-swipe-cell>
          </van-list>
        </div>
        <!-- <div class="bottom-blank"></div> -->
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import BaseCell from "../Common/BaseCell";
import eventBus from "../../utils/eventBus";
import { getNoReadMsg, editMsgStatus } from "../../api/home.js";
import IndexedDB from "../../api/IndexedDB";
export default {
  components: {
    BaseCell
  },
  data() {
    return {
      AllDataId:"sadas",
      AllData: [],
      search: "",
      currentDate: new Date(),
      select_content: "请选择",
      select_time: "",
      show: false,
      columns: [
        "信息院王老师",
        "信息院刘老师",
        "信息院张老师",
        "信息院何老师",
        "信息院丁老师"
      ],
      activeNames: ["1"],
      span_width: 65,
      active: 0,
      count: 0,
      isLoading: false,
      messageList: [],
      MessageList: [], //未处理过的，从后台拿到的
      message: ""
    };
  },
  created() {
     this.getData();
  },
  computed: {
    tables() {
      const search = this.search;
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.AllData.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.AllData;
    }
  },
  watch: {
    tables() {
      this.messageList = this.tables;
    }
  },

  //获取div宽度
  mounted() {
    var div = document.getElementById("right_span");
    var width = div.style.width || div.clientWidth || div.offsetWidth || div.scrollWidth;
    this.span_width = width;
    console.log(width)
  },
  beforeDestroy() {
    eventBus.$emit("message", this.message);
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
    getData(){
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
          IndexedDB.getAllDataId(TestDB, "Test", function(result) {
            let AllDataId = result;
            var a = new Array();
            getNoReadMsg(0,AllDataId).then(res => {
              _this.MessageList = res.data.data;
            });
            var b = new Array();
            getNoReadMsg(1,AllDataId).then(res => {
              b = res.data.data;
              if(_this.isLoading == true){
                if(res.data.code == 0){
                    _this.$notify({
                    message: "刷新成功",
                    duration: 500,
                    background: "#1989fa"
                });
                   _this.isLoading = false;
                   _this.count++;
                }else{
                    _this.$notify({
                    message: "刷新失败，请重试",
                    duration: 500,
                    background: "#F56C6C"
                });
                   _this.isLoading = false;
                   _this.count++;
                }
              }
              _this.MessageList.push.apply(_this.MessageList, b);
              _this.$store.commit("ReceiveNum", _this.MessageList.length);
              //存入数据库
              let MessageList = _this.MessageList;
              let TestDB = null;
              let __this = _this;
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
                  IndexedDB.addData(TestDB, "Test", MessageList);
                  IndexedDB.getAllData(TestDB, "Test", function(result) {
                      var i;
                    for (i = 0; i < result.length; i++) {
                      if( result[i].status == 0){
                        result[i].status = "未读"
                      }else if(result[i].status == 1){
                        result[i].status = "已读"
                      }else{
                          result[i].status = "删除"
                      }  
                    }
                    _this.AllData = result;
                    __this.messageList = result
                  })
                }
              );
            });
          });
        }
      );
    },
    clickmessage(message) {
      this.message = message;
      this.$router.push("/message");
    },
    onSearch() {},
    timeChange(picker, value, index) {
      this.select_time = picker.getValues();
      console.log(picker.getValues());
    },
    onChange(picker, value, index) {
      this.select_content = value;
      console.log(picker.getValues());
    },
    openprop: function() {
      this.show = true;
    },
    // handleTop(index) {
    //   alert("置顶");
    // },
    handleDelete(mid, index,status) {
      if(status == '未读'){
          this.$toast('未读通知禁止删除')
      }else{
      editMsgStatus(mid, -1).then(res => {
        console.log(res);
      });
      let TestDB = null;
      var id = mid;
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
          console.log("----------------------")
          console.log(id);
          IndexedDB.updateStatus(TestDB, "Test",id, -1);
        }
      );
      }
    },
    onRefresh() {
      this.getData();
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
.blank {
  height: 8px;
  background-color: #f2f2f2;
}
.contenet {
  background: white;
}
.popup {
  height: 100%;
  width: 50%;
}
.popup .requirement {
  font-size: 16px;
  text-align: center;
  color: #409eff;
}
.popup .van-picker__toolbar {
  height: 0px;
}
.popup .van-picker__confirm {
  font-size: 0px;
}
.popup .van-picker__cancel {
  font-size: 0px;
}
.search {
  /* margin-top: 50px; */
  height: 40px;
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
/* .accept-message {
  margin-bottom: 50px;
} */
/* .bottom-blank {
  height: 50px;
  background: white;
} */

.right {
  display: flex;
  width: 65px;
}
.delete {
  position: absolute;
  font-size: 16px;
  color: white;
  width: 65px;
  height: 64.98px;
  
  text-align: center;
  line-height: 65px;
}

.main .van-pull-refresh__track {
  margin-top: 50px;
  /* margin-bottom: 50px; */
  position: absolute;
  width: 100%;
}

 .van-swipe-cell__right{
  width:65px;
  color: white;
  background: red;
  text-align: center;
  line-height: 65px
}
</style>
