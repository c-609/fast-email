<template>
    <div class="base-cell">
        <van-cell :title="title" :value="value" :label="label" :clickable="clickable" :size="size" @click="click"/>
        <span class="cell-time">{{time}}</span>
    </div>
</template>
<script>
export default {
    name:"BaseCell",
    props:{
        title:{
            type:String
        },
        value:{
            type:String
        },
        label:{
            type:String
        },
        clickable:{
            type:Boolean
        },
        size:{
            type:String
        },
        time:{
            type:String
        }
    },
    methods: {
        click(){
            this.$emit('click');
        }
    },
}
</script>

<style>
.cell-time{
  margin-top: -28px;
  margin-right: 15px;
  position: relative;
  z-index: 999;
  float: right;
}
</style>
