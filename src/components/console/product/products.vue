<template>
  <div>
    <div class="sidebar">
      <el-menu class="sidebar-menu-ul" >
        <el-menu-item-group>
          <span title class="menu-title " style="color: white">产品</span>
          <ul>
            <el-menu-item><router-link to="/console/products/list"  @click.native="loadComponent(1)">产品列表</router-link></el-menu-item>
            <el-menu-item><router-link to="/console/products/devices"  @click.native="loadComponent(2)">设备管理</router-link></el-menu-item>
            <el-menu-item><router-link to="/console/products/rule"  @click.native="loadComponent(3)">规则引擎</router-link></el-menu-item>
            <el-menu-item><router-link to="/console/products/categories"  @click.native="loadComponent(4)">系列管理</router-link></el-menu-item>
            <el-menu-item><router-link to="/console/products/icon"  @click.native="loadComponent(5)">图标库管理</router-link></el-menu-item>
            <el-menu-item><router-link to="/console/products/help"  @click.native="loadComponent(6)">帮助文档</router-link></el-menu-item>
          </ul>
        </el-menu-item-group>
      </el-menu>
    </div>
    <div class="main">
      <List v-if="ptype ==1"></List>
      <Devices v-else-if="ptype ==2"></Devices>
      <Rule v-else-if="ptype ==3"></Rule>
      <Categories v-else-if="ptype ==4"></Categories>
      <Icon v-else-if="ptype ==5"></Icon>
      <Help v-else="ptype ==6"></Help>
    </div>
  </div>
</template>

<script>
  import List from './list/list.vue'
  import Devices from './devices/devices.vue'
  import Rule from './rule/rule.vue'
  import Categories from './categories/categories.vue'
  import Icon from './icon/icon.vue'
  import Help from './help/help.vue'
    export default {
        name: "products",
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
        List,
        Devices,
        Rule,
        Categories,
        Icon,
        Help
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
