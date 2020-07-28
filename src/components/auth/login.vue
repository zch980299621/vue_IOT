<template>
  <div class="main-login">
    <div class="login">
      <div class="return-home" >
        <router-link style="color: white" to="/"><i class="el-icon-arrow-left"></i></router-link>
      </div>

      <div class="login-header">
        <!--<img class="rounded" src="/assets/images/motong-logo.JPG">-->
        <!--<h4 style="padding-top: 25px;"><img class="rounded" src="/assets/images/motong.png"> 摩通科技</h4>-->
        <h4 style="padding-top: 5px;"><img class="rounded" src="../../assets/images/wuyu-logo.png"></h4>
        <h4>物联网基础平台</h4>

        <div class="iconfont">
          <!--<a nz-popover nzContent="物语云账号登录" class="login-type" [ngClass]="{active: navType == 1}" (click)="loadComponent(1)"><i class="fas fa-user-tie"></i></a>-->
          <a  class="login-type"  content="平台账号登录"  :class="{active: navType == 1}" @click="loadComponent(1)"><i class="fa fa-user"></i></a>
          <a  class="login-type" content="微信账号登录"  :class="{active: navType == 2}" @click="loadComponent(2)"><i class="fa fa-weixin"></i></a>
        </div>
      </div>

      <div class="login-body">
          <WuyuLogin v-if="navType ==1"></WuyuLogin>
          <WeiXin v-if="navType == 2"></WeiXin>
      </div>

    </div>

    <div class="login_footer">
      <p class="mt-5 mb-3 text-muted text-center">

      </p>
    </div>
  </div>

</template>

<script>
  import WuyuLogin from './wuyuyun_login.vue'
  import WeiXin from './weixin_login.vue'
    export default {
        name: "login",
      data(){
          return{
            navType : 1
          }
      },
      methods:{
        loadComponent(navType){
          if (navType != null) {
            this.navType = navType;
          }

        }
      },
      components:{
        WuyuLogin,
        WeiXin
      }
    }
</script>

<style scoped lang="scss">
  .main-login {
    //background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../assets/images/login_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    min-height:639px;
    .login {
      width: 400px;
      background-color: white;

      //position:absolute;
      //left:50%;    /* 定位父级的50% */
      //top:40%;
      //transform: translate(-50%,-50%); /*自己的50% */

      position: relative;
      margin: 120px auto;
      border-radius: 6px;
      box-shadow: 0 .25rem .75rem rgba(0, 0, 0, 0.23);

      .return-home {
        position: absolute;
        z-index: 1;
        font-size: 18px;
        left: 6px;
        top: 6px;
        padding: 0 5px;
        color: white;
        cursor: pointer;
      }

      .login-header {
        position: relative;
        width: 100%;
        height: 180px;
        color: white;
        text-align: center;
        box-shadow: 0 8px 6px -6px #828282;
        border-radius: 6px 6px 0 0;
        background: #000428;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        img{
          margin: 15px 0 0 0;
          width: 100px;
          height: 100px
        }
        h4{
          color: white;
          font-weight: 200;
        }

        .iconfont {
          position: absolute;
          bottom: 0;
          font-size: 16px;
          right: 0;

          .login-type {
            display: block;
            float: left;
            height: 30px;
            margin: 0 4px;
          }

          .active {
            color: #00c9ff;
            border-bottom: 2px solid #00c9ff;
          }
          i {
            margin: 0 10px;
          }
        }
      }

      .login-body {
        min-height: 200px;
        border-radius: 6px 6px 0 0;
      }
    }
  }
  .login_footer{
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  @media ( max-width: 1366px) {
    .login_footer{
      position: relative;
    }
    .login{
      margin: 50px auto 0 !important;
    }
  }


</style>
