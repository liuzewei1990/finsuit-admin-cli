<!-- 头部 -->
<template>
  <section class='header-container'>
    <div class="block block-left">LOGO</div>
    <div class="block block-center"></div>
    <div class="block block-right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <span class="el-icon-user-solid"></span>
          <span>{{userInfo.realname}}</span><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex"
export default {
  components: {},
  data () {
    return {

    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo.userInfo,

    })
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    handleCommand (command) {
      switch (command) {
        case "exit":
          window.localStorage.setItem("@finsuit-admin", "");
          window.location.reload();
          break;

        default:
          break;
      }
    }
  },
}
</script>
<style lang='less' scoped>
.header-container {
  display: flex;
  height: 100%;
  .block {
    display: flex;
    align-items: center;
  }
  .block-left {
    width: 210px;
    justify-content: center;
  }
  .block-center {
    flex: 1;
  }
  .block-right {
    width: 300px;
    justify-content: flex-end;
    padding: 0 20px;
  }
}
</style>