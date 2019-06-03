<template>
  <div class="send-message">
    <div>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="编辑通知"
        :fixed="true"
        class="content_nav_bar"
        @click-left="onClickLeft"
      >
        <!-- <van-icon name="edit" slot="right" /> -->
        <van-button type="info" slot="right" size="small" @click="sendMessage()">发送</van-button>
      </van-nav-bar>
    </div>
    <div class="message_content_div">
      <van-cell-group>
        <van-field v-model="message_title" clearable label="标题" placeholder="请输入标题"/>
        <van-cell class="send-identify" title="发件身份">
          <van-dropdown-menu>
            <van-dropdown-item v-model="senderIdentity" :options="senderIdentityList"/>
          </van-dropdown-menu>
        </van-cell>
        <van-cell title="收件身份" is-link value="请选择收件人身份" @click="choseIdentify()"/>
        <div class="blank" style="height: 10px; background-color:#F2F2F2;"></div>
        <van-cell title="通知内容："></van-cell>
        <van-field v-model="message_content" type="textarea" placeholder="请输入通知内容" rows="15"/>
      </van-cell-group>
      <van-popup v-model="show" :overlay="true" class="choseId">
        <van-row>
          <van-col span="16">
            <p class="requirement">请选择收件人身份</p>
          </van-col>
          <van-col span="8">
            <van-button type="info" size="small" class="IdButton" @click="choseIdOk">确认</van-button>
          </van-col>
        </van-row>

        <el-tree
          class="IdTree"
          :data="IdTree"
          show-checkbox
          node-key="id"
          default-expand-all="true"
        ></el-tree>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IdTree: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      show: false,
      message_title: "",
      message_content: "",
      senderIdentity: 0,
      senderIdentityList: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      recipientIdentityIds: "",
      recipientIdentityList: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      list: ["a", "b", "c"],
      result: ["a", "b"]
    };
  },

  methods: {
    choseIdOk() {
      this.show = false;
    },
    choseIdentify() {
      this.show = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    sendMessage() {
      console.log(this.message_title);
      console.log(this.message_content);
      console.log(this.senderIdentity);
      console.log(this.recipientIdentity);
    }
  }
};
</script>

<style >
.choseId {
  width: 80%;
}
.choseId .requirement {
  font-size: 16px;
  color: #409eff;
  text-align: center;
}
.IdButton {
  margin-top: 10px;
  width: 70px;
}
.IdTree {
  margin-top: 10px;
  margin-left: 50px;
  margin-bottom: 10px;
  text-align: center;
}
.send-message {
  height: 100%;
  background-color: white;
}
.content_nav_bar {
  background: #f2f2f2;
  height: 50px;
}
.message_content_div {
  padding-top: 50px;
}
.send-identify {
  padding: 0;
}
.send-identify .van-cell__title {
  padding: 14px 90px 0 15px;
}
.send-identify .van-hairline--top-bottom::after {
  border-width: 0;
}
.message_content_div .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
</style>
