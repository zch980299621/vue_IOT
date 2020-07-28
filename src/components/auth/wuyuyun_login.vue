<template>
    <el-form class="login-form"  :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <input type="text" name="x" style="width: 0px;position: absolute;height: 0px;">
      <el-form-item prop="name">
        <span class="ant-input-prefix">
        <el-input type="text" v-model="ruleForm.name" auto-complete="off"  placeholder="用户名" prefix-icon="el-icon-user">
        </el-input>
        </span>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码" prefix-icon="el-icon-goods"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="checkbox">
          <Slider
            @success="onSuccess"
            @fail="onFail"
            ref="slideDiv"
          ></Slider>
        </div>
      </el-form-item>
      <el-form-item>
        <label  v-model="ruleForm.remember" style="position: absolute">
          <input type="checkbox"></input>
          <span>记住我</span>
        </label>
        <a href="javascript:;" class="login-form-forgot">忘记密码？</a>
        <button  class="login-form-button ant-btn ant-btn-primary"  style="margin-top: 10px" @click="postUser()" :loading="logining">登录</button>
      </el-form-item>
    </el-form>
</template>

<script>
  import {userLogin} from '../../api/home/api'
  import {set_party} from '../../api/console/attch-party_api'
  import Slider from '../shared/slider.vue'
    export default {
        name: "wuyuyun_login",
      data(){
          /*y验证用户名*/
          let checkName = (rule,value,callback)=>{
            if (value === '') {
                callback(new Error("请输入用户名"))
            }
          };
          /*验证密码*/
         let validatePass = (rule,value,callback)=>{
           if(value === ''){
             callback(new Error("请输入密码"))
           }
         };
         return{
           authUser:{},
           logining : false,
           ruleForm:{
             name: "",
             password: "",
             remember: "",

           },
           rules:{
             name: [
               { validator: checkName,required: true, message: '请输入用户名', trigger: 'blur' },
               { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
             ],
             password: [{ validator: validatePass, required: true, message: '请输入密码',trigger: 'blur'}],
           },
         }
      },
      beforeRouteEnter:(to,from,next) => {
        //组件内守卫
        //已登录状态回到登录界面，即 登出
        next(vm => {
          vm.$store.dispatch("setUser",null);
        });

      },
      methods:{
        onSuccess() {
          this._login()
        },
        onFail() {
          this.$message.error('验证失败')
        },
          postUser() {
            console.log(this.$store.state.isLogin);
            let _this = this;
            this.logining = true;
            let loginJson ={
              "username":"admin",
              "password":"wuyuyun@28052575",
            };
           if (!this.ruleForm.name ) {
             this.$message.error('请输入用户名');
              return;
           }if (!this.ruleForm.password) {
              this.$message.error('请输入密码')
              return;
            } else{
              userLogin(loginJson).then(response => {
                this.logining = false;
                let rel_name = response.data.data.rel_name;
                let user = response.data.data.username;
                let userId =response.data.data.userid;
                let authUser = response.data.data;
                const attachOrg = {party_id: authUser.userid, party_type: 'personal', party_name: '个人'};
                set_party(attachOrg);
                localStorage.setItem('AUTH_USER_INFO',JSON.stringify(authUser))
                /*if (response.data.desc != 'ok') {
                  this.$message({
                    message: '账号或密码有误',
                    type: 'error'
                  });
                }else {*/
                  //将用户名放入sessionStorage中
                  sessionStorage.setItem('userName', user);
                  sessionStorage.setItem('rel_name',rel_name);
                  sessionStorage.setItem('userId',userId);
                  //将用户名放入vuex中
                  this.$store.dispatch('setUser',user,userId);
                  console.log(this.$store.state.isLogin);
                  this.$router.push({ path: "/home" });

              })
           }

          }
      },
      components:{
        Slider,
      }
    }
</script>

<style scoped lang="scss">
  .login-form {
    max-width: 300px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 5px;
  }

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
  .ant-btn {
    line-height: 1.5;
    display: inline-block;
    font-weight: 400;
    cursor: pointer;
    background-image: none;
    border: 1px solid #d9d9d9;
    padding: 0 15px;    border-radius: 4px;
    height: 32px;
    position: relative;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    white-space: nowrap;
    text-align: center;
    touch-action: manipulation;
  }
  .ant-btn-primary{
    color: #fff;
    background-color: #1890ff;

    font-size: 14px;
    border-color: #1890ff;
  }
</style>
