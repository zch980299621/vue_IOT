<template>
  <div >
      <div class="resHeader">
        <div class="resTabItem activeTab">已加入企业</div>
      </div>
    <el-button type="primary" class="createdCom">创建企业</el-button>
  </div>
</template>

<script>
    export default {
        name: "agreeCom"
    }
</script>

<style scoped lang="scss">
  /*资源导航栏模块css*/
  .resHeader {
    position: relative;
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 30px;
  }
  .resHeader:before{
    content:"";
    position: absolute;
    left:-5px;
    right:-5px;
    height:1px;
    bottom:0;
    background-color:#999999;
  }
  .resHeader > div{
    display: inline-block;
  }
  .resTabItem{
    float: left;
    position: relative;
    margin-right:30px;
    font-size: 20px;
  }
  .activeTab:before{
    content: '';
    position: absolute;
    bottom:0;
    left:-5px;
    right:-5px;
    height:3px;
    background-color: #7fd3d1;
    border-radius: 6px;
  }
  .activeTab{
    height:100%;
  }
  .createdCom{
    float: left;
  }
</style>
