<template>
  <div >
     <div >
      <van-nav-bar title="主页" :fixed="true" class="content_nav_bar" >
        <van-icon name="ellipsis" slot="right" />
      </van-nav-bar>
    </div>
   <div class = "contenet">
    <van-pull-refresh class="main" v-model="isLoading" @refresh="onRefresh" >
            <van-notice-bar left-icon="volume-o" mode="closeable" class="notice">
            足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
            </van-notice-bar>
            
            <div   >
              <van-list >
                <van-swipe-cell :right-width="span_width"  v-for="(item,index) in MessageList" :key="index"  >
                    <van-cell-group >
                        <base-panel @click="detail(item)" :title=item.sender :desc=item.title|ellipsis :status=item.status  :time="item.time"></base-panel>
                    </van-cell-group>
                <span slot="right" >
                  <div id="right_span">
                  <span class="top" @click="handleTop(index)">置顶</span>
                  <span class="delete" @click="handleDelete(index)">删除</span>
                  </div>
                </span>
                </van-swipe-cell>
                </van-list>
            </div>
            
    </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
import BasePanel from '../Common/BasePanel' 
export default {
  components:{
    BasePanel
  },
  data() {
      return {
          span_width:130,
          active: 0,
          count: 0,
          isLoading: false,
          MessageList:[
              {
              sender: "教务处科长" ,
              title: "香港回归祖国通知香港回归祖国通知香港回归祖国通知",
              recipient:"教务处老师",
              time:"2019/5/23 16:33",
              content:"",
              status:"未读"
              },
              {
              sender: "信息院院长" ,
              title: "澳门回归祖国通知澳门回归祖国通知澳门回归祖国通知",
              recipient:"信息院老师",
              time:"2019/5/23 16:33",
              content:"",
              status:"未读"
              } 
          ],
      }
  },
  //获取div宽度
  mounted(){
    var div = document.getElementById('right_span');
    var width = div.style.width || div.clientWidth || div.offsetWidth || div.scrollWidth;
    this.span_width=width;
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0,8) + '......'
      }
      return value
    }
  },
  methods:{
      detail(message){
        eventBus.$emit("message",message);
        this.$router.push("/message");
      },
      handleTop(index){
        this.MessageList.unshift(this.MessageList[index]);
        this.MessageList.splice(index+1,1);
      },
      handleDelete(index){
        alert("删除")
      },
        onRefresh() {
          setTimeout(() => {
              this.$notify({message: '刷新成功',duration:500,background: '#1989fa'});
              this.isLoading = false;
              this.count++;
          }, 500);
        },
        onClose(clickPosition, instance) {
          switch (clickPosition) {
              case 'left':
              case 'cell':
              case 'outside':
              instance.close();
              break;
              case 'right':
              Dialog.confirm({
                  message: '确定删除吗？'
              }).then(() => {
                  instance.close();
              });
              break;
          }  
      }
  }
}
</script>

<style >
/* .main{
  height: 640px;
  background: #f2f2f2;
} */
.notice{
  height: 25px;
  font-size: 10px;
}
.content_nav_bar{
  background: #F2F2F2;
  height: 50px;
}
.root{
  display: flex;
}
 .header{
  height: 50rem;
}
.content{
  flex: 1;
  display: none;
}

.van-swipe-cell__right {
  width: 130px;
 
}
.right{
  display: flex;
  width: 130rem;
}
.top{
  position:absolute;
  font-size: 16px;
  color: white;
  width: 65px;
  height: 64.98px;
  background: #E6A23C;
  text-align: center;
  line-height: 65px;
}
.delete{
  position:absolute;
  font-size: 16px;
  color: white;
  /* margin: 20px 15px; */
  margin-left: 65px;
  height: 64.98px;
  width: 65px;
  background: #f44;
  text-align: center;
  line-height: 65px;
}
.main .van-pull-refresh__track{
  margin-top:50px;
  margin-bottom:50px;
  position: absolute;
  width: 100%;
}
</style>
