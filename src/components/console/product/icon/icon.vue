<template>
  <div>
    <div class="view-breadcrumb">
      <el-breadcrumb class="ant-breadcrumb" separator-class="el-icon-arrow-right">
        <span  style="display: block;float: left">当前位置：</span>
        <el-breadcrumb-item>
          <router-link to="/console/products">产品</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          系列管理
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <el-row style="margin: 15px">
        <div class="mb-3">
          <el-col :span="8">
            <el-button type="primary" @click="openAddModal()">上传</el-button>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-input  type="text" v-model="search" @keyup.enter="onSearch()"  suffix-icon="el-icon-search" placeholder="输入名称搜索"></el-input>
          </el-col>
        </div>
      </el-row>
      <div class="row">
        <div  style="margin: 10px 0;" class="col-md-2 col-sm-6" v-for="item of tableData" :key="item.id">
          <div class="img-card2" style="position: relative" @click="modalShow(item)">
         <i class="el-icon-close" style="font-size: 20px;position: absolute;top: 10px;right: 0;z-index: 999" @click.stop="delete2(item.id)"></i>
          <el-image  class="img-one" :src="item.path" @error="setDefaultPic(item)"></el-image>
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
              <el-button @click="openEditorModel(mainImg)" type="default">
                <i class="el-icon-edit"><span>编辑图片</span></i>
              </el-button>
              <el-button @click="delete2(mainImg.id)" type="danger">
                <i class="el-icon-delete"><span>删除图片</span></i>
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="clearfix" style="margin-top: 20px">
        <el-pagination
          background
          layout="prev,pager, next"
          @current-change="pageIndexChange($event)"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
        <!--上传模态框-->
        <el-dialog :visible.sync="isCtVisible" title="上传图片" width="30%" >
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
           <el-form-item label="上传" prop="upload">
             <el-upload  class="upload"
               action="/api/api/upload/file"
               accept="'image/gif,image/jpeg,image/jpg,image/png,image/svg'"
                ref="upload"
               :limit="1"
               :auto-upload="false"
               :before-upload="handleBeforeUpload"
               :on-remove="handleRemove"
               :on-success="handleSuccess"
               :on-error="handleError"
               :on-change="handleChange"
             >
               <el-button slot="trigger" size="small" type="default" >选取文件</el-button>
               <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
             </el-upload>
           </el-form-item>
            <el-form-item>
              <el-button  type="primary" @click.prevent="submitForm()" :loading="addLoading">确认</el-button>
              <el-button class="ml-2"  @click="isCtVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!--编辑模态框-->
        <el-dialog :visible.sync="isEdVisible" title="编辑图片" width="30%" >
          <el-form :model="editForm" ref="editForm" label-width="100px">
            <el-form-item label="名称"  :rules="{ required: true,message: '请输入名称'}" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" @click.prevent="editModalFn()" >确认</el-button>
              <el-button class="ml-2"  @click="isEdVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

    </div>
  </div>
</template>

