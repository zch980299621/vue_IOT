<template>
  <div>
    <Header style="z-index: 2"></Header>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide-image" v-for=" (slide,index) in slides" :key="index">
          <a><img :src="slide"/></a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>
    <div class="container-fluid">
      <div class="row font-c">
        <div class="col-xs-6 col-md-4">
          <h4>企业文化</h4>
          <p class="p-layout b-r">
            依托高校科研成果产业化的物语云（杭州）科技有限公司，主要应用STEAM素质教育理念，研发生产生态农业和智慧教育跨界融合的智慧教育产品----中小学智慧生态创新实验室，是整体方案提供商和解决商。实验室包括三大功能，分别是学习互动功能、创客探究功能和室内外观赏体验功能。
          </p>
        </div>

        <div class="col-xs-6 col-md-4">
          <h4>产品方向</h4>
          <p class="p-layout b-r">作为中小学智慧生态教育行业的领跑者，运用大数据，云计算和物联网技术，研发生产了系列化的智能装备，主要有智慧生态水培箱、智慧生态育苗箱、智慧生态土培箱、智慧生态物联网套件、智慧生态观察仪、智慧生态机器人等。可以满足学校差异化的定制需求，满足学生不同年龄段、不同主题的学习探讨，促进学科融合，发展学生的核心素养，提升教师专业能力
          </p>
          <!--<p class="p-layout b-r">xxxxx科技有限公司是一家以先进的技术和产品全力支撑中国智慧化生态教育建设的高新技术企业。主要产品包括：用于智慧生态学习的智慧生态水培箱、智慧生态土培箱、智慧生态育苗箱；用于创客探究学习的物联网套件；用于互动交流的树桩机器人……</p>-->
        </div>

        <div class="col-xs-6 col-md-4">
          <h4>公司原则</h4>
          <p class="p-layout">公司本着以服务客户为中心的三个满意为基本原则——产品质量的满意、先进技术的满意、售后服务的满意 ，不断加强企业综合竞争力。我们坚信：凭借良好的信誉、扎实的技术、周到细致的服务以及学习型的团队，摩通公司一定能为您提供更好、跟先进的产品、个性化定制的技术支持，以及反应快速，注重效率的售后服务！</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '../pages/Header.vue'
  import Swiper from 'swiper';
  import 'swiper/css/swiper.min.css'
    export default {
        name: "Home",
      data () {
          return{
            slides: [
              require("../assets/images/index_bg1.jpg"),
              require("../assets/images/index_bg2.jpg"),
              require("../assets/images/index_bg3.jpg")
            ]
          }
      },
      mounted() {
        var mySwiper = new Swiper('.swiper-container', {
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,   // 修改swiper父元素时，自动初始化swiper
          slidesPerView: 'auto', // 每个视图的幻灯片数量（幻灯片的容器上同时显示幻灯片）。
          keyboard: true, // 键盘控制
          scrollbar: {
            el: '.swiper-scrollbar',
            hide: true,
            draggable: true // 按住可拖动
          },
          spaceBetween: 30, // 幻灯片之间的距离px。
          centeredSlides: true,
          autoplay: {
            delay: 2500, // 每次自动滚动的时间间隔
            disableOnInteraction: false // 设置为false后自动播放不会在用户交互（滑动）后被禁用，每次交互后都会重新启动
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets', // 带有分页类型的字符串。可以是“子弹 bullets”，“分数 'fraction'”，“进度条 progressbar”或“自定义 custom”
            dynamicBullets: true,
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true  // 点击slide时显示/隐藏按钮。
          },
        })
      },
      computed:{
      },
      components:{
          Header
      },
    }
</script>

<style scoped lang="scss">
  .swiper-container {
    width: 100%;
    height: 550px;

  .swiper-slide-image {
    background-position: center;
    background-repeat: no-repeat;
  //background-size: cover;
    background-size: 100% 100%;
    background-color: #f6f6f6;
  }
  }

  .font-c {
    padding: 0 40px;
    margin-top: 50px;
    margin-bottom: 50px;

  .p-layout{
    margin-top: 30px;
    padding: 0 50px;
  }
  .b-r{
    border-right: 1px solid #ccc;
  }

  p {
    color: #b3b8c3;
    text-align: justify;
    text-indent: 28px;
  }

  h4 {
    color: #717370;
    text-align: center;
  }
  }

  @media (max-width: 768px) {
    .b-r {
      border-right: none;
    }
  }
</style>
