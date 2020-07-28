import Vue from 'vue'
import Router from 'vue-router'
/*首页栏目*/
import Home from '../pages/Home.vue'
import Case from '../pages/Case.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Feature from  '../components/console/product-detail/product-detail'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    { path: '/Home',name: 'Home', component: Home},
    { path: '/', redirect: '/login' },
    { path:'/Case',name: 'Case',component: Case },
    { path:'/aboutUs',name: 'About',component: About },
    { path:'/contactUs',name: 'Contact',component: Contact },
    { path: '/login',
      name: 'Login',
      component: () => import('@/components/auth/login.vue'),
      hidden: true
    },
    { path: '/Personal',
      name: 'Personal',
      component: () => import('@/components/user/Personal.vue'),
    },
    {
      path: '/console',
      name: 'Console',
      component: () => import('@/components/console/console.vue'),
        children: [
          {
            path: '/console/products',
            name: '产品',
            component: () => import('@/components/console/product/products.vue'),
            children: [
              {
                path: '/console/products/list',
                name: '产品列表',
                component: () => import('@/components/console/product/list/list.vue'),
              },
              {
                path: '/console/products/devices',
                name: '设备管理',
                component: () => import('@/components/console/product/devices/devices.vue'),
              },
              {
                path: '/console/products/rule',
                name: '规则引擎',
                component: () => import('@/components/console/product/rule/rule.vue'),
              },
              {
                path: '/console/products/categories',
                name: '系列管理',
                component: () => import('@/components/console/product/categories/categories.vue'),
              },
              {
                path: '/console/products/icon',
                name: '图标库管理',
                component: () => import('@/components/console/product/icon/icon.vue'),
              },
              {
                path: '/console/products/help',
                name: '帮助文档',
                component: () => import('@/components/console/product/help/help.vue'),
              }
              ]
          },
          {
            path: '/console/applications',
            name: '应用',
            component:() => import('@/components/console/application/applications.vue'),
            children: [
              {
                path: '/console/applications/overview',
                name: '应用列表',
                component: () => import('@/components/console/application/overview/overview.vue'),
              },
              {
                path: '/console/applications/analysis',
                name: '应用分析',
                component: () => import('@/components/console/application/analysis/analysis.vue'),
              }]
          },
          {
            path: '/console/party',
            name: '组织',
            component: () => import('@/components/console/party/party.vue'),
            children: [
              {
                path: '/console/party/orgs',
                name: '所属组织',
                component: () => import('@/components/console/party/orgs/orgs.vue'),
              },
              {
                path: '/console/party/users',
                name: '用户管理',
                component: () => import('@/components/console/party/users/users.vue'),
              }]
          },
          {
            path: '/console/news',
            name: '新闻',
            component: () => import('@/components/console/new/news.vue'),
          },
          {
            path: '/console/settings',
            name: '设置',
            component:() => import('@/components/console/settings/settings.vue'),
          },
          /*产品*/
          {
            path: '/console/products/:id',
            name: 'product-detail',
            component: () => import('@/components/console/product-detail/product-detail.vue'),
            children:[
              {
                path: '/console/products/:id/features',
                name: 'features',
                component: () => import('@/components/console/product-detail/features/features.vue'),
              },
              {
                path: '/console/products/:id/devices',
                name: 'devices',
                component: () => import('@/components/console/product-detail/devices/devices.vue'),
              },
              {
                path: '/console/products/:id/debug',
                name: 'debug',
                component: () => import('@/components/console/product-detail/debug/debug.vue'),
              },
              {
                path: '/console/products/:id/ota',
                name: 'ota',
                component: () => import('@/components/console/product-detail/ota/ota.vue'),
              },
              {
                path: '/console/products/:id/files',
                name: 'files',
                component: () => import('@/components/console/product-detail/files/files.vue'),
              },
              {
                path: '/console/products/:id/images',
                name: 'images',
                component: () => import('@/components/console/product-detail/images/images.vue'),
              },
              {
                path: '/console/products/:id/recycle',
                name: 'recycle',
                component: () => import('@/components/console/product-detail/recycle/recycle.vue'),
              },
              {
                path: '/console/products/:id/logs',
                name: 'logs',
                component: () => import('@/components/console/product-detail/logs/logs.vue'),
              },
            ]
          },
        ]
    },
  ]
})
/*const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter()
  router.matcher = reset.matcher
}*/
