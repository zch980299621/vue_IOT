<template>
  <div>
  <div class="sidebar">
    <el-menu class="sidebar-menu-ul" >
      <el-menu-item-group>
        <span title class="menu-title " style="color: white">{{name}}</span>
        <span title class="menu-title fr" style="margin-right: 10px"><router-link to="/console/products/list" title="返回上一层" ><i class="el-icon-back" style="color: white;"></i></router-link></span>
        <ul>
          <el-menu-item><router-link :to="{name: 'features',params:{id: product_id}}"  >功能定义</router-link></el-menu-item>
          <el-menu-item><router-link :to="{name: 'devices',params:{id: product_id}}"  >设备管理</router-link></el-menu-item>
          <el-menu-item><router-link :to="{name: 'debug',params:{id: product_id}}"  >在线调试</router-link></el-menu-item>
          <el-menu-item><router-link :to="{name: 'ota',params:{id: product_id}}"  >固件版本</router-link></el-menu-item>
          <el-menu-item><router-link :to="{name: 'files',params:{id: product_id}}"  >产品附件</router-link></el-menu-item>
          <el-menu-item><router-link :to="{name: 'images',params:{id: product_id}}" >图库</router-link></el-menu-item>
          <el-menu-item><router-link :to="{name: 'recycle',params:{id: product_id}}" >回收站</router-link></el-menu-item>
          <el-menu-item><router-link :to="{name: 'logs',params:{id: product_id}}"  >操作日志</router-link></el-menu-item>
        </ul>
      </el-menu-item-group>
    </el-menu>
  </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Features from './features/features.vue'
  import Devices from './devices/devices.vue'
  import Debug from './debug/debug.vue'
  import Ota from './ota/ota.vue'
  import Files from './files/files.vue'
  import Images from './images/images.vue'
  import Recycle from './recycle/recycle.vue'
  import Logs from './logs/logs.vue'
  import {getProduct} from  '../../../api/console/product_api'
    export default {
        name: "product-detail",
        data(){
          return{
            name: '',
            product_id: ''
          }
        },
      created(){
        /*通过路由获取产品id*/
        this.product_id = this.$route.params.id;
        let parParams={
          _url: "/api/products/" + this.product_id  ,
          _method: "get",
          _body: ""
        };
        getProduct(parParams).then(res =>{
          this.name = res.data.data.category_name
        })
      },
        components:{
          Features,
          Devices,
          Debug,
          Ota,
          Files,
          Images,
          Recycle,
          Logs
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
