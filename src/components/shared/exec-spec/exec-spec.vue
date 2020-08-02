<template>
<div>
  <el-dialog :visible.sync="isVisible"  width="30%" title="开发设置">
    <el-form class="modal_content" :model="execSpec" :rules="execFrom" label-width="100px">
      <el-divider content-position="center">串口设置</el-divider>
      <el-form-item label="连接串口"  prop="port">
        <el-input v-model="execSpec.tty.port" placeholder="请输入串口"></el-input>
      </el-form-item>
      <el-form-item label="波特率" prop="baudrate">
        <el-select v-model="execSpec.tty.baudrate" placeholder="请选择波特率" >
          <el-option v-for="item of  baud_rate_opts" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据位" prop="databits">
        <el-select v-model="execSpec.tty.databits" placeholder="请选择数据位" >
          <el-option v-for="item of  data_bit_opts" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="停止位" prop="stopbits">
        <el-select v-model="execSpec.tty.stopbits" placeholder="请选择停止位" >
          <el-option v-for="item of  stop_bit_opts" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="校验位" prop="parity">
        <el-select v-model="execSpec.tty.parity" placeholder="请选择校验位" >
          <el-option v-for="item of  parity_bit_opts" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-divider content-position="center">读设置</el-divider>
      <el-form-item label="协议类型" prop="read_type">
        <el-select v-model="execSpec.read.type" placeholder="请选择协议" >
          <el-option v-for="item of rw_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指令内容" prop="read_serial" >
        <el-input v-model="execSpec.read.serial" placeholder="请输入指令内容"></el-input>
      </el-form-item>
      <el-container v-if="execSpec.read.type == 'modbus'" style="display: block">
          <el-form-item label="通讯地址" prop="read_m_slave" >
            <el-input v-model="execSpec.read.modbus.slave" placeholder="请输入通讯地址"></el-input>
          </el-form-item>
          <el-form-item label="功能码" prop="read_m_func">
            <el-select v-model="execSpec.read.modbus.funce" placeholder="请选择功能码" >
              <el-option v-for="item of modbus_r_cmd_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="起始地址" prop="read_m_addr" >
          <el-input v-model="execSpec.read.modbus.addr" placeholder="请输入起始地址"></el-input>
        </el-form-item>
        <el-form-item label="操作数量" prop="read_m_count" >
          <el-input v-model="execSpec.read.modbus.count" placeholder="请输入操作数量"></el-input>
        </el-form-item>
      </el-container>
      <el-form-item v-if="execSpec.read.type == 'lua'" label="协议脚本" prop="read_script">
        <el-input type="textarea" v-model="execSpec.read.script" placeholder="请输入脚本内容"></el-input>
      </el-form-item>
      <el-form-item label="转换类型" prop="transform_type">
        <el-select v-model="execSpec.read.transform.type" placeholder="请选择转换类型" >
          <el-option v-for="item of transform_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-container v-if="execSpec.read.transform.type !== 'lua' && execSpec.read.transform.type !== 'none'" style="display: block">
        <el-form-item label="大小端" prop="transform_endian">
          <el-select v-model="execSpec.read.transform.endian" placeholder="请选择转换类型" >
            <el-option v-for="item of transform_endian" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="转换起始字节" prop="transform_start">
          <el-input type="number" class="num_input" step="1" max="65535"  min="0" v-model="execSpec.read.transform.start" placeholder="请输入起始字节"></el-input>
        </el-form-item>
        <el-form-item  label="字节数量" prop="transform_count">
          <el-select v-model="execSpec.read.transform.count" placeholder="请选择字节数量" >
            <el-option v-for="item of transform_count" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="K系数" prop="transform_k">
          <el-input type="number" class="num_input" step="1" max="65535"  min="0" v-model="execSpec.read.transform.k" placeholder="请输入K系数"></el-input>
        </el-form-item>
        <el-form-item  label="P系数" prop="transform_p">
          <el-input type="number" class="num_input" step="1" max="65535"  min="0" v-model="execSpec.read.transform.p" placeholder="请输入P系数"></el-input>
        </el-form-item>
      </el-container>
      <el-form-item  label="转换脚本" prop="transform_script">
        <el-input type="textarea" v-model="execSpec.read.transform.script" placeholder="请输入脚本内容"></el-input>
      </el-form-item>
      <el-divider content-position="center" v-if="execSpec.read.transform.type !=='none' && execSpec.read.transform.type !=='lua' ">读设置</el-divider>
      <!--calculate计算 -->
      <el-form-item  label="计算类型" prop="calculate_type">
        <el-select v-model="execSpec.read.calculate.type" placeholder="请选择计算类型" >
          <el-option v-for="item of calculate_calibrate_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="计算表达式" prop="calculate_expr" v-if="execSpec.read.calculate.type == 'expr'">
        <el-input  v-model="execSpec.read.calculate.expr" placeholder="请输入指令内容"></el-input>
      </el-form-item>
      <el-form-item  label="计算脚本" prop="calculate_script" v-if="execSpec.read.calculate.type == 'lua'">
        <el-input type="textarea" v-model="execSpec.read.calculate.script" placeholder="请输入脚本内容"></el-input>
      </el-form-item>
      <!--calibrate  校准-->
      <el-form-item  label="校准类型" prop="calibrate_type">
        <el-select v-model="execSpec.read.calibrate.type" placeholder="请选择校准类型" >
          <el-option v-for="item of calculate_calibrate_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="校准表达式" prop="calculate_expr" v-if="execSpec.read.calibrate.type == 'expr'">
        <el-input  v-model="execSpec.read.calibrate.expr" placeholder="请输入校准表达式"></el-input>
      </el-form-item>
      <el-form-item  label="校准脚本" prop="calibrate_script" v-if="execSpec.read.calibrate.type == 'lua'">
        <el-input type="textarea" v-model="execSpec.read.calibrate.script" placeholder="请输入脚本内容"></el-input>
      </el-form-item>
      <!--post 上报-->
      <el-form-item  label="上报类型" prop="post_type">
        <el-select v-model="execSpec.read.post.type" placeholder="请选择校准类型" >
          <el-option v-for="item of post_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="选择间隔时间" prop="post_interval" v-if="execSpec.read.post.type == 'interval'">
        <el-select v-model="execSpec.read.post.interval" placeholder="请选择校准类型" >
          <el-option v-for="item of interval_opts" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-container v-if="execSpec.read.post.type == 'timing'" style="display: block">
        <el-form-item  label="选择时间类型" prop="post_timing_base" >
          <el-select v-model="execSpec.read.post.timing.base" placeholder="请选择时间类型" >
            <el-option v-for="item of timing_base_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="选择时间点" prop="post_timing_conf" v-if="execSpec.read.post.timing.base == 'd'">
          <el-select multiple  v-model="post_timing_conf" placeholder="请选择时间点" >
            <el-option v-for="item of timing_hours" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="选择时间点" prop="post_timing_conf" v-if="execSpec.read.post.timing.base == 'h'">
          <el-select multiple  multiple-limit="10" v-model="post_timing_conf"  placeholder="请选择时间点" >
            <el-option v-for="item of timing_minutes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-container>
      <el-container v-if="this.feature.flag === 'rw'" style="display: block">
        <el-divider content-position="center">写设置</el-divider>
          <el-form-item label="协议" prop="write_type">
            <el-select   v-model="execSpec.write.type"  placeholder="请选择协议" >
              <el-option v-for="item of rw_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item  label="协议脚本" prop="write_script" v-if="execSpec.write.type == 'lua'">
          <el-input type="textarea" v-model="execSpec.write.script" placeholder="请输入脚本内容"></el-input>
        </el-form-item>
        <el-container v-if="execSpec.write.type == 'serial' ">
          <el-container v-if=" feature_data_type == 'bool' || feature_data_type == 'enum' ">
            <el-form-item   v-for="item of feature_data_spec" :key="item">
              <span slot="lable">{{item.value}}-{{item.name}}</span>
              <span slot="prop">write_serial_{{item.value}}</span>
              <el-input  v-model="execSpec.write.serial[item.value]" placeholder="指令内容不能为空"></el-input>
            </el-form-item>
          </el-container>
          <el-form-item v-if="feature_data_type == 'int' || feature_data_type == 'float' || feature_data_type == 'double' || feature_data_type == 'text' || feature_data_type == 'date' || feature_data_type == 'array' || feature_data_type == 'struct'" label="指令内容" prop="write_serial">
            <el-input  v-model="execSpec.write.serial[0]" placeholder="指令内容不能为空"></el-input>
          </el-form-item>
        </el-container>
        <el-container v-if="execSpec.write.type == 'modbus'">
          <el-container v-if="feature_data_type == 'bool' || feature_data_type == 'enum' ">
            <!--<el-form-item   v-for="item of feature_data_spec" :key="item">
              <span slot="lable">{{item.value}}-{{item.name}}</span>
              <span slot="prop">write_serial_{{item.value}}</span>
              <el-input class="w_mudbus_val"  v-model="write_m_{{item.value}}_slave" ></el-input>
              <el-input class="w_mudbus_val"  v-model="write_m_{{item.value}}_func" ></el-input>
              <el-input class="w_mudbus_val"  v-model="write_m_{{item.value}}_address" ></el-input>
              <el-input  class="w_mudbus_val"  v-model="write_m_{{item.value}}_value" ></el-input>
              <el-input  class="w_mudbus_val"  v-model="execSpec.write.modbus[item.value].value" ></el-input>
              <el-container v-if="execSpec.write.modbus[item.value].func == '10' || execSpec.write.modbus[item.value].func == '0F'">
                <el-input  class="w_mudbus_val"  v-model="execSpec.write.modbus[item.value].quantity" ></el-input>
              </el-container>
              <a class="edit_order_btn" href="javascript:;" @click="openCmdModal(item.value)">编辑命令</a>
            </el-form-item>-->
          </el-container>
          <el-form-item  label="指令内容" v-if="feature_data_type == 'int' || feature_data_type == 'float' || feature_data_type == 'double' || feature_data_type == 'text' || feature_data_type == 'date' || feature_data_type == 'array' || feature_data_type == 'struct'" >
            <el-input class="w_mudbus_val"  v-model="execSpec.write.modbus['0'].slave" ></el-input>
            <el-input class="w_mudbus_val"  v-model="execSpec.write.modbus[0].func" ></el-input>
            <el-input class="w_mudbus_val"  v-model="execSpec.write.modbus[0].address" ></el-input>
            <el-input  class="w_mudbus_val"  v-model="execSpec.write.modbus[0].value" ></el-input>
            <el-container v-if="execSpec.write.modbus[0].func == '10' || execSpec.write.modbus[0].func == '0F'">
              <el-input  class="w_mudbus_val"  v-model="execSpec.write.modbus[0].quantity" ></el-input>
            </el-container>
            <a class="edit_order_btn" href="javascript:;" @click="openCmdModal(0)">编辑命令</a>
          </el-form-item>
        </el-container>
      </el-container>
      <el-container v-if="execSpecShow">
        <el-divider content-position="center">执行方式</el-divider>
        <el-form-item label="执行方式" prop="execSpec">
          <el-select  v-model="execSpecValue"   >
            <el-option :label="serial" :value="serial"></el-option>
            <el-option :label="none" :value="none"></el-option>
            <el-option :label="lua" :value="lua"></el-option>
          </el-select>
        </el-form-item>
      </el-container>
      <el-divider ></el-divider>
      <el-form-item style="margin-top: 20px">
        <el-button class="ok_btn" type="primary" @click.prevent="submitForm()" >确认</el-button>
        <el-button class="cancel_btn" @click="isVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <CmdModal ref="cmd_modal"></CmdModal>
