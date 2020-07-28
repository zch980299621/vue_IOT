<template>
  <div>
  <Header style="z-index: 2"></Header>
  <div style="padding-top: 50px;width: max-content">
    <div class="container" style="float: left;padding-left: 30px">
      <div class="logo-img">
        <img src="../assets/logo.png" alt="About Images">
      </div>
        <div style="width: 60%;margin-right: 200px">
        <h3 >关于我们</h3>
        <p>依托高校科研成果产业化的物语云（杭州）科技有限公司，主要应用STEAM素质教育理念，研发生产生态农业和智慧教育跨界融合的智慧教育产品----中小学智慧生态创新实验室，是整体方案提供商和解决商。实验室包括三大功能，分别是学习互动功能、创客探究功能和室内外观赏体验功能。</p>
        <p>作为中小学智慧生态教育行业的领跑者，运用大数据，云计算和物联网技术，研发生产了系列化的智能装备，包括：智慧生态水培箱，智慧生态育苗箱，智慧生态土培箱，智慧生态物联网套件，室外微观察记录仪，数字式花箱等。利用这些智能化的教具，培养同学们的创新学习思维和创新实践能力。通过智能化的设备，真实采集生态实验数据，开展了比较学习、探究学习和观察学习，激发了同学们的学习热情和学习兴趣。</p>
        <p>同时，利用大数据技术，开发了智慧生态教育相关的实验指导手册和生态课程资源群，依托智慧生态教育云平台，开展跨地学习，移动学习和讨论学习，进一步培养了同学们的团队合作学习能力。</p>
        <p>我们企业的使命是运用先进的教育理念和技术手段，为中国的中小学生素质教育贡献自己的力量。</p>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  import Header from '../pages/Header.vue'
    export default {
      name: "About",
      components:{
        Header
      },
    }
</script>

<style scoped>
  p{
  text-indent:2em;
  font-size: 20px;
    padding-top: 10px;
}
  .logo-img{
    width: 500px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    float: right;
    padding-top: 200px;
    padding-left: 100px;
  }
</style>
