<template>
  <div class="tree-select">
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainActiveIndex: 0,
      activeId: 1,
      items: [
        {
          text: "城市",
          children: [
            {
              text: "杭州",
              id: 1
            },
            {
              text: "温州",
              id: 2
            }
          ]
        },
        {
          text: "所有城市9999999999",
          children: [
            {
              text: "hhh州",
              id: 1
            },
            {
              text: "hhhft温州",
              id: 2
            }
          ]
        }
      ]
    };
  },

  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
};
</script>
<style>
.tree-select .van-tree-select__nav {
  width: 220px;
  flex: 3;
}
.tree-select .van-tree-select__content {
  width: 100px;
}
</style>
