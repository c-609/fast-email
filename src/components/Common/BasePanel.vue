<template>
  <div class="base-panel" @click="click">
    <van-panel :title="title" :desc="desc" :status="status">
      <span class="panel-time">{{time}}</span>
    </van-panel>
  </div>
</template>

<script>
export default {
  name:"BasePanel",
  props:{
    title:{
      type:String
    },
    desc:{
      type:String
    },
    status:{
      type:String
    },
    time:{
      type:String
    },
  },
  methods:{
    click(){
      this.$emit('click');
    }
  }
}
</script>

<style>
.base-panel .van-cell__value{
  margin-top: 25px;
}
.base-panel .van-panel{
  -webkit-tap-highlight-color: red
}
.panel-time{
  margin-top: -58px;
  margin-right: 10px;
  position: relative;
  z-index: 999;
  float: right;
}
</style>