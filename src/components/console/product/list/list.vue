<template>
  <div>
    <div class="view-breadcrumb">
      <el-breadcrumb class="ant-breadcrumb" separator-class="el-icon-arrow-right">
        <span  style="display: block;float: left">当前位置：</span>
        <el-breadcrumb-item>
          <router-link to="/console/products">产品</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          产品列表
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <el-row class="mb-4 ant-row">
        <el-col style="width: 25%">
          <button class="ant-btn ant-btn-primary" @click="showAddProductModal()" >
            <span><i class="el-icon-plus"></i> 新增产品 </span>
          </button>
          <el-select class="ml-2" style="width: 120px;" v-model="category_id" @change="selectCategory()">
            <el-option value="''" label="全部系列"></el-option>
            <el-option v-for="item of categories" :key="item.id" v-bind:value="item.name" >{{item.name}}</el-option>
          </el-select>
        </el-col>
        <el-col class="text-right" style="width: 70%">
          <el-input suffix-icon="iconfont icon-sousuo" style="width: 220px;" placeholder="输入型号、名称关键字" v-model="search" v-on:keyup.enter="onSearch" @click="onSearch()">
          </el-input>
          <el-button class="ml-2 ant-btn-group" style="padding: 0">
            <button class="ant-btn-primary" title="卡片展示" placement="top" type="templateId ==1 ? 'primary' : 'default'" @click="loadComponent(1)"><i class="fa fa-th-large" aria-hidden="true"></i></button>
            <button style="border-bottom-right-radius: 4px;border-top-right-radius: 4px;"  class="ant-btn-primary" title="列表展示" placement="top" type="templateId ==2 ? 'primary' : 'default'" @click="loadComponent(2)"><i class="fa fa-list" aria-hidden="true"></i></button>
          </el-button>
        </el-col>
      </el-row>
      <!--卡片展示/列表展示-->
      <el-container v-if="templateId == 1">
        <ProductCard  :products="products"  :categories="categories"  @submitUpdateData="submitUpdateData($event)" @cloned="cloned($event)" ></ProductCard>
      </el-container>
      <el-container v-if="templateId == 2">
        <ProductTable :products="products"  :categories="categories" @submitUpdateData="submitUpdateData($event)" @cloned="cloned($event)" ></ProductTable>
      </el-container>
      <div class="text-right">
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange($event)"
          :page-size="8"
          :total="pagination.total_items">
        </el-pagination>
       <!--<el-pagination background layout="prev,page,next" :page-size="8"> </el-pagination>-->
      </div>
    </div>
    <!--新增产品-->
    <el-dialog  :visible.sync="isVisible"  width="30%" title="新建产品">
      <div>
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px">
          <el-form-item  label="产品系列" prop="category_id">
            <el-select v-model="ruleForm1.category_id" placeholder="请选择产品系列">
              <el-option v-for="item of categories" :key="item.id" v-bind:value="item.name"  >{{item.name}}
              </el-option>
            </el-select>
            <el-button title="没有合适的系列？点击添加"   @click.prevent="add_category()"><i class="el-icon-plus"></i></el-button>
          </el-form-item>
          <el-form-item  label="名称" prop="name">
            <el-input v-model="ruleForm1.name"></el-input>
          </el-form-item>
          <el-form-item  label="型号" prop="code">
            <el-input v-model="ruleForm1.code"></el-input>
          </el-form-item>
          <el-form-item  label="数据格式" prop="encode">
            <el-select v-model="ruleForm1.encode" placeholder="请选择数据格式">
              <el-option label="Alink JSON" value="1"></el-option>
              <el-option label="透传/自定义" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="描述" prop="note">
            <el-input type="textarea" v-model="ruleForm1.note"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click.prevent="submitForm(ruleForm1)" :loading="addLoading">确认</el-button>
            <el-button class="ml-2"  @click="isVisible = false">取消</el-button>
          </el-form-item>
          <!--新增系列-->
          <el-dialog :visible.sync="innerVisible" title="新增系列" width="30%" >
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
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ProductCard from './products-card/products-card.vue'
  import ProductTable from './products-table/products-table.vue'
  import pagination from '../../../common/pagination/pagination.vue'
  import {getProducts,addProduct} from  '../../../../api/console/product_api.js'
  import {getCategories,addCategory} from  '../../../../api/console/product-category_api.js'
  export default {
    name: "list",
    data(){
      return{
        isVisible : false,
        innerVisible : false,
        addLoading: false,
        isOkLoading: false,
        category_id: '',
        search : '',
        value: '' ,
        page :1,
        pageSize : 8,
        templateId:1,
        categories :{
          id: "",
          name: "",
          note: "",
          owner_id: "",
          product_count: 0,
        },
        products: {
          owner_id: "",
          id: "",
          category_id: "",
          category_name: "",
          code: "",
          name: "",
          note: "",
          icon: "",
          poster: "",
          secret: "",
          auth: 0,
          encode: 0,
          enabled:0,
          deleted: 0,
          delete_user: "",
          delete_time: "",
          create_user: "",
          create_time: "",
          protocols: "",
        },
        pagination:{},
        ruleForm: {
          name: '',
          note: '',
        },
        ruleForm1:{
          category_id : '',
          name: '',
          code: '',
          encode: '',
          note: ''
        },
        rules:{
          category_id:[
            {required: true,message: '请选择产品系列',trigger: 'change'}
          ],
          name:[
            { required: true,message: '请输入名称',trigger: 'blur'},
          ],
          code:[
            { required: true,message: '请输入产品型号',trigger: 'blur'},
          ],
          encode:[
            { required: true,message: '请选择数据格式',trigger: 'change'},
          ],
        }
      }
    },
    methods:{
      /*改变页码的两个方法*/
      handleSizeChange(){
        this.page =1;
        this.getProduct();
      },
      handleCurrentChange($event){
        this.page = $event;
        this.getProduct()
      },
      showAddProductModal(){
        this.isVisible = true;
      },
      getCategories() {
        let params ={
          search: this.search,
        };
        getCategories(params).then(res =>{
          this.categories = res.data.data;
        }).catch(err => {
          console.log("err===>",err);
        })
      },
      selectCategory(){
        this.page = 1;
        this.getProduct();
      },
      keyupEnter() {
        document.onkeydown = e => {
          let body = document.getElementsByTagName('body')[0]
          if (e.keyCode === 13 && e.target.baseURI.match(/inputbook/) && e.target === body) {
            console.log('enter')
            this.onSearch()
          }
        }
      },
      onSearch:function () {
        this.page = 1;
        this.category_id = '';
        if (this.validate()) {
          this.getProduct();
        }
      },
      getProduct(){
        let params = {
          category_id: this.category_id,
          search: this.search,
          page: this.page,
          pageSize: this.pageSize
        };
        getProducts(params).then(res =>{
          this.products = res.data.data;
          this.pagination = res.data.page;
        }).catch(err => {
          console.log("err===>",err);
        })
      },
      loadComponent(templateId) {
        this.templateId = templateId;
      },
      submitUpdateData($event) {
        this.getProduct();
      },
      pageIndexChange($event){
        this.page = $event;
        this.getProduct();
      },
      pageSizeChange() {
        this.page = 1;
        this.getProducts();
      },
      add_category(){
        this.innerVisible = true;
       // $event.preventDefault();

      },
      cloned($event) {
        this.getProducts();
      },
      submitForm:function (ruleForm1) {
        this.$refs.ruleForm1.validate((valid) => {
          if (!valid) {
            this.$message({
              message: '请输入完整',
              type: 'warning'
            })
          }
        });
        this.addLoading = true;
        addProduct(ruleForm1).then(response => {
           this.getProduct();
            this.addLoading = false;
            this.isVisible = false;
            this.$refs['ruleForm1'].resetFields();
        }).catch(err => {
          console.log("err===>",err);
        });
      },
      submitForm1:function (ruleForm) {
        this.$refs.ruleForm.validate((valid) => {
          if (!valid) {
            this.$message({
              message: '请输入完整',
              type: 'warning'
            })
          }
        });
        this.isOkLoading = true;
        addCategory(ruleForm).then(body => {
          this.getCategories();
          this.isOkLoading = false;
          this.innerVisible = false;
          this.$refs['ruleForm'].resetFields();
        }).catch(err => {
          console.log("err===>",err);
        });
      }
    },
    components:{
      ProductCard,
      ProductTable,
      pagination,
    },
    created(){
      this.keyupEnter();
      this.getProduct();
      this.getCategories();
    }
  }
</script>

<style scoped lang="scss">
  .ant-row{
    margin-left: 0;
    margin-right: 0;
    height: auto;
    zoom: 1;
    display: block;
    box-sizing: border-box;
    position: relative;
  }
  .ant-btn {
    line-height: 1.5;
    display: inline-block;
    font-weight: 400;
    cursor: pointer;
    background-image: none;
    border: 1px solid #d9d9d9;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
    position: relative;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    white-space: nowrap;
    text-align: center;
    touch-action: manipulation;
  }
  .ant-btn-primary{
    color: white;
    background-color: #1890ff;
    border-color: #1890ff;
  }
  // 按钮组和其它组件对不齐
  .ant-btn-group{
    position: relative;
    line-height: 1.5!important;
  }
</style>
