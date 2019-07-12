<template>
  <div class="main11">
    <div>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="修改信息"
        :fixed="true"
        class="content_nav_bar"
        style="background:#F2F2F2"
        @click-left="comeBack()"
      >
        <!-- <van-icon name="edit" slot="right" /> -->
        <van-button type="info" slot="right" size="small" @click="edit()">确认修改</van-button>
      </van-nav-bar>
    </div>

    <div class="message_content_div">
      <van-field v-model="message_title" clearable label="姓名" placeholder="请输入姓名" />
      <!-- <van-cell title="身份" is-link value="查看您的发件身份"/> -->
      <div class="blank"></div>
      <van-field v-model="message_title" clearable label="电话" placeholder="请输入电话" />
      <div class="blank"></div>
      <van-field v-model="message_title" clearable label="QQ" placeholder="请输入QQ" />
      <div class="blank"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message_content: ""
    };
  },

  methods: {
    comeBack() {
      this.$store.commit("getActive", "3");
      // this.$router.go(-1);
      this.$router.push("/home");
    },
    edit() {}
  }
};
</script>

<style >
/* .content_nav_bar{
  background: #F2F2F2;
  height: 50px;
} */
.message_content_div {
  padding-top: 50px;
}
.blank {
  height: 10px;
}
</style>
