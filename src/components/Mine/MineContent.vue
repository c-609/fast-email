<template >
  <div class="personal">
     <div >
      <van-nav-bar title="我的" :fixed="true" class="content_nav_bar"  @click-right="onClickRight" >
        <van-icon name="edit" slot="right" />
      </van-nav-bar>
    </div>
    <div class="mine_content">
      <van-cell-group>
      <van-cell title="姓名" icon="manager-o" is-link value="张全蛋" size="large"/>
      <div class="blank"></div>
     
     <van-cell class="identify" icon="idcard">
      <van-dropdown-menu  >
        <van-dropdown-item title="身份" :options="option1" />
      </van-dropdown-menu>
      </van-cell>
      <div class="blank"></div>
      <van-cell title="电话1" icon="phone-circle-o"  is-link value="0732-84802007" size="large"/>
      <div class="blank"></div>
      <van-cell title="电话2" icon="phone-circle-o" is-link value="0732-84802007" size="large"/>
      <div class="blank"></div>
      </van-cell-group>
       <van-cell title="退出登录" icon="manager-o" size="large"/>
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
            value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
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
.identify{
  padding: 0;
}
.identify .van-cell__left-icon{
  padding: 14px 0 0 15px;
}
.identify .van-dropdown-menu__title{
  left: -45px;
  padding-right: 200px;
}
.identify .van-dropdown-menu__title::after{
  top:5px;
  left:290px
}
.blank{
  height: 10px;
  background-color:#F2F2F2;
 
}


</style>
