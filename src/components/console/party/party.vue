<template>
  <div>
    <div class="sidebar">
      <el-menu class="sidebar-menu-ul" >
        <el-menu-item-group>
          <span title class="menu-title " style="color: white">组织</span>
          <ul>
            <el-menu-item><router-link to="/console/party/orgs" v-if="isShow('personal')" @click.native="loadComponent(1)">所属组织</router-link></el-menu-item>
            <el-menu-item><router-link to="/console/party/users" v-if="isShow('organization')"  @click.native="loadComponent(2)">用户管理</router-link></el-menu-item>
          </ul>
        </el-menu-item-group>
      </el-menu>
    </div>
    <div class="main">
      <Orgs v-if="ptype ==1"></Orgs>
      <Users v-if="ptype ==2"></Users>
    </div>
  </div>
</template>

<script>
  import Orgs from './orgs/orgs.vue'
  import Users from './users/users.vue'
  import {get_party} from '../../../api/console/attch-party_api'
    export default {
        name: "party",
      data(){
        return{
          ptype: 1,
          attchOrg :{
            party_id: '',
            party_type: '', // personal | organization
            party_name: '',
          }
        }
      },
      methods:{
        loadComponent(ptype){
          this.ptype = ptype;
        },
        isShow(party_type){
            const attchOrg = get_party()
            if (attchOrg.party_type === party_type) {
              return true;
            } else{
              return false;
            }
        },
      },
      components:{
        Orgs,
        Users
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
