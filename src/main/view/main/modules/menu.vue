<!-- 左侧menu菜单 -->
<template>
  <el-menu default-active="5-0" class="m-menu" :collapse="isCollapse" :collapse-transition="false" @open="handleOpen" @close="handleClose" @select="handleMenuSelect" background-color="#393D49" text-color="#fff" active-text-color="#ffd04b">
    <!-- 无子级菜单 -->
    <el-menu-item class="m-menu-item" :index="index" v-for="(item,index) in menuList[menuListCode]" :key="index" v-show="!(item.children && item.children.length > 0)">
      <i class="el-icon-menu"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
    <!-- 有子级菜单 -->
    <el-submenu class="m-menu-item" :index="index" v-for="(item,index) in menuList[menuListCode]" :key="index" v-show="(item.children && item.children.length > 0)">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="index+'-'+i">
        <i class="el-icon-menu"></i>
        <span>{{subItem.title}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>

import { mapState, mapActions } from "vuex"
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {
      menuListCode: "contentManagement1",
      menuList: [],
    };
  },
  created () {
    this.getMenuList();
  },
  mounted () {
  },
  //方法集合
  methods: {
    ...mapActions(["addTab", "removeTab", "removeAllTab", "removeOutTab", "switchTab"]),

    async getMenuList () {
      this.menuList = await this.$api.getMenuList();
    },
    handleMenuSelect (key, keyPath) {
      let tabObj = this.menuList[this.menuListCode][key];
      this.addTab(tabObj);
    },


  },
}
</script>
<style lang='less' scoped>
/* 左侧导航 */
.el-aside {
  background-color: #393d49;
  position: absolute;
  top: 0px;
  bottom: 0;
  z-index: 999;
  overflow-x: hidden;
  //   display: none;
  .m-menu {
    height: 100%;
    border-right: none;
  }
  .el-menu:not(.el-menu--collapse) {
    width: 210px;
  }
  .m-menu-item {
    // border-bottom: 1px solid #f2f2f2;
  }
}
</style>