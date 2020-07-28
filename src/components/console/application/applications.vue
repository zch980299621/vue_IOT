<template>
  <div>
    <div class="sidebar">
      <el-menu class="sidebar-menu-ul" >
        <el-menu-item-group>
          <span title class="menu-title " style="color: white">应用管理</span>
          <ul>
            <el-menu-item><router-link to="/console/applications/overview"  @click.native="loadComponent(1)">应用列表</router-link></el-menu-item>
            <el-menu-item><router-link to="/console/applications/analysis"  @click.native="loadComponent(2)">应用分析</router-link></el-menu-item>
          </ul>
        </el-menu-item-group>
      </el-menu>
    </div>
    <div class="main">
      <Overview v-if="ptype ==1"></Overview>
      <Analysis v-if="ptype ==2"></Analysis>
    </div>
  </div>
</template>

<script>
  import Overview from './overview/overview.vue'
  import Analysis from './analysis/analysis.vue'
    export default {
        name: "applications",
      data(){
        return{
          ptype: 1
        }
      },
      methods:{
        loadComponent(ptype){
          this.ptype = ptype;
        }
      },
      components:{
        Overview,
        Analysis
      }
    }
</script>

<style scoped lang="scss">
  .router-link-exact-active,.active{
    color: white;
    font-weight: bold;
  }
  .active{
    background: linear-gradient(to right, #2D3A61 , #424F76,#2D3A61 ) !important;
  }
</style>
