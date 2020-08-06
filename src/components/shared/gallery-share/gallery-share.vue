<template>
    <div>
        <div class="row">
          <div  style="margin: 10px 0;" class="col-md-3 col-sm-6"v-for="item of tableData">
            <div class="img-card" @click="modalShow(item)">
              <el-image   :src="item.path" @error="setDefaultPic(item)"></el-image>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
        <el-container v-if="infoShow">
          <el-alert type="warning" title="没有找到图片"></el-alert>
        </el-container>
      <div class="galleryModal" v-if="galleryShow" >
        <div class="gallery-modal-content">
          <div class="gm-close-btn" @click="galleryShow = false">
            <i class="el-icon-circle-close" style="font-size: 30px;color: #000;cursor: pointer;"></i>
          </div>
          <div class="content-left">
            <div style="display: flex;align-items: center;justify-content: center;height: 610px;">
              <div class="prev arrow" @click="prev()">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div class="img-zhong">
                <el-image :src="mainImg.path" @error="setDefaultPic(mainImg)"></el-image>
              </div>
              <div class="next arrow" @click="next()">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="thumbnail">
              <el-image  @click="touchImg(item)" v-for="item of tumbArr" :key="item.id" :src="item.path" @error="setDefaultPic(item)"></el-image>
            </div>
          </div>
          <div class="content-right">
            <h3>{{mainImg.name}}</h3>
            <p>上传时间：{{mainImg.create_time}}</p>
            <p>图片大小：{{formatSize(mainImg.size)}}</p>
            <div style="position: absolute;bottom: 40px;left: 12px">
              <el-button-group>
                <el-button @click="download(mainImg.path,mainImg.name)" type="primary">
                  <i class="el-icon-download"><span>下载图片</span></i>
                </el-button>
                <el-button @click="openEditorModel(mainImg)" type="default">
                  <i class="el-icon-edit"><span>编辑图片</span></i>
                </el-button>
                <el-button @click="deleteOne(mainImg.id)" type="danger">
                  <i class="el-icon-delete"><span>删除图片</span></i>
                </el-button>
              </el-button-group>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import  DownloaderService from '../../../api/console/downloader_api'
    export default {
        name: "gallery-share",
        data(){
          return{
            galleryShow : false,
            mainImg: {},  // 大图
            tumbArr: []
          }
        },
      props:{
        infoShow:false,
        tableData:{
          type:Array,
          default:[]
        }

      },
        methods:{
          modalShow(data){
            //必须创建个数组，不能直接赋值
            this.galleryShow = true;
            this.mainImg = data;
            const newArr =[];
            this.tumbArr = newArr.concat(this.tableData);
            const No = this.tumbArr.indexOf(this.mainImg);
            if(No >9){
              const num = No-9;
              for (let i = 0; i < num; i++) {
                const delVal = this.tumbArr.shift();
                this.tumbArr.push(delVal);
              }
            }
          },
          setDefaultPic(item){
            item.path = require('../../../assets/images/default-bg.jpg')
          },
          /*翻页*/
          prev(){
            const No = this.tumbArr.indexOf(this.mainImg);
            if (No > 0) {
              this.mainImg = this.tumbArr[No - 1];
            }
          },
          next(){
            const No = this.tumbArr.indexOf(this.mainImg);
            if (No < this.tumbArr.length - 1) {
              this.mainImg = this.tumbArr[No +1];
              if (No >= 9) {
                //大于等于10时，把第一张照片放最后
                const delVal = this.tumbArr.shift();
                this.tumbArr.push(delVal);
              }
            }else {
              return false;
            }
          },
          touchImg(data){
            this.mainImg = data;
          },
          download(filepath,newfilename){
            DownloaderService.downloadFile(filepath, newfilename);
          },
          openEditorModel(editId){
            this.$emit('editId',editId)
          },
          deleteOne(deleteId){
            this.$confirm('您是否确认要删除这项内容?', '提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() =>{
              this.$emit('deleteId',deleteId)
            }).catch(() =>{})
          },
          formatSize(bytes){
            if (bytes === 0) {
              return '0 B';
            }
            const k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
              i = Math.floor(Math.log(bytes)/Math.log(k));
            return parseFloat((bytes /Math.pow(k,i)).toFixed(dm)) + '' +sizes[i];
          },
          closeModal() {
            this.galleryShow = false;
          }
        }
    }
</script>

<style scoped lang="scss">

  .img-card{
    position: relative;
    width: 100%;
    height: 250px;
    cursor: pointer;
    border-radius: 7px;
    perspective: 1000px;
    overflow: hidden;
    transform-style: preserve-3d;

    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit:cover;
      border-radius: 7px;
      overflow: hidden;
      transition: all 0.45s ease-in-out 0s;
    }
    p{
      padding: 10px 0;
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      background: linear-gradient(to top, #000, transparent);
      position: absolute;
      bottom: -13px;
      left: 0;
    }
    &:hover img{

      transform: scale(1.2);
    }
  }


  .galleryModal{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #373737;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 88;

    .gallery-modal-content{
      display: flex;
      width: 1050px;
      position: relative;
      margin: 0 auto;
      top: 100px;
      background: #4d4d4d;
      .gm-close-btn{
        position: absolute;
        top: -15px;
        right: -15px;
        z-index: 2;
      }
    }
  }
  .content-left{
    padding: 20px;
    width: 700px;
    background: #9E9E9E;
    height: 700px;
  }
  .img-zhong{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 100%;
    img{
      max-width: 100%;
    }
  }
  .arrow{
    font-size: 50px;
    text-align: center;
    cursor: pointer;
  }
  .content-right{
    position: relative;
    width: 100%;
    background: #ffffff;
    padding: 20px;
    h3 {
      font-size: 18px;
    }
    p{
      margin: 20px 0;
    }
  }
  .thumbnail{
    width: 650px;
    height: 65px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    img{
      width: 65px;
      height: 65px;
      cursor: pointer;
      filter:brightness(50%)
    }
  }
  .img-active{
    border: 1px solid #00A2FF;
    filter:brightness(100%) !important;
  }

</style>
