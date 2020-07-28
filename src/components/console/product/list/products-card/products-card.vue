<template>
  <div>
    <div v-if="products.length <1" class="mt-2">
      <el-alert type="warning" title="没有产品" ></el-alert>
    </div>
    <div class="row">
        <div class="col-md-6 col-lg-4 col-xl-3 mb-3" v-for="item of products" :key="item.id">
          <el-card :body-style="{ padding: '0px',width:'500px' }">
            <div class="custom-image" :style="{'background-image':'url('+item.poster+')'}" >
              <div class="lable">{{item.category_name || '-'}}
                <div class="triangle"></div>
              </div>
              <el-button type="primary" class="update_img" @click.prevent="updatePoster(item)"><span>更换图片</span></el-button>
              <div class="hover-banner" >
                <div class="item-left" @click.prevent="showUpdateProductModal(item.id)">
                  <span>编辑</span>
                </div>
                <div class="item-left" @click.prevent="updateEnabledState(item, item.enabled == 0 ? 1 : 0)">
                  <span v-if="item.enabled == 1">取消发布</span>
                  <span v-if="item.enabled == 0">发布</span>
                </div>
                <div class="item-left" @click.prevent="cloneProduct(item)">
                  <span>克隆</span>
                </div>
                <div class="item-left" @click.prevent="deletedProduct(item)">
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class="custom-card">
              <div class="row">
                <div class="col-5 text-left text-truncate">
                  <router-link :to="{name: 'product-detail',params:{id: item.id}}" style="margin-right: 10px"><span  style="font-weight: 500;">{{item.name}}</span></router-link>
                 <span style="font-weight: 500;font-size: 15px;">{{item.code}}</span>
                </div>
                <div class="col-5 text-right text-truncate">
                  <el-container v-if="item.enabled ==1">
                    <el-badge type="success"> <span class="text-success text-right">已发布</span></el-badge>
                  </el-container>
                  <el-container v-if="item.enabled !=1">
                    <el-badge type="warning"> <span class="text-secondary text-right">未发布</span></el-badge>
                  </el-container>
                </div>
                <div class="col-12  text-left mt-2 mb-2" style="font-size: 13px">Key: {{item.id}}</div>
                <div class="col-12 mt-2 mb-2  text-left" style="font-size: 12px">
                  认证类型：
                  <span v-if="item.auth == 0">一机一密</span>
                  <span v-if="item.auth == 1">一型一密</span>
                </div>
              </div>
              <p class="text-left">支持：{{item.protocols || "-"}}</p>
            </div>
          </el-card>
        </div>
    </div>

    <!--编辑-->
    <el-dialog :visible.sync="isVisible" title="修改产品" width="30%" >
        <el-form :model="product" :rules="rules" ref="ruleForm1" label-width="100px" >
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
            <el-button  type="primary" @click.prevent="submitForm()" :loading="isLoading">确认</el-button>
            <el-button class="ml-2"  @click="isVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {updateEnabledState, getProduct, clone,deletedProduct,updateProduct} from  '../../../../../api/console/product_api.js'
    export default {
        name: "products-card",
        data(){
          return{
            product:{},
            proDetail: false,
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
          updateEnabledState(product ,status){
            let enabledStateParams ={}
            if (status == 0) {
               enabledStateParams = {
                _url: "/api/products/" + product.id + "/disabled",
                _method: "put",
                _body: ""
              };
            }else {
              enabledStateParams = {
                _url: "/api/products/" + product.id + "/enabled",
                _method: "put",
                _body: ""
              };
            }
            updateEnabledState(enabledStateParams).then((res) => {
             this.products.forEach( (item,index,array) =>{
               if(item.id === product.id){
                 this.products[index].enabled = status;
               }
             } )
            }).catch(err => {
              if (err.response) {
                console.log(err.response.data);
              }
            })
          },
          cloneProduct(product){
            this.$confirm('将克隆该产品基本信息、所有功能项。','确定要克隆产品吗？',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type:'info',
              }).then(() => {
                let cloneParams ={
                  _url: "/api/products/" + product.id + "/clone",
                  _method: "post",
                  _body: ""
                };
                clone(cloneParams).then(res =>{
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
          deletedProduct(product){
            this.$confirm('此操作将永久删除该产品信息, 是否继续?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let deleteParams ={
                _url: "/api/products/" + product.id + "/deleted",
                _method: "put",
                _body: ""
              };
              deletedProduct(deleteParams).then(res =>{
                this.products.forEach((item,index,array) => {
                  if(item.id === product.id){
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
          updatePoster(item){
            //调用更换图片
            console.log('item',item)
          },
          submitForm() {
            this.isLoading = true;
            let updateParams ={
              _url: "/api/products/" + this.product.id ,
              _method: "put",
              _body: this.product
            };
            updateProduct(updateParams).then(res =>{
              this.isLoading = false;
              this.isVisible = false;
            })
          }
        },
    }
</script>

<style scoped lang="scss">
.custom-image  img {
      display: block;
    }
.custom-image {
    height: 200px;
    width: 100%;
    cursor: pointer;
    position: relative;
    background-color: #f1f1f1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
.custom-card {
   padding: 10px 16px;
  float: left;
 }
.custom-card p{
  color: #999;
}
.el-card:not(el-card-no-hovering){
  &:hover {
    border-color: #00A0FF;
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
    .hover-banner, .update_img {
      display: block;
    }
  }
}
 .lable{
   position: absolute;
   top: 10px;
   padding: 5px 10px;
   background-color: #00A0FF;
   font-size: 12px;
   color:white;
   .triangle{
     position: absolute;
     width: 0;
     height: 0;
     border-top: 14px solid transparent;
     border-left: 13px solid #00A0FF;
     border-bottom: 14px solid transparent;
     top: 0px;
     right: -13px;
   }
 }
.update_img {
     position: absolute;
     right: 10px;
     top: 10px;
    display: none;
     transition: all .3s;
 }
 .hover-banner{
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   height: 30px;
   line-height: 24px;
   font-size: 13px;
   background-color: #00A0FF;
   color: white;
   display: none;
   text-align: center;
   transition: all .3s;
   & > .item-left:last-child{
     border-right: none;
   }

   .item-left{
     float: left;
     border-right: 1px solid #6bc4ec;
     margin-top: 3px;
     height: 24px;
     width:14%;
     position: relative;
     cursor:pointer
   }
 }
</style>

