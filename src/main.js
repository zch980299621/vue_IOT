// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.css'
import VueResource from 'vue-resource'
import store from './store'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
import axios from 'axios';
Vue.http.options.root = 'http://192.168.198.132:8080';
Vue.prototype.$axios = axios;
Vue.prototype.API_HOST = '/api'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
