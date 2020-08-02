<template>
  <div>
    <el-dialog :visible.sync="isVisible"  width="30%" title="开发设置[摄像头]">
      <el-form  :model="validateForm" :rules="validateRules" label-width="100px">
        <el-form-item  label="推流地址" prop="live_ip" >
          <el-input  v-model="cameraSettings.live_ip" placeholder="请输入推流地址"></el-input>
        </el-form-item>
        <el-form-item label="码率(Kb/S)"  prop="bit_rate">
          <el-select v-model="cameraSettings.bit_rate" placeholder="请选择码率" >
            <el-option v-for="item of camera_bit_rate" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分辨率"  prop="vga">
          <el-select v-model="cameraSettings.vga" placeholder="请选择分辨率" >
            <el-option v-for="item of camera_vga" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="摄像头IP" prop="camera_ip" >
          <el-input  v-model="cameraSettings.camera_ip" placeholder="请输入摄像头IP"></el-input>
        </el-form-item>
        <el-form-item  label="用户名" prop="camera_user" >
          <el-input  v-model="cameraSettings.camera_user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="camera_psd" >
          <el-input  v-model="cameraSettings.camera_psd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="分辨率"  prop="vga">
          <el-select v-model="execTypeValue" placeholder="请选择分辨率" >
            <el-option  label="camera1" value="camera1"></el-option>
            <el-option  label="camera2" value="camera2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="描述" prop="desc">
          <el-input type="textarea" v-model="cameraSettings.desc" placeholder=""></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button class="ok_btn" type="primary" @click.prevent=" submitForm(validateForm.value)" >确认</el-button>
          <el-button class="cancel_btn" @click="isVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import ExecSpecOptsService from '../../../api/console/exec-spec-opts_api'
    export default {
        name: "exec-spec-camera",
        data(){
          return{
            feature:{},
            validateForm:{},
            cameraSettings:{},
            isVisible : false,
            execTypeValue:'',
            validateRules:{
              live_ip: [
                { required: true, message: '请输入推流地址', trigger: 'blur' },
              ],
              bit_rate: [
                { required: true, message: '请选择码率', trigger: 'change' }
              ],
              camera_ip: [
                { required: true, message: '请输入摄像头IP', trigger: 'blur' },
              ],
              camera_user: [
                { required: true, message: '请输入摄像头IP', trigger: 'blur' },
              ],
              camera_psd: [
                { required: true, message: '请输入摄像头IP', trigger: 'blur' },
              ],
            },
            camera_bit_rate : [
              {id: '399', value: '399'},
              {id: '598', value: '598'},
              {id: '798', value: '798'},
              {id: '997', value: '997'},
              {id: '1197', value: '1197'},
              {id: '1596', value: '1596'},
            ],
            camera_vga : [
              { id: '720P' , value: '720P'},
              { id: '1080P' , value: '1080P'},
            ],
          }
        },
      methods:{
        openModal(f,execType){
          this.execTypeValue = execType;
          let execSpec;
          if (f.exec_spec !== '' && f.exec_spec !== null) {
            execSpec = JSON.parse(f.exec_spec);
          } else {
            execSpec = ExecSpecOptsService.getDefaultCamera();
          }
          this.showModal(execSpec);
        },
        showModal(execSpec) {
          this.cameraSettings = execSpec;
          console.log('cameraSettings', this.cameraSettings);
          this.isVisible = true;
        },
        submitForm(value){
          let obj = {
            execSpec: this.cameraSettings,
            execType: this.execTypeValue
          };
        }
      }
    }
</script>

<style scoped>

</style>
