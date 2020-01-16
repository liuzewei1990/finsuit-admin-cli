
<template>

  <el-container>
    <!-- 上面头部 -->
    <el-header height="50px">
      <div class="tab-home-btn" @click="isCollapse=!isCollapse">
        <i class="el-icon-date"></i>
      </div>
    </el-header>

    <!-- 下面主体 -->
    <el-container class="main">

      <!-- 左侧导航 -->
      <el-aside :width="isCollapse?'auto':'auto'">
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
      </el-aside>

      <!-- 右侧内容 -->
      <el-main :class="isCollapse?'el-main-64':'el-main-210'" ref="elMain">
        <BodyTab ref="BodyTab"></BodyTab>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import BodyTab from "./modules/bodyTab.vue"
export default {
  components: { BodyTab },
  data () {

    return {
      // 左侧导是否收起
      isCollapse: false,
      menuListCode: "contentManagement1",
      menuList: [],
    }
  },
  created () {
    this.getMenuList();
  },
  mounted () {
  },
  //方法集合
  methods: {
    async getMenuList () {
      this.menuList = await this.$api.getMenuList();
    },
    handleMenuSelect (key, keyPath) {
      let tabObj = this.menuList[this.menuListCode][key];
      this.$refs["BodyTab"].addTab(tabObj);
    },


  },
}
</script>
<style lang='less' scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  padding: 0px;
}

/* 下面主体 */
.main {
  position: absolute;
  left: 0px;
  right: 0;
  top: 50px;
  bottom: 0;
  width: 100%;
  //   border: 1px solid red;
}

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

/* 右侧内容 */
.el-main-210 {
  //   left: 210px;
  width: calc(100% - 210px) !important;
}
.el-main-64 {
  //   left: 64px;
  width: calc(100% - 64px) !important;
}
.el-main {
  //   border: 1px solid blue;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  padding: 0px;
  //   transition: all 0.3s ease-in-out;
}
</style>