</div>
</template>

<script>
  import execSpecOptsService from '../../../api/console/exec-spec-opts_api'
  import CmdModal from './cmd-modal/cmd-modal'
    export default {
        name: "exec-spec",
      data(){
          return{
            execSpecValue:'',
            feature: {},
            execSpec: {},
            isVisible : false,
            post_timing_conf : [],
            feature_data_type: '',
            feature_data_spec: '',
            m_cmd: '',
            execSpecShow:false,
            /*表单验证规则*/
            execFrom:{
              port:[
                { required: true, message: '请选择连接串口', trigger: 'blur' },
              ],
              baudrate:[
                { required: true, message: '请选择串口波特率', trigger: 'change' },
              ],
              databits:[
                { required: true, message: '请选择数据位', trigger: 'change' },
              ],
              stopbits:[
                { required: true, message: '请选择数据位', trigger: 'change' },
              ],
              parity:[
                { required: true, message: '请选择校验位', trigger: 'change' },
              ],
              read_type:[
                { required: true, message: '请选择协议', trigger: 'change' },
              ],
              read_serial:[
                { required: true, message: '指令内容不能为空', trigger: 'blur' },
              ],
              read_m_slave:[
                { required: true, message: '通讯地址不能为空', trigger: 'blur' },
                { min: 2,  message: '长度必须是2位', trigger: 'blur' }
              ],
              read_m_func:[
                { required: true, message: '功能码不能为空', trigger: 'change' },
              ],
              read_m_addr:[
                { required: true, message: '起始地址不能为空', trigger: 'blur' },
                { min: 4,  message: '长度必须是4位', trigger: 'blur' }
              ],
              read_m_count:[
                { required: true, message: '起始地址不能为空', trigger: 'blur' },
                { min: 4,  message: '长度必须是4位', trigger: 'blur' }
              ],
              read_script:[
                { required: true, message: '读设置的脚本内容不能为空', trigger: 'blur' },
              ],
              transform_type:[
                { required: true, message: '请选择协议转换类型', trigger: 'change' },
              ],
              transform_endian:[
                { required: true, message: '请选择大小端', trigger: 'change' },
              ],
              transform_start:[
                { required: true, message: '请输入转换起始字节', trigger: 'blur' },
              ],
              transform_count:[
                { required: true, message: '请输入字节数量', trigger: 'change' },
              ],
              transform_k:[
                { required: true, message: '请输入K系数', trigger: 'blur' },
              ],
              transform_p:[
                { required: true, message: '请输入p系数', trigger: 'blur' },
              ],
              transform_script:[
                { required: true, message: '转换的脚本内容不能为空', trigger: 'blur' },
              ],
              calculate_type:[
                { required: true, message: '请选择计算类型', trigger: 'change' },
              ],
              calculate_script:[
                { required: true, message: '计算的脚本内容不能为空', trigger: 'blur' },
              ],
              calibrate_type:[
                { required: true, message: '请选择校准类型', trigger: 'change' },
              ],
              calibrate_script:[
                { required: true, message: '请选择上报类型', trigger: 'blur' },
              ],
              post_interval:[
                { required: true, message: '请选择间隔时间', trigger: 'change' },
              ],
              post_timing_base:[
                { required: true, message: '请选择时间类型', trigger: 'change' },
              ],
              post_timing_conf:[
                { required: true, message: '请选择时间点', trigger: 'change' },
              ],
              write_type:[
                { required: true, message: '请选择协议', trigger: 'change' },
              ],
              write_script:[
                { required: true, message: '写设置的脚本内容不能为空', trigger: 'blur' },
              ],
              write_serial_:[
                { required: true, message: '指令内容不能为空', trigger: 'blur' },
              ],
              write_script:[
                { required: true, message: '指令内容不能为空', trigger: 'blur' },
              ],
        },
            // 波特率
            baud_rate_opts : [
              { value: 115200, name: '115200' },
              { value: 38400, name: '38400' },
              { value: 19200, name: '19200' },
              { value: 9600, name: '9600' },
              { value: 4800, name: '4800' },
              { value: 2400, name: '2400' },
              { value: 1200, name: '1200'},
              { value: 400, name: '400' },
              { value: 300, name: '300' }
            ],
            // 数据位
            data_bit_opts : [
              { value: 8, name: '8' },
              { value: 7, name: '7' },
              { value: 6, name: '6' }
            ],
            // 停止位
            stop_bit_opts : [
              { value: 1, name: '1'},
              { value: 2, name: '2'}
            ],

          // 校验位
          parity_bit_opts : [
            { value: 'N', name: 'None' },
            { value: 'E', name: 'Even' },
            { value: 'O', name: 'Odd' }
          ],
        // 传感器类型 将不用
        seneor_type : [
          { value: 1, name: '4-20mA' },
          { value: 2, name: '0-10v' }
        ],

        // 读写协议类型
        rw_type : [
          { value: 'none', name: 'none' },
          { value: 'serial', name: 'serial' },
          { value: 'modbus', name: 'modbus' },
          { value: 'lua', name: 'lua' },
        ],

        // 计算、校准类型
        calculate_calibrate_type : [
          { value: 'none', name: 'none' },
          { value: 'expr', name: 'expression' },
          { value: 'lua', name: 'lua' },
        ],

        // 原始数据转换类型
        transform_type : [
          { value: 'none', name: 'none'},
          { value: 'int8', name: 'int8'},
          { value: 'uint8', name: 'uint8'},
          { value: 'int16', name: 'int16'},
          { value: 'uint16', name: 'uint16'},
          { value: 'int32', name: 'int32'},
          { value: 'uint32', name: 'uint32'},
          { value: 'float', name: 'float'},
          { value: 'BCD', name: 'BCD'},
          { value: 'lua', name: 'lua'},
        ],
        // 大小端
        transform_endian : [
          {value: 'big', name: '大端'},
          {value: 'little', name: '小端'},
        ],
            // 转换字节数量
            transform_count : [
              {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5},
            ],
            // modbus功能码,读类型
            modbus_r_cmd_type : [
              { value: '01', name: '01'},
              { value: '02', name: '02'},
              { value: '03', name: '03'},
              { value: '04', name: '04'},
            ],
            // 上报类型
            post_type : [
              { value: 'none', name: 'none' },
              { value: 'interval', name: '间隔' },
              { value: 'timing', name: '定点' },
            ],
            // 间隔上报选项
            interval_opts : [
              { value: '1s', name: '1秒' },
              { value: '5s', name: '5秒' },
              { value: '10s', name: '10秒' },
              { value: '15s', name: '15秒' },
              { value: '20s', name: '20秒' },
              { value: '30s', name: '30秒' },
              { value: '1m', name: '1分钟' },
              { value: '5m', name: '5分钟' },
              { value: '10m', name: '10分钟' },
              { value: '15m', name: '15分钟' },
              { value: '20m', name: '20分钟' },
              { value: '30m', name: '30分钟' },
              { value: '1h', name: '1个小时' },
            ],

        // 定点上报，按天
        timing_hours : [
          { value: '01:00:00', name: '1点'},
          { value: '02:00:00', name: '2点'},
          { value: '03:00:00', name: '3点'},
          { value: '04:00:00', name: '4点'},
          { value: '05:00:00', name: '5点'},
          { value: '06:00:00', name: '6点'},
          { value: '07:00:00', name: '7点'},
          { value: '08:00:00', name: '8点'},
          { value: '09:00:00', name: '9点'},
          { value: '10:00:00', name: '10点'},
          { value: '11:00:00', name: '11点'},
          { value: '12:00:00', name: '12点'},
          { value: '13:00:00', name: '13点'},
          { value: '14:00:00', name: '14点'},
          { value: '15:00:00', name: '15点'},
          { value: '16:00:00', name: '16点'},
          { value: '17:00:00', name: '17点'},
          { value: '18:00:00', name: '18点'},
          { value: '19:00:00', name: '19点'},
          { value: '20:00:00', name: '20点'},
          { value: '21:00:00', name: '21点'},
          { value: '22:00:00', name: '22点'},
          { value: '23:00:00', name: '23点'},
          { value: '24:00:00', name: '24点'},
        ],

        timing_base_type : [
          { value: 'd', name: '每天' },
          { value: 'h', name: '每小时' },
        ],
            timing_minutes : [],   // 定点上报，按小时
        }
      },
      methods:{
        openModal(f,execValue){
          this.execSpecValue = execValue;
          let execSpec;
          if(f.exec_spec !== '' && f.exec_spec !==null){
            execSpec =JSON.parse(f.exec_spec);
          }else{
            execSpecOptsService.getDefaultExecSpec();
          }
          const write = execSpec.write;
          if(f.data_type === 'bool' || f.data_type === 'enum'){
            const obj = JSON.parse(f.data_spec);
            if (write.type !== 'serial' || write.type === null || write.serial === '') {
              write.type ={};
            }
            if (write.type !== 'modbus' || write.modbus === null || write.modbus === '') {
              write.modbus = {};
            }
            obj.forEach((item,index) =>{
              if (write.type !== 'serial' || write.serial === null || write.serial === '') {
                write.serial[item.value] = '';
              }
              if (write.type !== 'modbus' || write.modbus === null || write.modbus === '') {
                write.modbus[item.value] = new Wmodbus();
              }
            })
          }else{
            if ( write.serial === null || write.serial === '') {
              write.serial = { 0: '' };
            }
            if ( write.modbus === null || write.modbus === '') {
              write.modbus = { 0: new Wmodbus() };
            }
          }
          this.showModal(f, execSpec);
        },
        showModal(feature,execSpec){
          this.feature = feature;
          this.feature.type = feature.type;
          this.feature_data_spec = JSON.parse(feature.data_spec);
          if (execSpec) {
            this.execSpec = execSpec;
          }
          console.log(this.execSpec)
          this.isVisible = true
        },
        openCmdModal(key) {
          this.$refs.cmd_modal.showModal(this.feature.id, this.execSpec.write.modbus, key);
          //this.mudbusModal.showModal(this.feature.id, this.execSpec.write.modbus, key);
        },
        submitForm(){
          // 提交前删除用不到的字段
          const write = this.execSpec.write;
          const obj = write[write.type];
          delete write['script'];
          if (write.type !== 'none') {
            write[write.type] = obj;
          }
          console.log('提交的exec_spec=', this.execSpec);
          let emitObj = {
            execSpec: this.execSpec,
            execType: this.execSpecValue
          };
          this.isVisible = false;
         // this.onSubmitForm.emit(emitObj);
        }
      },
      components:{
        CmdModal
      }
    }
</script>

<style scoped lang="scss">
  .ok_btn, .cancel_btn{
    margin-right: 10px;
  }
  .num_input{
    width: 326px;
  }
  .write_cmd_lable{
    color: #4d4d4d !important;
  }
  .edit_order_btn{
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
  }
</style>
