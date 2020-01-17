
<template>
  <el-container>

    <!-- 上面头部 -->
    <el-header height="50px">
      <Header></Header>
    </el-header>

    <!-- 下面主体 -->
    <el-container class="main">

      <!-- 左侧导航 -->
      <el-aside :width="isCollapse?'auto':'auto'">
        <Menu></Menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main :class="isCollapse?'el-main-64':'el-main-210'" ref="elMain">
        <BodyTab ref="BodyTab"></BodyTab>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import Header from "./modules/header.vue"
import Menu from "./modules/menu.vue"
import BodyTab from "./modules/bodyTab.vue"
import { mapState, mapActions } from "vuex"
export default {
  components: { Header, Menu, BodyTab },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.config.isCollapse
    })
  },
  methods: {
    ...mapActions(["switchCollapse"]),
  }

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