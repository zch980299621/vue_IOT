<template>
  <div>
    <Header style="z-index: 2"></Header>
    <div id="allmap"></div>
      <div class="contact">
        <h3>联系我们</h3>
        <p>地址：杭州市富阳区九龙大道西100米中国智谷富春园区</p>
        <p>联系人：王xx</p>
        <p>联系电话：137xxxxx</p>
      </div>
    </div>
</template>

<script>
  import Header from '../pages/Header.vue'
    export default {
        name: "Contact",
      data(){
        return {

        }
      },
      methods: {
      },
      mounted(){
        if(BMap) {
          this.BMap = BMap;
          this.map = new BMap.Map("allmap");
          let point = new BMap.Point(119.997987, 30.150062);
          this.marker = new BMap.Marker(point);//创建标注
         this.overView = new BMap.OverviewMapControl({isOpen: true});
          this.map.addControl(this.overView); //添加控件
           this.map.addOverlay(this.marker);
          this.map.centerAndZoom(point, 16);
          this.map.enableScrollWheelZoom(true);//启用滚轮放大缩小
          console.log('ppp',)
        }
      },
      components:{
        Header
      },
    }
</script>

<style scoped  lang="scss">
  /* 地图 */
  #allmap{
    height: 600px;
    width:100%;
  }
  .contact{
    float: left;
    padding: 50px;
  }
  .contact h3{
    font-weight: bold;
  }
  .contact p{
    padding-top: 10px;
    font-size: 18px;
  }
</style>
