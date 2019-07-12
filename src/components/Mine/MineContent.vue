<template >
  <div class="personal">
    <div>
      <van-nav-bar
        title="我的"
        :fixed="true"
        class="content_nav_bar"
        style="background:#F2F2F2"
        @click-right="onClickRight"
      >
        <van-icon name="edit" slot="right" size="large" />
      </van-nav-bar>
    </div>
    <div class="mine_content">
      <van-cell-group>
        <van-cell title="姓名" icon="manager-o" :value="userName" size="large" />
        <div class="blank"></div>
        <van-icon name="idcard" class="idcard" size="large"></van-icon>
        <van-dropdown-menu class="identity">
          <van-dropdown-item class="identity-drop" title="身份" :options="roles" />
        </van-dropdown-menu>

        <div class="blank"></div>
        <van-cell title="电话1" icon="phone-circle-o" is-link value="0732-84802007" size="large" />
        <div class="blank"></div>
        <van-cell title="电话2" icon="phone-circle-o" is-link value="0732-84802007" size="large" />
        <div class="blank"></div>
        <van-cell title="回收站" icon="delete" is-link value="查看已删除通知" size="large" to="/recycling" />
        <div class="blank"></div>
      </van-cell-group>
      <van-cell
        class="outlogin"
        title="退出登录"
        clickable
        icon="close"
        size="large"
        @click="logout()"
      />
      <div class="blank"></div>
      <van-popup v-model="show" position="left" class="shenfeng">
        身份信息
        <van-picker :columns="columns" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import eventBus from "../../utils/eventBus";
import IndexedDB from "../../api/IndexedDB";
import { logoutObj } from "../../api/login";
export default {
  data() {
    return {
      userName: "",
      roles: "",
      show: false,
      columns: ["信息院老师", "信息院院长", "信息院书记"]
    };
  },
  created() {
    let UserDataDB = null;
    let _this = this;
    IndexedDB.openDB(
      "UserDataDB",
      1,
      UserDataDB,
      {
        name: "UserData",
        key: "username"
      },
      function(db) {
        let UserDataDB = db;
        IndexedDB.getAllUserData(UserDataDB, "UserData", function(result) {
          console.log(result);
          _this.userName = result[0].username;
          _this.roles = result[0].roles;
        });
      }
    );
  },
  methods: {
    shenfeng() {
      this.show = true;
    },
    onClickRight() {
      this.$router.push("/editmine");
    },
    logout() {
      logoutObj().then(res => {
        if (res.data.code == 0) {
          this.$toast("退出成功");
          let UserDataDB = null;
          IndexedDB.openDB(
            "UserDataDB",
            1,
            UserDataDB,
            {
              name: "UserData",
              key: "id"
            },
            function(db) {
              let UserDataDB = db;
              IndexedDB.clearData(UserDataDB, "UserData");
            }
          );
          this.$router.push("/");
        } else {
          this.$toast("未知错误");
        }
      });
    }
  }
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
  height: 45px;
}
.identity-drop {
  float: left;
  top: 18px;
}

.idcard {
  float: left;
  padding-top: 18px;
  padding-left: 15px;
}
/* .van-cell__value--alone {
  height: 25px;
} */
.identity .van-dropdown-menu__title {
  left: -140px;
}
.identity .van-dropdown-menu__title::after {
  left: 280px;
}
.mine_content .van-hairline--top-bottom::after {
  border-width: 0 0;
}
.mine_content .van-cell:not(:last-child)::after {
  border-bottom-width: 0px;
}
.blank {
  height: 8px;
  background-color: #f2f2f2;
}
/* .outlogin {
  border: solid 10px #f2f2f2;
} */
</style>
