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
      <div class="mb-3">
        <el-row>
          <el-col :span="8">
            <el-button type="primary" @click="showCategory_from('add')">新增</el-button>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-input  type="text" v-model="search" @keyup.enter="onSearch()" @click="onSearch()"  suffix-icon="el-icon-search" placeholder="输入名称搜索"></el-input>
          </el-col>
        </el-row>
        </div>
      <el-table  :data="categories"  style="width: 100%">
        <el-table-column label="名称" >
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品数量" >
          <template slot-scope="scope">
            <span>{{scope.row.product_count || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" >
          <template slot-scope="scope">
            <span>{{scope.row.note || '没有描述'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button class="text-primary"  type="text" @click="showCategory_from( 'update',scope.row.id)">编辑</el-button>
            <el-popconfirm
              icon="el-icon-info"
              iconColor="red"
              title="这是一段内容确定删除吗？"
              @onConfirm="deleted(scope.row)"
            >
            <el-button class="text-danger" type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      </div>
    <el-dialog :visible.sync="innerVisible" title="新增系列" width="30%" >
      <span slot="title" >
        <span v-if="modal_type=='add'">新增系列</span>
        <span v-if="modal_type=='update'">修改系列</span>
      </span>
      <el-form :model="ruleForm"  ref="ruleForm">
        <el-form-item label="名称"  :rules="{ required: true,message: '请输入名称'}" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="note">
          <el-input type="textarea" v-model="ruleForm.note"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button class="text-right" type="primary" @click.prevent="submitForm1(ruleForm)" :loading="isOkLoading">确认</el-button>
          <el-button class="ml-2" @click="innerVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getCategories,getCategory,addCategory,updateCategory,remove} from '../../../../api/console/product-category_api'
    export default {
        name: "categories",
        data(){
          return{
            innerVisible:false,
            isOkLoading: false,
            search : '',
            loading : true,
            modal_type: '',
            categories: [],
            ruleForm: {
              name: '',
              note: '',
            },
          }
        },
      methods:{
        getCategories() {
          this.loading = true;
          let params ={
            search: this.search,
          };
          getCategories(params).then(res =>{
            this.categories = res.data.data;
          }).catch(err => {
            console.log("err===>",err);
          })

        },
        onSearch(){},
        showCategory_from(modal_type,category_id){
          this.modal_type  = modal_type;
          if (modal_type === 'add') {
            this.ruleForm = {name: '',note: ''};
            this.innerVisible = true;
          }else if(modal_type === 'update' && (typeof(category_id)!= "undefined")){
            this.category_id = category_id;
            let parParams={
              _url: "/api/products/categories/" + category_id  ,
              _method: "get",
              _body: ""
            };
            getCategory(parParams).then((res) =>{
                this.ruleForm ={name: res.data.data.name, note: res.data.data.note};
                this.innerVisible = true;

            }).catch(err => {
                console.log(err);
            })
          }
        },
        deleted(category){
          if (category.product_count){
            this.$message({
              dangerouslyUseHTMLString: true,
              message:'有产品在使用，<span class="text-danger">当前产品系列无法删除</spam>',
              type:'warning',
            });
            return
          }
          let parParams={
            _url: "/api/products/categories/" + category.id  ,
            _method: "delete",
            _body: ""
          };
          remove(parParams).then((res) =>{
            this.categories.forEach((item,index,array) =>{
              if (item.id === category.id) {
                this.categories.splice(index,1);
              }
            })

          }).catch(err => {
            console.log(err);
          })
        },
        submitForm1:function (ruleForm) {
          console.log(ruleForm)
          if(this.modal_type === 'add'){
            addCategory(ruleForm).then(body => {
              this.isOkLoading = false;
              this.innerVisible =false;
              this.search = '';
              this.getCategories();
            }).catch(err =>{
              this.isOkLoading = false;
            });
          }else if (this.modal_type === 'update' && (typeof(this.category_id) != "undefined")) {
            updateCategory(ruleForm,this.category_id).then(res =>{
              this.isOkLoading = false;
              this.innerVisible =false;
              this.search = '';
              this.getCategories();
            }).catch(err =>{
              this.isOkLoading = false
            })
          }
        }
      },
      created(){
        this.getCategories();
      }
    }
</script>

<style scoped lang="scss">
  .view-breadcrumb {
    border-bottom: 1px #d6d6d6 dashed;
    background-color: inherit;
    padding:0.25rem 0 0.5rem 0;
    margin-bottom: 15px;
  }
  .ant-breadcrumb{
    font-family: "Monospaced Number","Chinese Quote",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
  }
</style>
