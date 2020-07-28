<template>
  <div>
    <div class="console-sidebar">
      <div class="menu " >
        <el-tooltip content="产品" placement="right">
          <router-link to="/console/products"  @click.native="loadComponent(1)" ><i class="fa fa-diamond " aria-hidden="true"></i></router-link>
        </el-tooltip>
      </div>
      <div class="menu " >
        <el-tooltip content="应用" placement="right">
          <router-link to="/console/applications"  @click.native="loadComponent(2)" ><i class="fa fa-adn" aria-hidden="true"></i></router-link>
        </el-tooltip>
      </div>
      <div class="menu " >
        <el-tooltip content="组织" placement="right">
          <router-link to="/console/party"   @click.native="loadComponent(3)" ><i class="fa fa-users " aria-hidden="true"></i></router-link>
        </el-tooltip>
      </div>
      <div class="menu " >
        <el-tooltip content="消息" placement="right">
          <router-link to="/console/news"  class="message-count-link" @click.native="loadComponent(4)" ><i class="fa fa-comment " aria-hidden="true"></i><span class="message-count" v-if="message_count > 0">{{message_count > 99 ? "99+" : message_count}}</span></router-link>
        </el-tooltip>
      </div>

      <div class="menu setting">
        <el-tooltip content="设置" placement="top">
          <router-link to="/console/settings" @click.native="loadComponent(5)"><i class="fa fa-cog fa-spin" aria-hidden="true"></i></router-link>
        </el-tooltip>
      </div>
    </div>
    <div class="console-content">
      <router-view></router-view>
      <!--<ProDetail v-if="ctype ==0"></ProDetail>
      <Products v-if="ctype ==1"></Products>
      <Application v-else-if="ctype ==2"></Application>
      <Party v-else-if="ctype ==3"></Party>
      <News v-else-if="ctype ==4"></News>
      <Setting v-else-if="ctype ==5"></Setting>
   -->
    </div>
  </div>
</template>

<script>
  import Products from './product/products.vue'
  import Application from './application/applications.vue'
  import Party from './party/party.vue'
  import News from './new/news.vue'
  import Setting from './settings/settings.vue'
  import ProDetail from './product-detail/product-detail.vue'
    export default {
        name: "NavMenu",
      data(){
        return{
          ctype:1,
          message_count : 99,
        }
      },
      methods:{
        loadComponent(ctype) {
          if (ctype != null) {
            this.ctype = ctype;
          }
        }
      },
      components:{
        Products,
        Application,
        Party,
        News,
        Setting,
        ProDetail
      }
    }
</script>

<style scoped lang="scss">
  $sidebar_menu_width: 60px;
  $sidebar_menu_height: 45px;
  .console-sidebar {
    bottom: 0;
    width: 70px;
    height: calc(100% - #{$sidebar_menu_width});
    background-color: #09122A; // #001529
    position: fixed;
    text-align: center;
    .menu {
      font-size: 30px;
      color: #a2a2a2;
      height: $sidebar_menu_height;
      line-height: $sidebar_menu_height;
      a {
        color: #a2a2a2;
        display: block;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
      }
    }
    .menu.menu-selected {
      background-color: #5D81D7; // #108ee9
      //background-image: linear-gradient(to left, #48c6ef 0%, #6f86d6 100%);
      //background-image: linear-gradient(to left, #ff0844 0%, #ca0468 100%);
      background-image: linear-gradient(to right, #118DE9, #6280D6);
    }
    .menu.menu-selected a {
      color: white !important;
    }

    .setting {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  .console-content {
    position: absolute;
    bottom: 0;
    top: $sidebar_menu_width;
    right: 0;
    left: 70px;
    overflow: auto;
  }

  .message-count-link {
    position: relative;
    .message-count {
      position: absolute;
      right: 18px;
      overflow: hidden;
      transform: translateX(50%);
      top: 0;
      height: 20px;
      border-radius: 10px;
      min-width: 20px;
      background: #f04134;
      color: #fff;
      line-height: 20px;
      text-align: center;
      padding: 0 6px;
      font-size: 12px;
      white-space: nowrap;
      transform-origin: -10% center;
      font-family: tahoma;
    }
  }
   .active{
      font-size: 28px;
      color: antiquewhite;
     background-color: #5D81D7; // #108ee9
     //background-image: linear-gradient(to left, #48c6ef 0%, #6f86d6 100%);
     //background-image: linear-gradient(to left, #ff0844 0%, #ca0468 100%);
     background-image: linear-gradient(to right, #118DE9, #6280D6);
    }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
