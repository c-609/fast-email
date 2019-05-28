<template>
  <div >
     <div >
      <van-nav-bar title="收件箱" :fixed="true" class="content_nav_bar" >
        <van-icon name="ellipsis" slot="right" />
      </van-nav-bar>
    </div>

   <div class = "contenet">
            <div >
              <van-search 
                v-model="value"
                placeholder="请输入搜索关键词"
               
                shape="round"
                @search="onSearch"
                class="search"
              >
                
              </van-search> 
              <div class="blank"></div>
              <van-cell title="筛选" is-link :value="select_time+select_content"   class="shaixuan" @click="openprop()"/>
              <div class="blank"> </div>
               <van-popup v-model="show" position="left" class="popup">
                  根据时间筛选
                 <van-datetime-picker
                  
                cancel-button-text="s"
                v-model="currentDate"
                type="year-month"
                
                @change="timeChange"
              />
              <br/><br/><br/>
              根据身份筛选
              <van-picker :columns="columns" @change="onChange" :default-index="2"/>
            </van-popup>

            </div>
            <div class="accept-message">
              <van-list v-for="(item,index) in MessageList" :key="index" @click="get(item.title)">
                <van-swipe-cell :right-width="span_width"  >
                    <van-cell-group>
                      <base-cell clickable :title=item.title :value=item.status  :time=item.time :label=item.desc></base-cell>
                        <!-- <van-panel :title=item.title :desc=item.desc :status=item.status > </van-panel> -->
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
            currentDate: new Date(),
            select_content:'请选择',
            select_time:'',
            show:false,
            value:'',
            columns: ['信息院王老师', '信息院刘老师', '信息院张老师', '信息院何老师', '信息院丁老师'],
            activeNames: ['1'],
            span_width:130,
            active: 0,
            count: 0,
            isLoading: false,
            MessageList:[
                {
                title: "信息院王老师" ,
                desc: "香港回归祖国......", 
                status:"未读",
                time:"18:15"
                },
                {
                title:"信息院刘老师" ,
                desc:" 澳门回归祖国......", 
                status:"未读",
                time:"18:15"
                },{
                title: "信息院王老师" ,
                desc: "香港回归祖国......", 
                status:"未读",
                time:"18:15"
                },
                {
                title:"信息院刘老师" ,
                desc:" 澳门回归祖国......", 
                status:"未读",
                time:"18:15"
                },
                {
                title: "信息院王老师" ,
                desc: "香港回归祖国......", 
                status:"未读",
                time:"18:15"
                },
                {
                title:"信息院刘老师" ,
                desc:" 澳门回归祖国......", 
                status:"未读",
                time:"18:15"
                },{
                title: "信息院王老师" ,
                desc: "香港回归祖国......", 
                status:"未读",
                time:"18:15"
                },
                {
                title:"信息院刘老师" ,
                desc:" 澳门回归祖国......", 
                status:"未读",
                time:"18:15"
                },{
                title: "信息院王老师" ,
                desc: "香港回归祖国......", 
                status:"未读",
                time:"18:15"
                },
                {
                title:"信息院刘老师" ,
                desc:" 澳门回归祖国......", 
                status:"未读",
                time:"18:15"
                },{
                title: "信息院王老师" ,
                desc: "香港回归祖国......", 
                status:"未读",
                time:"18:15"
                },
                {
                title:"信息院刘老师" ,
                desc:" 澳门回归祖国......", 
                status:"未读",
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
      onSearch(){
        
      },
      timeChange(picker, value, index){
        this.select_time=picker.getValues();
        console.log(picker.getValues())
      },
      onChange(picker, value, index) {
      this.select_content=value;
    },
      openprop:function(){
       this.show=true;
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
.blank{
  height: 10px;
  background-color:#F2F2F2;
 
}

.popup{
  height: 100%;
  width: 50%
}
.search{
  margin-top: 50px;
  height: 40px;
}
.shaixuan{
  height: 40px;
  
}
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
.accept-message{
  margin-bottom: 50px;

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
.message .van-pull-refresh__track{
 
  margin-bottom:50px;
  position: absolute;
  width: 100%;
}
</style>
