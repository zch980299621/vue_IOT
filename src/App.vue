<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/*公共样式*/
/*
性别颜色
*/
.fa.fa-mars {
  color: #34b9ff !important;
}

.fa.fa-venus {
  color: #ff759d !important;
}

.fa.fa-transgender {
  color: #b736ff !important;
}

/*
阴影线
*/
.box-shadow {
  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
}


/*
面包屑导航样式覆盖
*/
.view-breadcrumb {
  border-bottom: 1px #d6d6d6 dashed;
  background-color: inherit;
  padding:0.25rem 0 0.5rem 0;
  margin-bottom: 15px;
}

/*
左浮动、右浮动、清除浮动
*/
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear-float{
  clear: both;
}


/*
每个模块：含有侧边栏菜单的最外层页面的左右布局
*/
$sidebar_menu_width: 240px;
.sidebar {
  width: $sidebar_menu_width;
  position: fixed;
  bottom: 0;
  top: 60px;
}

.main {
  width: calc(100% - #{$sidebar_menu_width});
  position: absolute;
  right: 0;
  padding: 8px;
}

@media (max-width: 768px) {
  .sidebar {
    top: 105px;
  }
}

/*
  内部侧边栏统一样式覆盖
*/
.sidebar-menu-ul{
  width: 100%;
  height: 100%;
  background: #182644!important;
  .menu-title {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    color: #fff!important;
  }

  //.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  //  background-color: rgba(130, 203, 255, 0.26);
  //}

  .ant-menu-item {
    -webkit-transition-property: background-color;
    -webkit-transition-duration: 0.3s;
    -webkit-transition-timing-function: ease;
  }
  .ant-menu-item-selected {
    background: linear-gradient(to right, #2D3A61 , #424F76,#2D3A61 ) !important;
  }
}
// 按钮组和其它组件对不齐
.ant-btn-group>.ant-btn {
  position: relative;
  line-height: 1.5!important;
}


.ant-form-item-label label {
  margin-bottom: inherit;
}

//feature开发设置样式
.sample_setting{
  .ant-modal{
    height:95%;
    top:5%
  }
  .ant-modal-content{
    height:95%;
    overflow: scroll;
  }

  .w_mudbus_val {
    width: 56px !important;
  }
  form .has-feedback .ant-input {
    padding-right: 4px;
  }

  .ant-divider-horizontal.ant-divider-with-text, .ant-divider-horizontal.ant-divider-with-text-left, .ant-divider-horizontal.ant-divider-with-text-right {
    color: rgb(111, 196, 236);
  }
  .ant-divider-horizontal.ant-divider-with-text-left:after, .ant-divider-horizontal.ant-divider-with-text-left:before, .ant-divider-horizontal.ant-divider-with-text-right:after, .ant-divider-horizontal.ant-divider-with-text-right:before, .ant-divider-horizontal.ant-divider-with-text:after, .ant-divider-horizontal.ant-divider-with-text:before {
    border-top: 1px solid #c0d3e4;

  }
}



</style>
