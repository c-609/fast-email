<template >
  <div class="personal">
    <div>
      <van-nav-bar title="我的" :fixed="true" class="content_nav_bar" @click-right="onClickRight">
        <van-icon name="edit" slot="right" size="large"/>
      </van-nav-bar>
    </div>
    <div class="mine_content">
      <van-cell-group>
        <van-cell title="姓名" icon="manager-o" :value="userName" size="large"/>
        <div class="blank"></div>

        <van-cell icon="idcard">
          <van-dropdown-menu class="identity">
            <van-dropdown-item class="identity-drop" title="身份" :options="roles"/>
          </van-dropdown-menu>
        </van-cell>
        <div class="blank"></div>
        <van-cell title="电话1" icon="phone-circle-o" is-link value="0732-84802007" size="large"/>
        <div class="blank"></div>
        <van-cell title="电话2" icon="phone-circle-o" is-link value="0732-84802007" size="large"/>
        <div class="blank"></div>
      </van-cell-group>
      <van-cell title="退出登录" icon="manager-o" size="large"/>
      <div class="blank2"></div>
      <van-popup v-model="show" position="left" class="shenfeng">
        身份信息
        <van-picker :columns="columns"/>
      </van-popup>
    </div>
  </div>
</template>

<script>
import eventBus from "../../utils/eventBus";
export default {
  data() {
    return {
      userName: this.$store.state.userName,
      roles: this.$store.state.roles,
      show: false,
      columns: ["信息院老师", "信息院院长", "信息院书记"]
    };
  },

  methods: {
    shenfeng() {
      this.show = true;
    },
    onClickRight() {
      this.$router.push("/editmine");
    }
  }
  // computed: {
  //   userName() {
  //     console.log(this.$store.state.userName);
  //     return this.$store.state.userName;
  //   }
  // }
};
</script>

<style >
.personal {
  height: 100%;
  background-color: white;
}
.content_nav_bar {
  background: #f2f2f2;
  height: 50px;
}
.mine_content {
  padding-top: 50px;
}
.identity {
  padding: 0;
  height: 25px;
}
.identity .van-cell__left-icon {
  padding: 14px 0 0 15px;
}
.identity .van-dropdown-menu {
  height: 25px;
}
.identity .van-dropdown-menu__title {
  left: -40px;
  padding-right: 200px;
  height: 25px;
}
/* .van-cell__value--alone {
  height: 25px;
} */
.identity .van-dropdown-menu__title::after {
  left: 290px;
}
.mine_content .van-hairline--top-bottom::after {
  border-width: 0 0;
}
.mine_content .van-cell:not(:last-child)::after {
  border-bottom-width: 0px;
}
.blank {
  height: 10px;
  background-color: #f2f2f2;
}
</style>
