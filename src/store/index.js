import Vue from 'vue';
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
//使用
Vue.use(Vuex)

const state = {
  /*登录信息*/
    userName: null,
    isLogin: false,
    userId :null,
    /*组织信息*/
   attachOrg: null,
};
export default new Vuex.Store({
    state,
    mutations,
    getters,
   actions,
  }
)
