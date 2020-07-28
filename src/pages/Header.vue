<template>
  <header  :class="{'fixed-header': fixed}" :style="{'z-index': zIndex}"  >
    <div class="d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3" :style="{'background-color': bgColor}" >
      <h5 class="my-0 mr-md-auto font-weight-normal" :style="{color : textColor}"><img class="mb-1" src="../assets/images/wuyu-logo.png" style="height: 45px;"> 物联网云网关管理平台</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link slot="Home" :style="{color : textColor}" to="/" class="p-2" >首页</router-link>
        <router-link class="p-2" :style="{color : textColor}" to="/Case">产品案例</router-link>
        <router-link class="p-2" :style="{color : textColor}" to="/aboutUs">关于我们</router-link>
        <router-link class="p-2" :style="{color : textColor}" to="/contactUs">联系我们</router-link>
        <router-link class="p-2" :style="{color : textColor}"  to="/console">控制台</router-link>
      </nav>
      <router-link  slot="login" to="/login" class="btn btn-outline-primary btn-sm" v-if="!isLogin">登录</router-link>
      <div v-else="isLogin">
        <el-dropdown trigger="click">
          <a class="ant-dropdown-link" :style="{color : textColor}">
            <el-avatar style="vertical-align: middle;background-color: rgb(0, 189, 154);"  icon="anticon anticon-user" ></el-avatar>{{$store.state.userName}}
          </a>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/Personal">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a @click="signout()">退出账号</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <router-view></router-view>
  </header>
</template>

<script>
  import {exitSystem} from '../api/home/api'
    export default {
      name: "Header",
      data() {
        return {
          textColor: '#343a40',
          bgColor: '#ffffff',
          fixed: true,
          zIndex: 1,

        }
      },
      methods: {
        signout(){
          var _this = this;
          this.$confirm('你确认退出吗?', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() =>{
            exitSystem().then(res =>{
              console.log("res(exit)--->",res);
            }).catch(err =>{
              console.log("res(exit)--->",err);
            });
            sessionStorage.removeItem('userName');
            _this.$router.push('/login');
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
          }).catch(() =>{
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          })
        }
      },
      computed:{
        isLogin(){
          //通过sessionstorage获取vuex里islogin的状态
          if (sessionStorage.getItem("userName")) {
           this.$store.commit("userStatus",sessionStorage.getItem("userName"));
          }else{
            this.$store.commit("userStatus",null);
          }
          return this.$store.getters.isLogin;
        }
      }
    }
</script>

<style scoped lang="scss">
  .fixed-header {
    background: #F4F4F4;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  header .active {
    border: 1px #1a87c7 dashed;
    border-radius: 5px;
  }
</style>
