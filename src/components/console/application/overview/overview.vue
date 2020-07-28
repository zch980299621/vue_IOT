<template>
  <div>
    <div class="view-breadcrumb">
      <el-breadcrumb class="ant-breadcrumb" separator-class="el-icon-arrow-right">
        <span  style="display: block;float: left">当前位置：</span>
        <el-breadcrumb-item>
          <router-link to="/console/applications">应用管理</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          应用列表
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <el-row class="mb-3">
        <el-col :span="8">
          <el-button type="primary" @click="isVisible=true"><i class="el-icon-plus"></i>新增应用</el-button>
        </el-col>
        <el-col :span="12" class="text-right">
          <el-select style="width: 120px;" v-model="selectedType" placeholder="请选择" @change="typeChange(selectedType)">
            <el-option  v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div class="app-table">
        <el-table  :data="dataSet" style="width: 100%" >
          <el-table-column  label="应用名称"  >
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="应用描述"  >
            <template slot-scope="scope">
              <span>{{scope.row.note}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="应用Key"  >
            <template slot-scope="scope">
              <span>{{scope.row.key}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="应用Secret"  >
            <template slot-scope="scope">
              <span>{{scope.row.secret}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="应用类别"  >
            <template slot-scope="scope">
              <span>{{translateType(scope.row.type)}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="应用模式"  >
            <template slot-scope="scope">
              <span>{{scope.row.mode ==1 ? 'Web应用': 'mobileyingy'}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="创建时间"  >
            <template slot-scope="scope">
              <span>{{scope.row.create_time}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作"  >
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button  @click="handleDelete(scope.row.id)" type="text"  class="text-danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix" style="margin-top: 20px">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="searchData($event,true)"
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </div>

      </div>

    </div>

    <!--增加应用-->
    <el-dialog :visible.sync="isVisible"  width="30%" title="增加设备">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item  label="产品名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入应用名称"></el-input>
        </el-form-item>
        <el-form-item  label="产品描述" prop="note">
          <el-input v-model="ruleForm.note" placeholder="请输入应用描述"></el-input>
        </el-form-item>
        <el-form-item label="应用描述" prop="modeValue">
          <el-select v-model="ruleForm.modeValue" placeholder="请选择应用模式" >
             <el-option label="web应用" :value="1"></el-option>
             <el-option label="mobile应用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用类别" prop="webTypeValue" v-if="ruleForm.modeValue ===1">
          <el-select v-model="ruleForm.webTypeValue" placeholder="请选择应用类别" >
            <el-option label="托管应用" :value="1"></el-option>
            <el-option label="第三方应用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用类别" prop="mobileTypeValue" v-if="ruleForm.modeValue ===2">
          <el-select v-model="ruleForm.mobileTypeValue" placeholder="请选择应用类别" >
            <el-option label="Ios" :value="3"></el-option>
            <el-option label="Android" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.prevent="submitForm(ruleForm)" :loading="loading">确认</el-button>
          <el-button class="ml-2"  @click="isVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import {getList,deleted,cteate } from '../../../../api/console/application_api.js'
    export default {
        name: "overview",
       data(){
          return{
            isVisible:false,
            selectedType: 0,
            currentPage :1,
            total: 0,
            pageSize : 8,
            dataSet : [],
            options: [{
              value: 0,
              label: '全部应用'
            }, {
              value: 1,
              label: '托管应用'
            }, {
              value: 2,
              label: '第三方应用'
            }, {
              value: 3,
              label: 'IOS'
            }, {
              value: 4,
              label: 'Android'
            }],
            loading: false,
            ruleForm:{
              name: '',
              note: '',
              modeValue: '',
              webTypeValue:'',
              mobileTypeValue:''
            },
            rules: {
              name: [
                {required: true, message: '请输入名称', trigger: 'blur'}
              ],
              note: [
                {required: true, message: '请输入应用描述', trigger: 'blur'}
              ],
              modeValue: [
                {required: true, message: '请输入应用描述', trigger: 'change'}
              ],
              webTypeValue: [
                {required: true, message: '请输入应用类别', trigger: 'change'}
              ],
              mobileTypeValue: [
                {required: true, message: '请输入应用类别', trigger: 'change'}
              ],
            }
          }
       },
      methods:{
        getList(search = 0){
          let params = {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            search: search
          };
          getList(params).then(res =>{
            this.dataSet = res.data.data.items;
            this.total = res.data.data.total_items;
          })
        },
        typeChange(e){
          this.currentPage =1;
          this.getList(e)
        },
        translateType(value) {
          switch (value) {
            case 1:
              return '托管应用';
            case 2:
              return '第三方应用';
            case 3:
              return 'IOS';
            case 4:
              return 'Android';
          }
        },
        handleDelete(id){
          this.$confirm('此操作会删除该设备。','确认删除该设备？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'info',
          }).then(() =>{
              let deleteParams ={
                _url: "/api/applications/"+ id+"/deleted",
                _method: "put",
                _body: ""
              };
              deleted(deleteParams).then(() =>{
                this.currentPage =1;
                this.getList();
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        },
        searchData(e,bool){
          if (bool) {
            this.currentPage = 1;
            this.pageSize = e;
          }
          this.getList();
        },
        submitForm(ruleForm){
          let type;
          if(ruleForm.modeValue === 1){
            type = this.ruleForm.webTypeValue;
          }else{
            type = this.ruleForm.mobileTypeValue;
          }
          const body ={
            name : this.ruleForm.name,
            note : this.ruleForm.name,
            mode : this.ruleForm.modeValue,
            type : type
          }
          cteate(body).then(res =>{
            this.isVisible =false;
            this.getList();
            this.$refs['ruleForm'].resetFields();
          })
        }
      },
      created(){
          this.getList();
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
