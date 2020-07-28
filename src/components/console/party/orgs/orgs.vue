<template>
  <div>
    <div class="view-breadcrumb">
      <el-breadcrumb class="ant-breadcrumb" separator-class="el-icon-arrow-right">
        <span  style="display: block;float: left">当前位置：</span>
        <el-breadcrumb-item>
          <router-link to="/console/products">产品</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          设备管理
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid" >
      <el-button class="ant-btn" type="primary" style="margin-bottom: 20px" @click="isVisible = true">创建组织</el-button>
      <el-container v-if="orgs.length <1">
        <el-alert title="没有数据"></el-alert>
      </el-container>
      <div class="row">
          <div  v-for="item of orgs" :key="item.id" class="col-md-6 col-lg-4 col-xl-3 mb-3">
            <el-card >
              <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
                <el-button  style="float: right;" size="small" type="default" @click="openEdModel(item)">编辑</el-button>
              </div>
              <div  class="text item">
                <p class="text-truncate">企业key:{{item.key}}</p>
                <p class="text-truncate">企业描述:{{item.note || '-'}}</p>
                <p>是否认证:<span v-if="item.certified ===1">是</span><span v-if="item.certified ===0">否</span></p>
                <el-button size="small" type="primary" @click="showDeleteConfirm(item.id)">退出企业</el-button>
              </div>
            </el-card>
          </div>
      </div>
    </div>

    <!--创建模态框-->
    <el-dialog :visible.sync="isVisible" title="创建组织" width="30%" >
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="名称"   prop="name">
          <el-input v-model="editForm.name" placeholder="请输入组织名称！"></el-input>
        </el-form-item>
        <el-form-item label="描述"   prop="note">
          <el-input v-model="editForm.note" placeholder="请输入组织描述"></el-input>
        </el-form-item>
        <el-form-item label="规模"  prop="scale">
          <el-input v-model.number="editForm.scale" placeholder="请输入组织规模" type="number" min="1"></el-input>
        </el-form-item>
        <el-form-item label="执照号码"   prop="licenceCode">
          <el-input v-model="editForm.licenceCode" placeholder="请输入执照号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.prevent="addOrg()" >确认</el-button>
          <el-button class="ml-2"  @click="isVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--编辑-->
    <el-dialog :visible.sync="isCtVisible" title="修改组织" width="30%" >
      <el-form :model="ruleForm"  ref="editForm" label-width="100px">
        <el-form-item label="名称"  :rules="{ required: true,message: '请输入组织名称'}"  prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入组织名称！"></el-input>
        </el-form-item>
        <el-form-item label="描述" :rules="{ required: true,message: '请输入组织描述'}"  prop="note">
          <el-input v-model="ruleForm.note" placeholder="请输入组织描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click.prevent="editOrg()" >确认</el-button>
          <el-button class="ml-2"  @click="isCtVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {attach_orgs,addOrg,editOrg,out_org} from '../../../../api/console/org_api'
    export default {
        name: "orgs",
        data(){
          return{
            isVisible :false,
            isCtVisible: false,
            orgs:[],
            editId : null,
            ruleForm : {
              name : '',
              note:''
            },
            dataArr : [],
            editForm : {
              name : '',
              note: '',
              scale: '',
              licenceCode:''
            },
            rules: {
              name: [
                {required: true, message: '请输入组织名称！', trigger: 'blur'}
              ],
              note: [
                {required: true, message: '请输入组织描述！', trigger: 'blur'}
              ],
              scale: [
                {required: true, message: '请输入组织规模！', trigger: 'blur'}
              ],
              licenceCode: [
                {required: true, message: '请输入执照号码！', trigger: 'blur'}
              ],
            }
          }
        },
      methods:{
        attachOrgs(){
          attach_orgs().then(res =>{
            this.orgs =res.data.data;
          }).catch(err =>{
            console.log(err);
          })
        },
        showDeleteConfirm(org_id){
          this.$confirm('<b style="color: red">退出后将看不到该企业下的所有产品。</b>','确认退出该企业吗？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString:true,
            type:'info',
          }).then(() =>{
            let params ={
              org_id: org_id,
            };
            out_org(params).then(res =>{
              this.orgs.forEach((item,index) =>{
                if(item.id === org_id){
                  this.orgs.splice(index,1)
                }
              });

            })
          })
        },
        addOrg(){
          this.isVisible =true;
          let obj ={
            name: this.editForm.name,
            note: this.editForm.note,
            licence_code: this.editForm.licenceCode,
            scale: this.editForm.scale
          }
          addOrg(obj).then(res =>{
            this.isVisible =false
            this.$refs['editForm'].resetFields();
            this.attachOrgs()
          }).catch(err =>{
            console.log(err)
          })
        },
        openEdModel(item){
          this.ruleForm.name = item.name;
          this.ruleForm.note = item.note;
          this.isCtVisible = true;
          this.editId = item.id;
        },
        editOrg(){
          let obj={
            name: this.ruleForm.name,
            note: this.ruleForm.note
          };
          let editParams ={
            _url: "/api/orgs/"+ this.editId +"/editOrg",
            _body: obj
          };
          editOrg(editParams).then(res =>{
            this.isCtVisible =false;
            this.attachOrgs()
          }).catch(err =>{
            this.$message.error('更新组织出现错误');
          })
        }
      },
      created(){
          this.attachOrgs()
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
  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .text {
    font-size: 14px;
    text-align: left;
  }
  .item {
    margin-bottom: 10px;
  }
  .ant-btn{
    display: block;
  }
</style>
