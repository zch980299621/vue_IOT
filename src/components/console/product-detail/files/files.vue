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
          产品附件
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <div class="mb-3">
        <el-row>
          <el-col :span="8">
            <el-button type="primary" @click="openCreateModel()" style="display:block;">新建</el-button>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-input  class="mb-3"  type="text" autosize  placeholder="输入名称搜索" v-model="search" @keyup.enter="onSearch()">
              <el-button slot="append" icon="el-icon-search" @click="onSearch()"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-table  :data="tableData"  tooltip-effect="dark" style="width: 100%;">
        <el-table-column label="文件名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.create_time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传者">
          <template slot-scope="scope">
            <span>{{scope.row.create_user_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件类型">
          <template slot-scope="scope">
            <span>{{scope.row.suffix}}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件大小">
          <template slot-scope="scope">
            <span>{{formatSize(scope.row.size)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <span>{{scope.row.note}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button class="text-primary" @click="openEditModel( scope.row)" type="text" size="small">查看</el-button>
            <el-divider  direction="vertical"></el-divider>
            <el-button  class="text-danger" type="text" size="small" @click="deleteOne(scope.row.id)">删除</el-button>
            <el-divider  direction="vertical"></el-divider>
            <el-button class="text-info"  type="text" size="small" @click="download(scope.row.path,scope.row.name)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev,pager, next"
        @size-change="searchData(true)"
        @current-change="searchData()"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!--新建模态框-->
    <el-dialog :visible.sync="isCtVisible"  width="30%" title="上传图片">
      <el-form label-position="right"  :rules="rules"  label-width="80px" :model="createForm">
        <el-form-item label="附件名称">
          <el-input v-model="createForm.name" placeholder="请输入附件名称"></el-input>
        </el-form-item>
        <el-form-item label="附件说明">
          <el-input v-model="createForm.note" placeholder="请输入说明"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
                      action="/api/api/upload/file"
                      ref="upload"
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
          <el-button  type="primary" @click.prevent="createProductFile()" >确认</el-button>
          <el-button class="ml-2"  @click="isCtVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑-->
    <el-dialog :visible.sync="isEdVisible"  width="30%" title="编辑系列">
      <el-form label-position="right" :rules="rules"   label-width="80px" :model="editForm">
        <el-form-item label="附件名称">
          <el-input v-model="editForm.name" placeholder="请输入附件名称"></el-input>
        </el-form-item>
        <el-form-item label="附件说明">
          <el-input v-model="editForm.note" placeholder="请输入说明"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.prevent="editProductFile()" >确认</el-button>
          <el-button class="ml-2"  @click="isEdVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getProductFiles,addProductFile,updateProductFile,deleteProductFile} from '../../../../api/console/product-file_api'
  import DownloaderService from '../../../../api/console/downloader_api'
    export default {
        name: "files",
      data(){
        return{
          product_id: '',
          searchValue : '',
          tableData : [],
          dataSet : [],
          pageIndex : 1,
          pageSize : 10,
          total : 1,
          isCtVisible : false,
          isEdVisible : false,
          modal_type: '',
          editFormId :null,
          createBtn : false,
          createArr : [],
          search:'',
          createForm : {
            name: '',
            note: '',
            path: '',
            size: '',
            mime: '',
            suffix: '',
            product_id: null,
          },
          rules:{
            name: [
              { required: true, message: '请输入固件名称', trigger: 'blur' },
            ],
            note: [
              { required: true, message: '请输入版本号', trigger: 'blur' },
            ],
          },
          editForm : {
            name: '',
            note: '',
            product_id: null,
          }
        }
        },
      methods:{
        openCreateModel(){
          this.isCtVisible = true;
        },
        /*编辑*/
        openEditModel(data){
          this.isEdVisible = true;
          this.editFormId = data.id;
          this.editForm.name = data.name;
          this.editForm.note = data.note;
        },
        // 搜索
        onSearch() {
          this.pageIndex = 1;
          this.getList();
        },
          //获得产品附件列表
        getList(){
          let fileProd ={
            _url: "/api/products/" + this.product_id +  "/files" ,
            _obj: {
              product_id: this.product_id,
              search: this.searchValue,
              page: this.pageIndex,
              pageSize: this.pageSize
            }
          };
          getProductFiles(fileProd).then(res =>{
            this.tableData = res.data.data;
            this.total = res.data.page.total_items;
          })
        },
        searchData(reset =false){
          if (reset) {
            this.pageIndex = 1;
          }
          this.loading = false;
          this.getList();
        },
        // 文件大小格式化
        formatSize(bytes) {
          if (bytes === 0) {
            return '0 B';
          }
          const k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        replaceName(name) {
          return name.replace(/\./g, '_');
        },
        // 下载
        download(filepath, newfilename) {
          DownloaderService.downloadFile(filepath, newfilename);
       },
        handleChange(file, fileList){},
        /*上传文件*/
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handleSuccess(res,file,fileList){
          this.$notify.success({
            title: '成功',
            message: `文件上传成功`
          });
         this.createForm.name = res.filename;
          this.createForm.size = res.size;
          this.createForm.mime = res.mime;
          this.createForm.path = res.path;
          this.createForm.suffix = res.suffix;
          console.log('1',this.createForm)
        },
        handleError(err, file, fileList) {
          this.$notify.error({
            title: '错误',
            message: `文件上传失败`
          });
        },
        submitUpload(){
          this.$refs.upload.submit();
        },
        createProductFile(){
          this.createForm.product_id = this.product_id;
          this.createArr.push(this.createForm);
          let fileProd ={
            _url: "/api/products/" + this.product_id +  "/files" ,
          };
          addProductFile(fileProd,this.createForm).then(res =>{
            this.createArr = [];
            this.isCtVisible = false;
            this.getList();
            this.$refs['createForm'].resetFields();
          })
        },
        editProductFile(){
          let fileProd ={
            _url: "/api/products/" + this.product_id +  "/files/"+ this.editFormId ,
          };
          updateProductFile(fileProd,this.editForm).then(res =>{
            this.isEdVisible = false;
            this.getList();
          })
        },
        deleteOne(id){
          this.$confirm('删除文件。','确认删除文件？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'info',
          }).then(() =>{
            let delFile ={
              _url: "/api/products/" + this.product_id +  "/files/"+ id+"/deleted" ,
            };
            deleteProductFile(delFile).then(res =>{
              this.getList();
              this.$message({
                message: '删除成功!',
                type: 'success'
              })
            })
          })
        }
      },
      created() {
        /*通过路由获取产品id*/
        this.product_id = this.$route.params.id;
        this.getList()
      },
    }
</script>

<style scoped>

</style>
