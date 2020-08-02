<template>
  <div>
    <el-dialog :visible.sync="isVisible"  width="30%" title="编辑指令[ModbusRTU]">
      <el-form  :model="editOrderForm" :rules="rules" label-width="100px">
        <el-form-item label="通讯地址"  prop="slave">
          <el-input v-model="wModbus.slave" placeholder="请输入通讯地址"></el-input>
        </el-form-item>
        <el-form-item label="功能码(HEX)"  prop="func">
          <el-select v-model="wModbus.func" placeholder="请选择功能码" >
            <el-option v-for="item of modbus_w_cmd_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始地址(HEX)"  prop="address">
          <el-input v-model="wModbus.address" placeholder="请输入起始地址"></el-input>
        </el-form-item>
        <el-form-item label="写字节值(HEX)"  prop="value">
          <el-input v-model="wModbus.value" placeholder="请输入写字节值"></el-input>
        </el-form-item>
        <el-form-item label="写字节数(HEX)"  prop="quantity" v-if="wModbus.func =='10' || wModbus.func =='0F'">
          <el-input v-model="wModbus.quantity" placeholder="请输入写字节数"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button class="ok_btn" type="primary" @click.prevent=" submitEditOrderForm(editOrderForm.value)" >确认</el-button>
          <el-button class="cancel_btn" @click="isVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "cmd-modal",
        data(){
          return{
            editOrderForm:{},
            isVisible : false,
            sampleConf: {},
            writeModbus:{},
            key: {},
            rules:{
              name: [
                { required: true, message: '通讯地址不能为空', trigger: 'blur' },
                { min: 2,  message: '长度必须是2位', trigger: 'blur' }
              ],
              func: [
                { required: true, message: '功能码不能为空', trigger: 'change' }
              ],
              address: [
                { required: true, message: '起始地址不能为空', trigger: 'blur' },
                { min: 4,  message: '长度必须是4位', trigger: 'blur' }
              ],
              value: [
                { required: true, message: '写字节值不能为空', trigger: 'blur' },
                { min: 4,  message: '长度必须是4位', trigger: 'blur' }
              ],
              quantity: [
                { required: true, message: '写字节数不能为空', trigger: 'blur' },
                { min: 4,  message: '长度必须是4位', trigger: 'blur' }
              ],
            },
            wModbus:{},
            // modbus功能码,写类型
            modbus_w_cmd_type : [
              { value: '05', name: '05'},
              { value: '06', name: '06'},
              { value: '0F', name: '0F'},
              { value: '10', name: '10'}
            ],
          }
      },
      methods:{
        showModal(feature_id, write_m, key) {
          this.isVisible = true;
          if (write_m) {
            this.writeModbus = write_m;
          }
          this.key = key;
          this.wModbus = this.writeModbus[key];
        },
        submitEditOrderForm(value){
          this.isVisible = false;
          const data = {
            key: this.key,
            wModbus: this.wModbus
          };
        }
      }
    }
</script>

<style scoped>

</style>
