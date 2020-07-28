<template>
  <div >
    <div class="resHeader">
      <div class="resTabItem activeTab">基本信息</div>
    </div>
    <div class="col-md-4 left-img">
      <i class="fa fa-user-circle fa-4x" aria-hidden="true" style="margin-right: 20px"></i>
      <el-button plain >更换头像</el-button>
    </div>
    <el-form ref="form" :model="form"  :rules="rules" label-width="80px">
      <el-form-item label="昵称">
        <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.position" placeholder="请输入职位"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.iphone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="所在地">
        <el-input v-model="form.location" placeholder="请输入所在地"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="width: 200px">保存</el-button>
  </div>
</template>

<script>
    export default {
        name: "userInfo",
        data(){
          return{
            form:{
              name:'',
              position:'',
              iphone:'',
              email:'',
              date1: '',
              date2: '',
              location:''
            },
            rules:{
              email: [
                {
                  type: "email",
                  required: true,
                  message: "邮箱格式不正确",
                  trigger: "blur"
                }
              ],
              iphone: [
                {
                  type: "iphone",
                  required: true,
                  message: "手机格式不正确",
                  trigger: "blur"
                }
              ],
            }
          }
        }

    }
</script>

<style scoped lang="scss">
  /*资源导航栏模块css*/
  .resHeader {
    position: relative;
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 30px;
  }
  .resHeader:before{
    content:"";
    position: absolute;
    left:-5px;
    right:-5px;
    height:1px;
    bottom:0;
    background-color:#999999;
  }
  .resHeader > div{
    display: inline-block;
  }
  .resTabItem{
    float: left;
    position: relative;
    margin-right:30px;
    font-size: 20px;
  }
  .activeTab{
    height:100%;
  }
  .activeTab:before{
    content: '';
    position: absolute;
    bottom:0;
    left:-5px;
    right:-5px;
    height:3px;
    background-color: #7fd3d1;
    border-radius: 6px;
  }
  .left-img {
    line-height: 110px;
  }
</style>
