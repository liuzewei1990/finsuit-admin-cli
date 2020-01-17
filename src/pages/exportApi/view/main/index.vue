
<template>
  <section class='main pading'>
    <el-row>
      <el-col :span="12" class="pading">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>调用父级方法</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            <el-button type="primary" @click="addTab">添加tab</el-button>
            <el-button type="success" @click="removeTab">移除tab</el-button>
            <el-button type="danger" @click="switchTab">切换指定tab</el-button>
            <el-button type="warning" @click="toLogin">跳转到登陆路由</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="pading">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>读取登陆信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            <p>用户账号：{{$store.state.userInfo.userInfo.userName}}</p>
            <p>用户名称：{{$store.state.userInfo.userInfo.realname}}</p>
            <p>用户角色：{{$store.state.userInfo.userInfo.userRoles}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </section>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    addTab () {
      let tabObj = {
        href: "https://fanyi.baidu.com/",
        title: "翻译一下",
        icon: "icon-text",
        spread: false
      };
      window.parent.postMessage({ message: "addTab", data: tabObj });
    },
    removeTab () {
      window.parent.postMessage({ message: "removeTab", data: "翻译一下" });
    },
    switchTab () {
      window.parent.postMessage({ message: "switchTab", data: "首页" });
    },
    toLogin () {
      window.parent.postMessage({ message: "toLogin" });
    }
  },
}
</script>
<style lang='less' scoped>
.main {
}
.pading {
  padding: 10px;
}
</style>