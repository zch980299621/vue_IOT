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
          在线调试
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <div class="d_title clearfix">
        <div class="fa-pull-left">
          <span style="margin-right: 10px">实时日志:</span>
          <el-select style="width: 300px;" v-model="selectedDevice" @change="selectedDevice=$event; mqttSwitch()" placeholder="请选择设备">
            <el-option v-for="item of devices" :key="item.id"  :label="item.id" :value="item.name"></el-option>
          </el-select>
        </div>
        <div class="fa-pull-right" style="line-height: 30px;margin-left: 15px;">
          <el-button type="primary" @click="onlineLog = ''">清屏</el-button>
        </div>
        <div class="fa-pull-right" >
          <el-checkbox   style="margin-top: 4px;" v-model="isMonitor" @change="isMonitor=$event;isMonitorFn()">是否监听上报</el-checkbox>
        </div>
        <div v-if="isSelectDevice" class="fa-pull-right" style="margin-right: 20px;line-height: 30px;">
          <i :class="{'onLine':status ,'offLine':!status}"></i>
          <span>{{status? '设备已上线' :'检测到设备已离线'}}</span>
        </div>
      </div>
      <el-input  type="textarea"  v-model="onlineLog" readonly  style="margin-top:10px;border-radius: 0;font-size: 15px"></el-input>
      <div class="d_title clearfix" style="margin-top: 15px">
        <div class="fa-pull-left">
          <span style="margin-right: 10px">选择功能:</span>
          <el-select style="width: 150px;" placeholder="请选择属性/服务" v-model="selectedEvent" @change="selectedEvent=$event;selectedEventFn()">
            <el-option v-for="item of eventArr" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
          <el-select style="width: 150px;margin-left: 20px" placeholder="请选择操作" v-model="selectedOption" >
            <el-option v-for="item of data_spec" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button style="margin-left: 20px" type="primary" @click="implement()">执行</el-button>
        </div>
      </div>
      <el-input type="textarea" v-model="optionLog" readonly style="margin-top:10px;border-radius: 0"></el-input>
    </div>
  </div>
</template>

