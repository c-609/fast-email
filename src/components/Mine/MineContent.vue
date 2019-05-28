<template >
  <div class="main">
     <div >
      <van-nav-bar title="我的" :fixed="true" class="content_nav_bar"  @click-right="onClickRight" >
        <van-icon name="edit" slot="right" />
      </van-nav-bar>
    </div>
    <div class="mine_content">
    
      <van-cell title="姓名" icon="manager-o" clickable value="张全蛋" size="large"/>
      <div class="blank"></div>
      <van-cell title="身份" icon="description" is-link arrow-direction="down" size="large" value="多条" @click="shenfeng" />
      <div class="blank"></div>
      <van-cell title="电话1" icon="phone-circle-o" clickable value="0732-84802007" size="large"/>
      <van-cell title="电话2" icon="phone-circle-o" clickable value="0732-84802007" size="large"/>
      <div class="blank"></div>
     
       <van-cell title="退出登录" clickable icon="manager-o" size="large"/>
       <div class="blank2"></div>
          <van-popup v-model="show" position="left" class="shenfeng">
            身份信息
               <van-picker :columns="columns"  />
          </van-popup>
    </div>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
    data() {
        return {
            show:false,
             columns: ['信息院老师', '信息院院长', '信息院书记']
        }
    },
  
  
    methods:{
      shenfeng(){
        this.show=true
      },
      onClickRight(){
        this.$router.push("/editmine")
      }
    }
}
</script>

<style >

.content_nav_bar{
  background: #F2F2F2;
  height: 50px;
}
.mine_content{
  margin-top: 50px
}
.shenfeng{
  height: 100%;
  width: 40%
}
.blank{
  height: 10px;
  
 
}


</style>
