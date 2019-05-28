<template>
  <div >
     <div >
      <van-nav-bar title="已发出" :fixed="true" class="content_nav_bar" @click-right="onClickRight">
        <van-icon name="edit" slot="right" />
      </van-nav-bar>
    </div>
   <div class = "contenet">
    <van-pull-refresh class="main" v-model="isLoading" @refresh="onRefresh" >
            
            <div   >
              <van-list v-for="(item,index) in MessageList" :key="index" @click="get(item.title)">
                <van-swipe-cell :right-width="span_width"  >
                    <van-cell-group>
                      <base-cell clickable :title=item.title :value=item.status :time=item.time  :label=item.desc></base-cell>
                        <!-- <van-cell clickable  is-link :title=item.title :value=item.status size="large" :label=item.desc  />   -->
                        <!-- <van-panel :title=item.title :desc=item.desc :status=item.status clickable > </van-panel> -->
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
import BaseCell from '../Common/BaseCell'
export default {
    components:{
      BaseCell
    },
    data() {
        return {
            span_width:130,
            active: 0,
            count: 0,
            isLoading: false,
            MessageList:[
                {
                title: "信息院全体同学" ,
                desc: "香港回归祖国......", 
                status:"12/20",
                time:"18:15"
                },
                {
                title:"信息院计科班" ,
                desc:" 澳门回归祖国......", 
                status:"13/20",
                time:"18:15"
                },{
                title: "信息院电子班" ,
                desc: "香港回归祖国......", 
                status:"14/40",
                time:"18:15"
                },
                {
                title:"信息院网工班" ,
                desc:" 澳门回归祖国......", 
                status:"14/50",
                time:"18:15"
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
    methods:{
       onClickRight() {
        this.$router.push("/editmessage")
       },
        handleTop(index){
          alert("置顶")
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
