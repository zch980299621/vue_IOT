<template>
<div>
  <Header style="z-index: 2"></Header>
  <div class="col-sm">
    <section class="section-padding">
      <div class="container">
        <div class="row gray-bg"  id="1" >
          <div class="col-md-6 col-sm-6 padding0">
            <div class="about-image">
              <img src="../assets/images/case/case1.png" alt="About Images">
            </div>
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="about-text">
              <h3>幼儿园</h3>
              <p>主要激发小朋友们对自然科学探究的好奇心和求知欲，培养最基础的科学观察能力和生活体验。通过植物的持续观察和大自然环境的现场体验，小朋友们可以了解到植物生长有哪几个阶段，每个阶段时间、植物生长的特征、适宜温度等，然后通过画图、符号等手段，记录植物的生长特征和生长环境，分享劳动、分享喜悦成果</p>
            </div>
          </div>
        </div>
        <div class="row white-bg" id="2">
          <div class="col-md-6 col-sm-6 ">
            <div class="about-text">
              <h3>小学</h3>
              <p>小学生正是学习科普知识，对外界世界充满好奇的年龄阶段，我们主要通过建设智慧生态教育科普农园或者学科实验室来激发他们的学习兴趣，同时也丰富提升他们的学科知识。教师采用STEAM教育理念，采用探究式学习、启发式学习和体验式学习等多种学习方式，紧密结合学科教材知识点，引导学生开展立体化、跨时空的学习。比如“物联数据、立体化教材、智慧追溯、传感器历史数据分析、视频直播等”，培养了学生的数字化生存能力和持续观察分析探究自然能力.</p>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 padding0">
            <div class="about-image">
              <img src="../assets/images/case/case1.png" alt="About Images">
            </div>
          </div>
        </div>
        <div class="row gray-bg"  id="3" >
          <div class="col-md-6 col-sm-6 padding0">
            <div class="about-image">
              <img src="../assets/images/case/case1.png" alt="About Images">
            </div>
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="about-text">
              <h3>中学</h3>
              <p>中学生主要是以探究学习为主，我们主要运用物联网技术，移动互联，云计算等新一代信息技术，搭建智慧生态探究学习基地，基地主要包含微观察记录仪、自适应控制系统、智慧生态棚体、数字化种植设备等。我们采用视频直播技术，让学生在移动学习终端或PC端对植物生长状态以及环境状态进行实时监测，并记录历史数据，进行数据存储与分析，通过平台，共同交流种植经验，分享研究成果，开展各种主题型、差异性、比对型等科学小实验和合作性探究。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
  import Header from '../pages/Header.vue'
    export default {
        name: "case",
      components:{
          Header
      },
    }
</script>

<style scoped lang="scss">
  section.section-padding{
    padding-top: 30px;
  }
  section.section-padding.gray-bg {
    background: #dedede;
    padding: 60px;
    color: #484848;
  }
  .white-bg{
    background-color: white;
  }
  .gray-bg {
    background: #dedede;
  }
  .padding0{
    padding: 0;
  }
  .about-image {
    width: 100%;
    padding-bottom: 50%;
  }
  .about-image img {
    width: 90%;
    height: 90%;
    position: absolute;
    left: 5%;
    top: 5%;
  }
  .about-text{
    margin-top: 30px;
  }
  .about-text h3 {
    color: green;
    padding-bottom: 15px;
  }
  .about-text p {
    text-indent:2em;
  }
  .about-text .btn {
    margin-top: 20px;
    //font-size: 15px;
    //text-align: justify;
  }
  h3{
    line-height:1.1em;
    color: #212121;
    margin-bottom: 20px;
  }
</style>
