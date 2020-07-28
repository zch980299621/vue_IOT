<template>
  <div class="console-body">
    <div class="console-navbar">
      <div class="d-flex flex-column flex-md-row align-items-center p-md-3 bg-black border-bottom border-black shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal text-white">
          <img class="logo" src="../../assets/images/wuyu-logo.png"> 物联网基础平台
        </h5>
        <nav class="my-2 my-md-0">
          <el-dropdown>
            <el-button><span class="el-dropdown-link">{{attachOrg.party_name}}</span><i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a @click="partyChange({ party_id:user.userid,party_type: 'personal', party_name: '个人'})">个人</a></el-dropdown-item>
              <el-container v-for="item of orgs" :key="item.id">
                <el-dropdown-item ><a @click="partyChange({ party_id:item.id,party_type: 'organization', party_name:item.name})">{{item.name}}</a></el-dropdown-item>
              </el-container>
            </el-dropdown-menu>
          </el-dropdown>
          <a class="p-3 text-white">
            <el-badge>
              <i class="fa fa-bell text-white" aria-hidden="true" style="font-size: 20px;" ></i>
            </el-badge>
          </a>
          <a class="p-3 text-white">帮助与文档</a>
          <el-dropdown>
            <a class="p-3 text-white">
              <i class="fa fa-user-circle fa-3x" aria-hidden="true"></i>
              <el-button><span class="el-dropdown-link">{{user.username|| user.nickname||user.userid}}</span><i class="el-icon-arrow-down el-icon--right"></i></el-button>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item> <router-link  to="/Personal">个人中心</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/Home" >平台首页</router-link></el-dropdown-item>
              <el-dropdown-item><a @click="signout()">退出账号</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import {exitSystem} from '../../api/home/api'
  import {attach_orgs} from '../../api/console/org_api'
  import {get_party} from '../../api/console/attch-party_api'
  export default {
        name: "HeadNav",
      data(){
          return{
            user:{},
            attachOrg:{},
            orgs:[],
          }
      },
      methods: {
        attachOrgs(){
          attach_orgs().then(res =>{
            this.orgs =res.data.data;
          }).catch(err =>{
            console.log(err);
          })
        },
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
        },
        partyChange(event){
           this.attachOrg = event;
          localStorage.setItem('attach-party',JSON.stringify(this.attachOrg));
          /*把信息放入vuex中*/
          this.$store.dispatch('attachOrg',this.attachOrg);
          this.$router.push({ path: "/console/products/list" });
        }
      },
    created(){
         this.user =  JSON.parse(localStorage.getItem('AUTH_USER_INFO'));
          this.attachOrg = JSON.parse(localStorage.getItem('attach-party'));
         this.attachOrgs();
    }
  }
</script>

<style scoped lang="scss">
  $sidebar_menu_width: 60px;
  $sidebar_menu_height: 45px;
  .console-body {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .bg-black {
    background-color: #000000!important;
  }
  .border-black {
    border-color: #000000!important;
  }
  .console-navbar {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    & > div:first-child {
      height: $sidebar_menu_width;
    }
  }
  .logo {
    height: calc(#{$sidebar_menu_width} - 25px);   // 物语云
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
