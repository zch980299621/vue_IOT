import axios from 'axios';
import Vue from "vue";

//设置请求的根路径
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true;

export {axios};
