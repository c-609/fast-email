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
        <van-field v-model="message_title" clearable label="标题：" placeholder="请输入标题"/>
        <van-field
          v-model="senderIdentity"
          clearable
          label="发件身份："
          placeholder="请选择发件身份"
          @click="choseSenderIdentify()"
        />
        <!-- <van-cell class="send-identify" title="发件身份">
          <van-dropdown-menu>
            <van-dropdown-item v-model="senderIdentity" :options="senderIdentityList"/>
          </van-dropdown-menu>
        </van-cell>-->
        <van-field
          v-model="recipients"
          clearable
          label="收件身份："
          placeholder="请选择收件人身份"
          @click="choseIdentify()"
        />
        <div class="blank" style="height: 10px; background-color:#F2F2F2;"></div>
        <van-cell title="通知内容："></van-cell>
        <van-field v-model="message_content" type="textarea" placeholder="请输入通知内容" rows="15"/>
      </van-cell-group>

      <van-popup v-model="showSender" class="tree-select">
        <van-tree-select
          :items="deptItems"
          :main-active-index="deptIndex"
          :active-id="roleId"
          @navclick="onNavClick"
          @itemclick="onItemClick"
        />
        <van-button type="info" size="small" class="IdButton" @click="choseSenderOk">确认</van-button>
      </van-popup>

      <van-popup v-model="showRecipient" :overlay="true" class="choseId">
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
          :data="deptData"
          :props="deptProps"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          ref="tree"
        ></el-tree>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getDeptTree, sendMsg } from "../../api/send";
import BaseTreeSelect from "../Common/BaseTreeSelelct";
export default {
  components: {
    BaseTreeSelect
  },
  data() {
    return {
      deptData: [],
      deptProps: {
        label: "name",
        children: "children"
      },
      showSender: false,
      showRecipient: false,
      message_title: "",
      message_content: "",

      // senderIdentityList: this.$store.state.roles,
      roleId: 0,
      deptId: this.$store.state.depts[0].id,
      roleName: "",
      deptName: "",
      deptItems: this.$store.state.depts,
      deptIndex: 0,
      recipientDeptIds: [],
      recipients: "",
      senderIdentity: ""
      // identityHint: "请选择收件人身份"
    };
  },
  created() {
    getDeptTree().then(res => {
      this.deptData = res.data.data;
    });
  },
  methods: {
    choseSenderIdentify() {
      this.senderIdentity = "";
      // this.deptName = "";
      // this.roleName = "";
      this.showSender = true;
    },

    onNavClick(index) {
      console.log(this.deptItems);
      this.deptName = this.deptItems[index].name;
      this.deptId = this.deptItems[index].id;
    },
    onItemClick(data) {
      this.roleName = data.name;
      this.roleId = data.id;
      console.log(data);
    },
    choseSenderOk() {
      if (this.deptName == "" && this.roleName != "")
        this.deptName = this.deptItems[0].name;
      // if (this.roleName == "")
      //   this.roleName = this.deptItems[this.deptId].children[0].name;
      this.senderIdentity = this.deptName + " " + this.roleName;
      this.showSender = false;
    },
    choseIdOk() {
      this.recipientDeptIds = this.$refs.tree.getCheckedKeys();
      var data = this.$refs.tree.getCheckedNodes();
      var i = 0;
      for (i; i < data.length; i++) {
        if (i != 0) this.recipients += "、";
        this.recipients += data[i].name;
      }
      this.showRecipient = false;
    },
    choseIdentify() {
      this.recipients = "";
      this.showRecipient = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    sendMessage() {
      console.log(this.message_title);
      console.log(this.message_content);
      // console.log(this.senderIdentityList[this.senderIdentity].id);
      // console.log(this.recipientDeptIds);
      var title = this.message_title;
      var content = this.message_content;
      var senderId = this.$store.state.id;
      var roleId = this.roleId;
      var deptId = this.deptId;
      var recipientDeptIds = this.recipientDeptIds.join(",");
      if (this.message_title == "") this.$toast("请输入标题");
      else {
        if (this.senderIdentity == "") this.$toast("请选择发件身份");
        else {
          if (this.recipients == "") this.$toast("请选择收件身份");
          else {
            if (this.message_content == "") this.$toast("请输入通知内容");
            else {
              sendMsg(
                title,
                content,
                senderId,
                roleId,
                deptId,
                recipientDeptIds
              ).then(res => {
                if (res.code == "0") {
                  this.$toast("发送成功");
                }
              });
            }
          }
        }
      }
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
.tree-select .van-tree-select__nav {
  width: 220px;
  flex: 3;
}
.tree-select .van-tree-select__content {
  width: 100px;
}
</style>
