<template>
    <div>
    <van-nav-bar
      fixed="true"
      title="通知"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="Rheader"
    />

    <van-list class="delete_message">
        <van-swipe-cell        
            v-for="(item,index) in allData"
            :key="index"
        >
        <van-cell-group>
            <base-cell
                clickable
                :title="item.title"
                value=""
                :time="item.time"
                :label="item.content|ellipsis"
                @click="clickmessage(item)"
            ></base-cell>
        </van-cell-group>   
        </van-swipe-cell>
    </van-list>
    </div>
</template>

<script>
import BaseCell from "../Common/BaseCell";
import IndexedDB from "../../api/IndexedDB";
export default {
    components: {
      BaseCell
    },
    data(){
        return{
            allData:[],
        }
    },
    created(){
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
        IndexedDB.getDeletedData(TestDB, "Test",function(result){
            console.log(result)
            _this.allData = result;
        })   
      }
    );
    },
    methods:{
      onClickLeft(){
         this.$router.go(-1);
      }
    }
}
</script>

<style>
.delete_message{
    margin-top: 50px;
}
.Rheader {
  background: #f2f2f2;
  height: 50px;
}
</style>