<script>
  import {getList,getEventAndService} from "../../../../api/console/devices_api";
  import {mqttAuth,getDeviceStatus} from '../../../../api/console/device-detail'
  import SettingsService from '../../../../api/console/setting_api'
  export default {
        name: "debug",
      data(){
        return {
         isSelectDevice : false,
          status : false,
          selectedDevice: '',
          onlineLog : '',
          product_id: '',
          devices : [],
          client : null,
          in_timeout : true,
          messageId: {},
          timeout: {},
          reconnectTimeout : 2000,
          username: '',
          password: '',
          isMonitor : true,
          device_id: '',
          time: {},
          PK: '',
          DN: '',
          eventArr : [],
          selectedEvent: '',
          data_spec: {},
          selectedOption: {},
          optionLog : '',
        }
      },
      methods:{
        getList(){
          let params = {
            product_id: this.product_id,
            currentPage: 1,
            pageSize: 8,
            search: ''
          };
          getList(params).then(res =>{
            this.devices = res.data.data.items;
          })
        },
        /*是否监听*/
        isMonitorFn(){
          if (this.isMonitor) {
            this.client.subscribe(`/sys/${this.PK}/${this.DN}/#`);
          } else {
            this.client.unsubscribe(`/sys/${this.PK}/${this.DN}/#`);
          }
        },
        mqttSwitch(){
          this.isSelectDevice = true;
          this.onlineLog = '';
          this.optionLog ='';
           this.disconnect();
           this.devices.forEach((v,k) =>{
             if(this.selectedDevice === v.id){
                this.time=Math.round(new Date().toString());
              this.username = `${v.name}|${v.product_id}`;
               this.device_id = v.id;
               this.PK = v.product_id;
               this.DN = v.name;
               let devParams ={
                 _url: "/api/products/" + this.product_id + "/devices/"+this.device_id + "/mqtt-auth" ,
                 _obj: {
                   appKey: v.name,
                   orgKey: v.product_id,
                   deviceSecret: v.secret,
                   time:this.time
                 }
               };
               mqttAuth(devParams).then(res =>{
                 this.password = res.data.data.auth;
                 this.MQTTconnect();
               });
               let arr = [{
                 product_id : this.product_id,
                 device_id : v.id
               }];
               getDeviceStatus(arr).then(resData =>{
                 if(resData.data.data[0].status === 'online'){
                   this.status =true;
                 }else{
                   this.status = false;
                 }
               },err=>{
                 v.status = false;
               })
             }
           });
          let devStat ={
            _url: "/api/products/" + this.product_id + "/devices/"+this.selectedDevice + "/features" ,
            _obj: {
              type: 1
            }
          };
          getEventAndService(devStat).then(res =>{
            let arr = res.data.data;
            this.eventArr =[];
            arr.forEach((v,k) =>{
              if (v.flag === 'rw') {
                this.eventArr.push(v);
              }
            })
          })
        },
        selectedEventFn(){
          if (!this.selectedDevice) {
            this._message.create('info', '请选择设备');
            return false;
          }
          this.eventArr.forEach((v,k) =>{
            if(this.selectedEvent === v.code){
              v.data_spec =JSON.parse(v.data_spec);
              let arr =[];
              for(let i in v.data_spec){
                let obj = {
                  label : '',
                  value : ''
                }
                obj.value = i;
                obj.lable = v.data_spec[i];
                arr.push(obj);
              }
              this.data_spec =arr;
            }
          })
        },
        implement(){
          let params = {};
          params[this.selectedEvent] = +this.selectedOption;
          let m={
            Id:  Math.round(new Date() / 1000).toString(),
            Params: params,
            Version: '0.3',
            Method: 'control',
          }
          const message = new Paho.MQTT.Message(JSON.stringify(m));
          message.destinationName = `/sys/${this.PK}/${this.DN}/thing/service/property/set`;
          message.qos = 0;
          // console.log('onSwitch message: ', message);
          this.client.send(message);
        },
        MQTTconnect() {
          const clientId = `${this.device_id}|securemode=3,signmethod=hmacsha1,timestamp=${this.time}|`;
          // Create a client instance
          this.client = new Paho.MQTT.Client(SettingsService.mqtt().host, clientId);
          // 当客户端失去连接时调用
          this.client.onConnectionLost = this.onConnectionLost;
          // 当消息到达时调用
          this.client.onMessageArrived = this.onMessageArrived;

          // 连接客户端
          this.client.connect({
            userName: this.username,
            password: this.password,
            onSuccess: this.onSuccess,
            onFailure: this.onFailure
          });
        },
        onSuccess() {
          // 连接完成后，进行订阅或者发送消息。
          console.warn('Connected');
          this.client.subscribe(`/sys/${this.PK}/${this.DN}/#`);
        },
        onFailure(result) {
          console.warn('连接 失败: ' + result.errorMessage);
          this.Reconnection();
        },
        onMessageArrived(message){
          this.onlineLog += message.payloadString + '\n';
          if (message.destinationName === `/sys/${this.PK}/${this.DN}/thing/service/property/set_reply`) {
            // console.log(message.payloadString);
            this.optionLog += message.payloadString + '\n';
          }
        },
        onConnectionLost(responseObject) {
          if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
            this.Reconnection();
          }
        },
        Reconnection() {
          console.log('正在重新连接...');
          if (this.in_timeout) {
            console.log('正在重新连接...');
            this.messageId = this._message.loading('正在重新连接...', {nzDuration: 0}).messageId;
            this.timeout = setTimeout(() => {
              clearTimeout(this.timeout);
              this._message.remove(this.messageId);
              this.MQTTconnect();
            }, this.reconnectTimeout);

          }
        },
        disconnect(){
          this.in_timeout =false;
          if(this.client && this.client.isConnected()){
            console.log('client：', this.client);
            this.client.disconnect();
            console.log('UNLOAD：', new Date());
          }
        }
      },
      created() {
        /*通过路由获取产品id*/
        this.product_id = this.$route.params.id;
        this.getList()
      },
    destroyed(){
        this.disconnect()
    }
    }
</script>

<style scoped lang="scss">
  .d_title{
    padding: 12px 16px;
    background: #f9f9f9;
    > span{
      font-size: 14px;
      font-weight: bolder;
      color: #000000;
      margin-right: 10px;
    }
  }
  .offLine{
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: red;
    display: inline-block;
    margin-right: 5px;
  }
  .onLine{
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    background: green;
  }
</style>
