<template>
  <div>
    <div class="view-breadcrumb">
      <el-breadcrumb class="ant-breadcrumb" separator-class="el-icon-arrow-right">
        <span  style="display: block;float: left">当前位置：</span>
        <el-breadcrumb-item>
          <router-link to="/console/products">产品</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <router-link to="/console/products/list">产品列表</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          图库
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <div class="mb-3">
        <el-row>
          <el-col :span="8">
            <el-button type="primary" @click="openAddModal()" style="display:block;">新建</el-button>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-input  class="mb-3"  type="text" autosize  placeholder="输入名称搜索" v-model="search" @keyup.enter="onSearch()">
              <el-button slot="append" icon="el-icon-search" @click="onSearch()"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <Gallery :infoShow="infoShow" :tableData="tableData" @editId="openEditorModel" @deleteId="deleteOne" ref="gallery"></Gallery>
    </div>
    <!--上传模态框-->
    <el-dialog :visible.sync="isCtVisible"  width="30%" title="上传图片">
      <el-form label-position="right"  label-width="80px" :model="ruleForm">
        <el-form-item label="上传">
          <el-upload
            action="/api/api/upload/file"
            ref="upload"
            accept="'image/gif,image/jpeg,image/jpg,image/png,image/svg'"
            :limit="1"
            :auto-upload="false"
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
          <el-button  type="primary" @click.prevent="createProductImage()" >确认</el-button>
          <el-button class="ml-2"  @click="isCtVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑模态框-->
    <el-dialog :visible.sync="isEdVisible"  width="30%" title="编辑图片">
      <el-form label-position="right"  label-width="80px" :model="editForm">
        <el-form-item label="附件名称">
          <el-input v-model="editForm.name" placeholder="请输入附件名称"></el-input>
        </el-form-item>
        <el-form-item label="附件说明">
          <el-input v-model="editForm.note" placeholder="请输入说明"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.prevent="editModalFn()" >确认</el-button>
          <el-button class="ml-2"  @click="isEdVisible = false;isCtVisible =false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getProductImages,deleteProductImage,updateProductImage,addProductImage} from '../../../../api/console/product-img_api'
  import Gallery from '../../../shared/gallery-share/gallery-share'
    export default {
        name: "images",
      data() {
        return {
          isEdVisible : false,
          createBtn : true,
          search : '',
          product_id: '',
          infoShow : false,
          pageSize : 8,
          current : 1,
          total: {},
          tableData : [],
          dataArr : [],
          isCtVisible : false,
          ruleForm:{},
          editForm : {
            id: null,
            name : '',
            note : '',
            product_id: null
          },
        }
      },
      methods:{
        onSearch(){
          this.current = 1;
          this.getProductImages();
        },
        openEditorModel(editId){
          this.isEdVisible = true;
          this.editForm.name = editId.name;
          this.editForm.note = editId.note;
          this.editForm.id  = editId.id;
          this.editForm.product_id  = editId.product_id;
        },
        deleteOne(deleteId){
          let delImg ={
            _url: "/api/products/" + this.product_id +  "/images/"+ deleteId+"/deleted" ,
          };
          deleteProductImage(delImg).then(res =>{
            this.$message({
              message: '图片更新成功！',
              type: 'success'
            });
            this.getProductImages();
            this.$refs.gallery.closeModal();
            this.isEdVisible = false;
          })
        },
        getProductImages(){
          let imgProd ={
            _url: "/api/products/" + this.product_id +  "/images" ,
            _obj: {
              product_id: this.product_id,
              search: this.searchValue,
              page: this.current,
              pageSize: this.pageSize
            }
          };
          getProductImages(imgProd).then(res =>{
            this.tableData = res.data.data;
            this.total = res.data.page.total_items;
            if (this.tableData.length === 0) {
              this.infoShow = true;
            } else {
              this.infoShow = false;
            }
          })
        },
        openAddModal(){
          this.isCtVisible = true;
        },
        /*上传图片*/
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handleChange(file, fileList){},
        handleSuccess(res,file,fileList){
          this.$notify.success({
            title: '成功',
            message: `图片上传成功`
          });
          const obj ={};
          this.createBtn = false;
          obj.product_id = this.product_id;
          obj.size = res.size;
          obj.name = res.filename;
          obj.path = res.path;
          obj.mime = res.mime;
          obj.width = res.width;
          obj.height = res.height;
          obj.suffix = res.suffix;
          this.dataArr.push(obj)
        },
        handleError(err, file, fileList) {
          this.$notify.error({
            title: '错误',
            message: `图片上传失败`
          });
        },
        submitUpload(){
          this.$refs.upload.submit();
        },
        createProductImage(){
          let fileProd ={
            _url: "/api/products/" + this.product_id +  "/images" ,
          };
          addProductImage(fileProd,this.dataArr).then(res =>{
            this.getProductImages();
            this.dataArr =[];
            this.isCtVisible = false
          })
        },
        editModalFn(){
          let imgProd ={
            _url: "/api/products/" + this.product_id +  "/images/"+ this.editForm.id ,
          };
          updateProductImage(imgProd,this.editForm).then(res =>{
            this.$message({
              message: '图片更新成功！',
              type: 'success'
            });
            this.getProductImages();
            this.$refs.gallery.closeModal();
            this.isEdVisible = false;
            this.isCtVisible = false;
          })
        }
      },
      created(){
        this.product_id = this.$route.params.id;
        this.getProductImages();
      },
      components:{
        Gallery
      }
    }
</script>

<style scoped>

</style>