<script>
  import {deleteIconImage,getIconImages,addIconImage,updateProductImage} from '../../../../api/console/icon_api.js'
     export default {
        name: "icon",
        data(){
          return{
            search: '',
            current : 1,
            pageSize : 12,
            infoShow : false,
            total: 0,
            tableData : [],
            isEdVisible: false,
            isCtVisible :false,
            editForm : {
              id: null,
              name : '',
            },
            ruleForm :{
              name: '',
              path: '',
              size: 0,
              postfix: '',
            },
            galleryShow : false,
            mainImg :{},
            tumbArr : [],
            dataArr:[],
            addLoading:false
          }
        },
      methods:{
        getIconImages(){
          let params={
            search: this.search,
            page:this.current,
            pageSize: this.pageSize
          };
          getIconImages(params).then(res =>{
            this.tableData = res.data.data;
            this.total = res.data.page.total_items;
            if (this.tableData.length === 0) {
              this.infoShow = true;
            }else {
              this.infoShow = false;
            }
          })
        },
        handleCancel(){

        },
        openEditorModel(data){
          this.isEdVisible = true;
          this.editForm.name =data.name;
          this.editForm.id = data.id;
        },
        openAddModal(){
          this.isCtVisible =true;
        },
        onSearch(){
          this.current = 1;
          this.getIconImages();
        },
        pageIndexChange(e) {
          this.current = e;
          this.getIconImages();
        },
        modalShow(data){
          this.galleryShow =true;
          this.mainImg = data;
          const newArr = [];
          this.tumbArr = newArr.concat(this.tableData);
          const No = this.tumbArr.indexOf(this.mainImg);
          if (No > 9) {
            const num = No -9;
            for (let i = 0; i < num; i++) {
              const delVal = this.tumbArr.shift();
              this.tumbArr.push(delVal)
            }
          }
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
        deleteOne(id){
          let parParams={
            _url: "/api/products/icons/"+id+"/deleted" ,
            _method: "put",
            _body: ""
          };
          deleteIconImage(parParams).then(res =>{
           this.$message({
             message: '图片更新成功!',
             type: 'success'
           });
           this.getIconImages();
           this.closeModal();
           this.handleCancel();
          })
        },
        delete2(id){
          this.$confirm('您是否确认要删除这项内容?', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() =>{
            this.deleteOne(id);
          })
        },
        setDefaultPic(item){
          item.path = require('../../../../assets/images/default-bg.jpg')
        },
        /*文件大小格式化*/
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
        },
        /*图片上传*/
        handleBeforeUpload(file){
          if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
            this.$notify.warning({
              title: '警告',
              message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
            })
          }
          let size = file.size / 1024 / 1024 / 2
          if(size > 2) {
            this.$notify.warning({
              title: '警告',
              message: '图片大小必须小于2M'
            })
          }
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handleSuccess(res,file,fileList){
          this.$notify.success({
            title: '成功',
            message: `文件上传成功`
          });
          this.ruleForm.name = res.filename;
          this.ruleForm.size = res.size;
          this.ruleForm.path = res.path;
          this.ruleForm.postfix = res.suffix;
          console.log('1',this.ruleForm)
        },
        handleError(err, file, fileList) {
          this.$notify.error({
            title: '错误',
            message: `文件上传失败`
          });
        },
        handleChange(file, fileList){},
        submitUpload(){
          this.$refs.upload.submit();
        },
        submitForm(){
          const body ={
            name : this.ruleForm.name,
            path : this.ruleForm.path,
            postfix : this.ruleForm.postfix,
            size : this.ruleForm.size
          };
          this.dataArr.push(body);
          addIconImage(this.dataArr).then(res =>{
            this.getIconImages();
            this.dataArr =[];
            this.isCtVisible =false;
          })
        },
        /*编辑*/
        editModalFn(){
          let parParams={
            _url: "/api/products/icons/"+ this.editForm.id +"/update" ,
            _method: "put",
            _body: this.editForm
          };
          updateProductImage(parParams).then(body =>{
            this.$message({
              message: '图片更新成功!',
              type: 'success'
            });
            this.getIconImages();
            this.closeModal();
            this.handleCancel();
          })
        },
        handleCancel(){
          this.$refs['editForm'].resetFields();
          this.isCtVisible = false;
          this.isEdVisible = false;
        }
      },
       created(){
          this.getIconImages()
       }
    }
</script>

<style scoped lang="scss">
  .img-card2{
    position: relative;
    width:100%;
    cursor: pointer;
    border-radius: 7px;
    perspective: 1000px;
    overflow: hidden;
    transform-style: preserve-3d;

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
    .delectbutton{
      display:none;
    }
    &:hover img{
      transform:scale(1.1);
    }
    &:hover .delectbutton{display:block;

    }
  }
  .img-one{
    position: relative;
    width: 100%;
    object-fit:cover;
    border-radius: 7px;
    overflow: hidden;
    transition: all 0.45s ease-in-out 0s;
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
    text-align: left;
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
  .upload{
    float: left;
  }

</style>
