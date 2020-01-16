
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

        <!-- 首页tab按钮 -->
        <div class="tab-home-btn" @click="isCollapse=!isCollapse">
          <i class="el-icon-date"></i>
        </div>

        <!-- tab iframe页面 -->
        <el-tabs v-model="activeIndex2" type="card" @tab-remove="removeTab">
          <!-- 注意：key 一定要有，且不能为index索引值，否则当删除tab时，会更新剩余dom,造成刷新iframe的后果 -->
          <el-tab-pane :name="item.title" v-for="item in menuTabs" :key="item.title" :closable="item.title !== '首页'">
            <span slot="label"><i class="el-icon-menu"></i> {{item.title}}</span>
            <div class="el-iframe-container">
              <iframe class="iframe" :ref="item.title" :src="item.href" frameborder="0"></iframe>
            </div>
          </el-tab-pane>
        </el-tabs>

        <!-- 页面操作按钮 -->
        <div class="tab-action-btn">
          <el-dropdown @command="tabActionClick">
            <span class="el-dropdown-link">
              <i class="el-icon-menu"></i>
              <span>页面操作</span>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="refreshTab"><i class="el-icon-refresh"></i><span>刷新当前</span></el-dropdown-item>
              <el-dropdown-item command="removeOutTab"><i class="el-icon-remove-outline"></i><span>关闭其他</span></el-dropdown-item>
              <el-dropdown-item command="removeAllTab"><i class="el-icon-circle-close"></i><span>关闭全部</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-main>
    </el-container>

  </el-container>
</template>

<script>
// 默认为首页tab
let homeTab = {
  href: "home/index.html",
  icon: "icon-text",
  spread: false,
  title: "首页"
}
export default {
  data () {

    return {
      // 左侧导是否收起
      isCollapse: false,
      activeIndex2: '首页',
      menuListCode: "contentManagement1",
      menuList: [],
      menuTabs: [homeTab]
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
      this.addTab(tabObj);
    },

    /**
     * 添加tab 接收tab对象
     * icon:"图标名称"
     * title:"标题"
     * href:"目标链接"
     * target:"打开方式"
     */
    addTab (tabObj = {}) {
      let tabTitle = tabObj.title;
      // 没有则添加到menuTabs中
      if (!this.menuTabs.find(item => item.title === tabTitle)) this.menuTabs.push(tabObj);
      this.switchTab(tabTitle);
    },

    /**
     * 关闭tab
     * tabTitle:要删除的tab标题
     */
    removeTab (tabTitle) {
      let tabs = this.menuTabs;
      if (tabTitle === this.activeIndex2) {
        let currTabIndex = this.menuTabs.findIndex(item => item.title === tabTitle);
        let newTabTitle = this.menuTabs[--currTabIndex].title;
        this.switchTab(newTabTitle);
      }
      this.menuTabs = tabs.filter(item => item.title !== tabTitle);
    },

    /**
     * 关闭全部tab
     */
    removeAllTab () {
      let tabs = this.menuTabs;
      this.menuTabs = tabs.filter(item => item.title === homeTab.title);
      this.switchTab(homeTab.title);
    },

    /**
     * 关闭其他tab
     */
    removeOutTab () {
      let tabs = this.menuTabs;
      this.menuTabs = tabs.filter(item => (item.title === homeTab.title || item.title === this.activeIndex2));
      this.switchTab(this.activeIndex2);
    },

    /**
     * 切换tab
     * tabTitle:要切换的tab标题
     */
    switchTab (tabTitle) {
      this.activeIndex2 = tabTitle || homeTab.title;
    },

    /**
     * 刷新当前tab
     */
    refreshTab () {
      let iframe = this.$refs[this.activeIndex2][0];
      if (iframe.isRefresh) {
        this.$message({
          message: "您点击的速度超过了服务器的响应速度，还是等两秒再刷新吧！",
          type: "warning"
        });
      } else {
        iframe.contentWindow.location.reload();
        iframe.isRefresh = true;
        setTimeout(() => {
          iframe.isRefresh = false;
        }, 2000);
      }
    },

    /**
     * 点击页面操作按钮
     */
    tabActionClick (command) {
      switch (command) {
        case "refreshTab":
          this.refreshTab();
          break;
        case "removeOutTab":
          this.removeOutTab();
          break;
        case "removeAllTab":
          this.removeAllTab();
          break;

        default:
          break;
      }
    }


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

  /* home首页按钮 */
  .tab-home-btn {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    height: 40px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* iframe */
  .el-tabs {
    height: 100%;
    // background: #000;
    padding-top: 40px;
    box-sizing: border-box;
    box-shadow: none;
    //   border: none;
    /* tab选项卡 */
    /deep/.el-tabs__header {
      margin-top: -40px;
      margin-bottom: 0;
      padding-right: 140px;
      padding-left: 50px;
    }
    /deep/.el-tabs__content {
      padding: 0px;
      height: 100%;
    }

    /* tab选项卡 ifarame容器 */
    .el-iframe-container {
      position: absolute;
      height: 100%;
      width: 100%;
      .iframe {
        position: absolute;
        height: 100%;
        width: 100%;
        border: none;
      }
    }
  }

  /* 更多操作 */
  .tab-action-btn {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    width: 140px;
    height: 40px;
    border-left: 1px solid #e4e7ed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>