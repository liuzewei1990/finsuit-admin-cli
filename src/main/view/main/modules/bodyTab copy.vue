<!-- 右侧主体组件 -->
<template>
  <section class='body-tab-container'>
    <!-- 首页tab按钮 -->
    <div class="tab-home-btn tab-home-btn-return" @click="switchCollapse">
      <i class="el-icon-s-fold"></i>
    </div>
    <!-- 刷新按钮 -->
    <div class="tab-home-btn tab-home-btn-refresh" @click="refreshTab">
      <i class="el-icon-refresh-right"></i>
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
  </section>
</template>

<script>
// 默认为首页tab
let homeTab = {
  href: "home/index.html",
  icon: "icon-text",
  spread: false,
  title: "首页"
}

import { mapState, mapActions } from "vuex"
export default {
  components: {},
  data () {
    return {
      // 当前显示的tab
      activeIndex2: '首页',
      // 所有打开的tab
      menuTabs: [homeTab]
    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    ...mapActions(["switchCollapse"]),
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
      if (this.menuTabs.length === 1) {
        this.$message({
          message: "没有可以关闭的窗口了@_@",
          type: "warning"
        });
        return;
      }
      let tabs = this.menuTabs;
      this.menuTabs = tabs.filter(item => item.title === homeTab.title);
      this.switchTab(homeTab.title);
    },

    /**
     * 关闭其他tab
     */
    removeOutTab () {
      if (this.menuTabs.length === 1) {
        this.$message({
          message: "没有可以关闭的窗口了@_@",
          type: "warning"
        });
        return;
      }
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
.body-tab-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

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

  // 后退
  .tab-home-btn-return {
    left: 0px;
  }

  .tab-home-btn-refresh {
    left: 50px;
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
      padding-left: 100px;
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
        animation: moveTop 1s;
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

  @keyframes moveTop {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>