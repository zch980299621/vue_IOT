<template>
  <div>
    <div class="mb-3">
      <el-table  :data="products" style="width: 100%" >
          <el-table-column  label="型号/姓名" width="500px" align="center">
            <template slot-scope="scope">
              <div class="row">
                <div class="col-4">
                  <div class="custom-image" :style="{'background-image':'url('+ scope.row.poster+')'}" >
                    <span class="updateImg" @click="updatePoster(scope.row)">更换图片</span>
                  </div>
                </div>
                <div class="col-8">
                  <h5 class="mt-0 mb-1"><router-link :to="{name: 'product-detail',params:{id: scope.row.id}}">{{scope.row.name}}</router-link></h5>
                  <h6 class="mt-0 mb-1">型号：{{scope.row.code}}</h6>
                  <p class="text-truncate">key：{{scope.row.id||"-"}}</p>
                  <p class="text-truncate">支持：{{scope.row.protocols || "-"}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column  label="系列" width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.category_name}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="认证类型" width="130px" >
            <template slot-scope="scope">
              <span v-if="scope.row.auth == 0"> 一机一密</span>
              <span v-if="scope.row.auth == 1"> 一型一密</span>
            </template>
          </el-table-column>
          <el-table-column  label="状态" width="130px">
            <template slot-scope="scope">
              <el-container v-if="scope.row.enabled ==1">
                <el-badge class="ml-2" ><span class="text-success">已发布</span></el-badge>
              </el-container>
              <el-container v-if="scope.row.enabled !=1">
                <el-badge class="ml-2" ><span class="text-secondary">未发布</span></el-badge>
              </el-container>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="300px" class="float-left">
            <template slot-scope="scope">
              <el-button type="text" @click="showUpdateProductModal( scope.row.id)">编辑</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" v-if="scope.row.enabled ==1" @click="updateEnabledState( scope.row,0)">取消发布</el-button>
              <el-button type="text" v-if="scope.row.enabled ==0" @click="updateEnabledState( scope.row,1)">发布</el-button>
             <!-- <el-container v-if="scope.row.enabled ==1"><a class="text-info"  @click="updateEnabledState(scope.$index, scope.row,0)">取消发布</a></el-container>
              <el-container v-if="scope.row.enabled ==0"><a class="text-info" @click="updateEnabledState(scope.$index, scope.row,1)">发布</a></el-container>-->
              <el-divider direction="vertical"></el-divider>
              <el-button @click="cloneProduct(scope.row)" type="text">克隆</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button  @click="handleDelete(scope.row)" type="text"  class="text-danger">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

    </div>
    <!--编辑-->
    <el-dialog :visible.sync="isVisible" title="修改产品" width="30%" >
      <el-form :model="product" :rules="rules" ref="ruleForm1" label-width="100px">
        <el-form-item  label="产品系列" prop="category_id">
          <el-select v-model="product.category_id" placeholder="请选择产品系列">
            <el-option v-for="item of categories" :key="item.id" v-bind:value="item.name"  >{{item.name}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="名称" prop="name">
          <el-input v-model="product.name"></el-input>
        </el-form-item>
        <el-form-item  label="型号" prop="code">
          <el-input v-model="product.code"></el-input>
        </el-form-item>
        <el-form-item  label="数据格式" prop="encode">
          <el-select v-model="product.encode" placeholder="请选择数据格式">
            <el-option label="Alink JSON" value="1"></el-option>
            <el-option label="透传/自定义" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="描述" prop="note">
          <el-input type="textarea" v-model="product.note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.prevent="submitForm(product)" :loading="isLoading">确认</el-button>
          <el-button class="ml-2"  @click="isVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {updateEnabledState, getProduct, clone,deletedProduct,updateProduct} from  '../../../../../api/console/product_api.js'
    export default {
        name: "products-table",
        data(){
          return {
            product:{},
            isVisible:false,
            isLoading: false,
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
        props:{
          products: {
            type: [ Object,Array ],
            required:true
          },
          categories:{
            type: [ Object,Array ],
            required:true
          }
        },
        methods:{
          showUpdateProductModal(id){
            let parParams={
              _url: "/api/products/" + id  ,
              _method: "get",
              _body: ""
            };
            getProduct(parParams).then((res) =>{
              this.product = res.data.data;
              this.isVisible = true;
            }).catch(err => {
              if (err.response) {
                console.log(err.response.data);
              }
            })
          },
          updateEnabledState(row ,status){
            let enabledStateParams ={}
            if (status == 0) {
              enabledStateParams = {
                _url: "/api/products/" + row.id + "/disabled",
                _method: "put",
                _body: ""
              };
            }else {
              enabledStateParams = {
                _url: "/api/products/" + row.id + "/enabled",
                _method: "put",
                _body: ""
              };
            }
            updateEnabledState(enabledStateParams).then((res) => {
              this.products.forEach( (item,index,array) =>{
                if(item.id === row.id){
                  this.products[index].enabled = status;
                }
              } )
            }).catch(err => {
              if (err.response) {
                console.log(err.response.data);
              }
            })
          },
          cloneProduct(row){
            this.$confirm('将克隆该产品基本信息、所有功能项。','确定要克隆产品吗？',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type:'info',
            }).then(() => {
              let cloneParams ={
                _url: "/api/products/" + row.id + "/clone",
                _method: "post",
                _body: ""
              };
              clone(cloneParams).then(res =>{
                console.log('eff',row)
                this.$emit('cloneProduct')
                /*  this.products.forEach((item,index,array) => {
                    if(item.id === product.id){
                     this.products.unshift(this.product)
                    }
                  })*/
              }).catch(err => {
                if (err.response) {
                  console.log(err.response.data);
                }
              })
            })
          },
          handleDelete(row){
            this.$confirm('此操作将永久删除该产品信息, 是否继续?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let deleteParams ={
                _url: "/api/products/" + row.id + "/deleted",
                _method: "put",
                _body: ""
              };
              deletedProduct(deleteParams).then(res =>{
                this.products.forEach((item,index,array) => {
                  if(item.id === row.id){
                    this.products.splice(index,1)
                  }
                })
              }).catch(err =>{
                if (err.response) {
                  console.log(err.response.data);
                }
              })
            })
          },
          submitForm(){
            this.isLoading = true;
            let updateParams ={
              _url: "/api/products/" + this.product.id ,
              _method: "put",
              _body: this.product
            };
            updateProduct(updateParams).then(res =>{
              this.isLoading =false;
              this.isVisible = false;
            })
          }
        }
    }
</script>

<style scoped lang="scss">

  .custom-image {
    height: 110px;
    width: 100%;
    position: relative;
    background-color: #f1f1f1;
    border: 1px dashed #dadada;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 5px;
  }

  .updateImg {
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 27px;
    line-height: 27px;
    color: white;
    background-color: rgba(0, 160, 255, 0.85);
    text-align: center;
    cursor: pointer;
    border-radius:0 0 5px 5px;
  }

  .table-tr:hover {
  .updateImg{
    display: block;
  }
  }
</style>
