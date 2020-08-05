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
          设备管理
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <el-row class="mb-4 ant-row">
        <el-col style="width: 25%">
      <el-button style="display: block" type="primary" @click="isCtVisible = true"><i class="el-icon-plus"></i>增加设备</el-button>
        </el-col>
      </el-row>
      <div class="clearfix">
        <h2 class="title fa-pull-left">设备列表</h2>
          <el-button class="fa-pull-right"  type="primary" @click="refresh()" size="small">
            <i class="fa fa-refresh"></i>
              刷新
          </el-button>
      </div>
      <div class="card" style="width:100%;">
        <div class="row">
          <div class="col-md-4 text-center">
            <p>设备总数</p>
            <div>{{total}}</div>
          </div>
          <div class="col-md-4 border-two text-center">
            <p>在线设备数</p>
            <div class="text-success">{{online}}</div>
          </div>
          <div class="col-md-4 text-center">
            <p>激活设备数</p>
            <div class="text-primary"> {{activation}}</div>
          </div>
        </div>
      </div>
    <div class="clearfix" style="width: 100%;margin: 20px 0">
      <div class="fa-pull-left">
        <el-button @click="deleteAll()" :disabled="disabledBtn" type="primary" style="margin: 0 10px 10px 0">批量删除</el-button>
      </div>
      <div class="fa-pull-right">
        <div style="width: 300px;">
          <el-input  class="mb-3"  type="text" autosize  placeholder="输入设备名称搜索" v-model="searchValue" @keyup.enter="onSearch()">
            <el-button slot="append" icon="el-icon-search" @click="onSearch()"></el-button>
          </el-input>
        </div>
      </div>
    </div>
      <el-table ref="rowSelectionTable" :data="data"  tooltip-effect="dark" style="width: 100%;" @select-all="checkAll()" @selection-change="handleSelectionChange" >
        <el-table-column type="selection"  ></el-table-column>
        <el-table-column label="设备名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属产品">
          <template slot-scope="scope">
            <span>{{scope.row.product_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Secret">
          <template slot-scope="scope">
            {{scope.row.secretShow? scope.row.secret : '************'}}
            <el-button v-if="!scope.row.secretShow" @click="scope.row.secretShow = true" style="margin-left: 20px" circle><i class="fa fa-eye"></i></el-button>
            <el-button v-if="scope.row.secretShow" @click="scope.row.secretShow = false" style="margin-left: 20px" circle><i class="fa fa-eye-slash"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column label="在线状态">
          <template slot-scope="scope">
            <el-container v-if="scope.row.status">
              <el-badge class="ml-2" ><span class="text-success">在线</span></el-badge>
            </el-container>
            <el-container v-if="!scope.row.status">
              <el-badge class="ml-2" ><span class="text-danger">离线</span></el-badge>
            </el-container>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="text-primary" ><router-link :to="{name: 'device-detail',params:{id:selectedValue,deviceId: scope.row.id}}">查看</router-link></el-button>
            <el-divider  direction="vertical"></el-divider>
            <el-button class="text-danger" @click="deleteOne(scope.row.product_id,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev,pager, next"
        @size-change="pageChange()"
        @current-change="currentPageDataChange($event)"
        :page-size="pageSize"
        :total="tableTotal">
      </el-pagination>
    </div>

    <!--增加设备-->
    <el-dialog :visible.sync="isCtVisible"  width="30%" title="增加设备">
      <el-dialog type="info" title="特备说明" description="deviceName可以为空，当为空时，物语云会颁发全局唯.一标识符作为deviceName，此时deviceName和deviceId相同。"></el-dialog>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item  label="产品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item  label="DeviceID" prop="devicesName">
          <el-input v-model="ruleForm.devicesName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.prevent="addDevice(ruleForm)" >确认</el-button>
          <el-button class="ml-2"  @click="isCtVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getProducts,getList,getStatistic,getDeviceStatus,deleted,create} from '../../../../api/console/devices_api'
    export default {
        name: "devices",
      data(){
          return{
            selectedData:[],
            devicesSelects : [],
            disabledBtn : true,
            selectedValue: '',
            selectedProduct : {name: ' '},
            allChecked : false,
            indeterminate : false,
            displayData : [],
            isCtVisible : false,
            deviceName : null,
            searchValue : '',
            currentPage : 1,
            pageSize : 8,
            tableTotal: 0,
            data : [],
            total: 0,
            activation: 0,
            online: 0,
            ruleForm:{
              name: '',
              devicesName: '',
            },
            rules: {
              name: [
                {required: true, message: '请输入名称', trigger: 'blur'}
              ],
            }
          }
      },
      methods:{
        search() {
          this.getList(this.searchValue);
        },
        selectedChange(){
          this.devicesSelects.forEach((v,k) =>{
            if (this.selectedValue === v.id) {
              this.selectedProduct = v;
            }
          });
          this.getList();
          this.getStatistic();
        },
        getProducts() {
          getProducts().then(res => {
            this.devicesSelects = res.data.data;
            this.devicesSelects.forEach((v,k) =>{
              if(v.id === this.selectedValue){
                this.selectedProduct.name = v.name
              }
            })
          })
        },
        getList(search= '') {
          let params = {
            product_id: this.selectedValue,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            search: search
          };
          getList(params).then(res =>{
            this.data = res.data.data.items;
            this.tableTotal = res.data.data.total_items;
            this.data.forEach((v,k) =>{
              //  console.log(v)
              v.checked = false;
              v.secretShow = false;
              let arr =[{
                product_id : v.product_id,
                device_id : v.id
              }];
              getDeviceStatus(arr).then(resData =>{
                if(resData.data.data[0].status === 'online'){
                  v.status = true;
                }else{
                  v.status = false;
                }
              }).catch(err => v.status = false)
            })
          }).catch(err => {
            console.log("err===>",err);
          })
        },
        getStatistic(){
          let params ={
            product_id: this.selectedValue,
          };
          getStatistic(params).then(res =>{
            this.total = res.data.data.total;
            this.online = res.data.data.online;
            this.activation = res.data.data.activation;
          })
        },
        deleteOne(product_id, id) {
          this.$confirm('此操作会删除该设备。','确认删除该设备？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'info',
          }).then(() =>{
            let deleteParams ={
              _url: "/api/products/"+ product_id+"/devices/"+ id +"/deleted",
              _method: "put",
              _body: ""
            };
            deleted(deleteParams).then(() =>{
              this.getList();
              getStatistic();
            }).catch(err =>{
              if (err.response) {
                console.log(err.response.data);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        },
        deleteAll(){
          this.$confirm('此操作会删除这些设备。','确认批量删除这些设备？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'info',
          }).then(() =>{
            this.data.forEach((v,k) =>{
              if(v.checked === true){
                let deleteParams ={
                  _url: "/api/products/"+ v.product_id+"/devices/"+ v.id +"/deleted",
                  _method: "put",
                  _body: ""
                };
                deleted(deleteParams).then(() =>{
                  this.getList();
                  getStatistic();
                }).catch(err =>{
                  console.log(err)
                })
              }
            })
          })
        },
        checkAll(){
          this.displayData.forEach(data =>{
            if(!data.disabled){
              data.checked = value;
            }
          });
          this.refreshStatus()
        },
        refreshStatus(){
          this.disabledBtn = !this.data.some(item => item.checked === true)
          const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
          const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
          this.allChecked = allChecked;
          this.indeterminate = (!allChecked) && (!allUnChecked);
        },
        handleSelectionChange(data) {
          this.selectedData = data;
        },
        pageChange(){
          this.getList(this.searchValue);
        },
        currentPageDataChange($event){
          this.currentPage = $event;
          this.getList();
        },
        refresh() {
          this.getList();
          this.getStatistic();
        },
        addDevice(ruleForm){
          let params ={
            product_id: this.selectedValue,
          };
          create(params,ruleForm).then(body =>{
            this.isCtVisible =false;
            this.getList();
            this.getStatistic();
            this.$refs['ruleForm'].resetFields();
          })
        }
      },
      created(){
        /*通过路由获取产品id*/
        this.selectedValue = this.$route.params.id;
        this.getProducts();
        this.getList();
        this.getStatistic();
      }
    }
</script>

<style scoped lang="scss">
  .title{
    font-size: 18px;
    margin: 20px 0;
  }
  .border-two{
    border-left: 1px solid #dadada;
    border-right: 1px solid #dadada;
  }
  .card{
    padding: 15px 24px !important;
    border: 1px solid #e8e8e8;
    p{
      font-size: 20px;
    }
    div{
      font-size: 24px;
    }
  }
</style>
