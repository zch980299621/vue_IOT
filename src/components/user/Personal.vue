<template>
  <div >
    <Header style="z-index: 2"></Header>
    <el-container  class="personal">
      <el-aside width="300px">
        <!--头像-->
            <div class="col-md-3 left-img">
             <i class="fa fa-user-circle fa-4x" aria-hidden="true"></i>
            </div>
            <div class="col-md-6 middle-intro">
              <h4>{{$store.state.userName}}</h4>
            </div>
        <el-menu :default-openeds="['1', '3']" background-color="white" class="user-nav">
          <el-menu-item index="1" class="li-inf">
            <a content="个人信息"  :class="{active: navType == 1}" @click="loadComponent(1)">个人信息</a>
          </el-menu-item>
          <el-menu-item index="2" class="li-inf">
            <a content="已加入企业"  :class="{active: navType == 2}" @click="loadComponent(2)">已加入企业</a>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="info">
        <User v-if="navType ==1"></User>
        <Company v-if="navType ==2"></Company>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Header from '../../pages/Header'
  import User from './userInfo'
  import Company from './agreeCom'
    export default {
        name: "Personal",
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
        Header,
        User,
        Company
      },
    }
</script>

<style scoped lang="scss">
  .personal{
    margin: 100px 200px;
  }
  .left-img {
    line-height: 220px;
    display: inline-block;
    margin-top: 25px;
    margin-left: 50px;
    padding-left: 25px;
  }
  .middle-intro {
    margin-top: 25px;
    text-align: right;
    display: inline-block;
    margin-right: 20px;
  }
  .user-nav{
    padding-left: 50px;
  }
  .li-inf{
    font-size: 18px;
    border-bottom: 2px solid #c0d3e4;
  }
  .info{
    margin: 50px 100px;
  }
</style>
