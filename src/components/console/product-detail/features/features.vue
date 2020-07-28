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
          功能定义
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template><i class="anticon anticon-right"></i></template>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-7 clearfix">
          <el-button class="mb-3" type="primary" style="float: left" @click="showModal('add')" ><i class="el-icon-plus"></i>新建</el-button>
        <el-button-group class="ml-3">
          <el-button class="mb-3" type="type == 0 ? 'primary':'default'" @click="selectType(0)">全部</el-button>
          <el-button class="mb-3" type="type == 1 ? 'primary':'default'" @click="selectType(1)">属性</el-button>
          <el-button class="mb-3" type="type == 2 ? 'primary':'default'" @click="selectType(2)">服务</el-button>
          <el-button class="mb-3" type="type == 3 ? 'primary':'default'" @click="selectType(3)">事件</el-button>
          <el-button class="mb-3" type="type == 4 ? 'primary':'default'" @click="selectType(4)">摄像头</el-button>
        </el-button-group>
          <el-button @click="middleWarePush()" type="primary" style="float: right">下发更新</el-button>
        </div>
        <div class="col-lg-4">
          <el-input  class="mb-3"  type="text" autosize  placeholder="输入名称搜索" v-model="search" @keyup.enter="onSearch()">
            <el-button slot="append" icon="el-icon-search" @click="onSearch()"></el-button>
          </el-input>
        </div>
      </div>

      <div class="mb-3">
        <el-table :data="features" style="width: 100%">
          <el-table-column label="图标"  >
              <template slot-scope="scope">
                <div v-if="scope.row.icon">
                  <el-image :src="scope.row.icon" class="icon" @click="showIconModal(scope.row.product_id,scope.row.id,scope.row.icon)"></el-image>
                </div>
                <el-tag v-if="!scope.row.icon" @click="showIconModal(scope.row.product_id,scope.row.id,scope.row.icon)">设置图标</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="名称" >
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="标识符" >
            <template slot-scope="scope">
              <span>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" >
            <template slot-scope="scope">
              <el-container v-if="scope.row.type == 1"><span class="text-success">属性</span></el-container>
              <el-container v-if="scope.row.type == 2"><span class="text-warning">服务</span></el-container>
              <el-container v-if="scope.row.type == 3"><span class="text-info">事件</span></el-container>
              <el-container v-if="scope.row.type == 4"><span class="text-muted">摄像头</span></el-container>
            </template>
          </el-table-column>
          <el-table-column label="flag类型" >
            <template slot-scope="scope">
              <!--属性-->
              <el-container v-if="scope.row.flag == 'r'"><span class="text-success">只读</span></el-container>
              <el-container v-if="scope.row.flag == 'rw'"><span class="text-warning">读写</span></el-container>

              <!--事件-->
              <el-container v-if="scope.row.flag == 'info'"><span class="text-info">信息</span></el-container>
              <el-container v-if="scope.row.flag == 'debug'"><span class="text-secondary">调试</span></el-container>
              <el-container v-if="scope.row.flag == 'alter'"><span class="text-warning">告警</span></el-container>
              <el-container v-if="scope.row.flag == 'error'"><span class="text-danger">故障</span></el-container>

              <!--服务-->
              <el-container v-if="scope.row.flag == 'sync'"><span class="text-primary">同步</span></el-container>
              <el-container v-if="scope.row.flag == 'async'"><span class="text-info">异步</span></el-container>
            </template>
          </el-table-column>
          <el-table-column label="数据类型" >
            <template slot-scope="scope">
              <el-container v-if="scope.row.type ==1"><span>{{scope.row.type}}</span></el-container>
              <el-container v-if="scope.row.type !=1">-</el-container>
            </template>
          </el-table-column>
          <el-table-column label="数据定义" >
            <template slot-scope="scope">
              <el-container v-if="scope.row.type ==1">
                <!--待定-->
                <div style="width: 300px"><p ></p></div>
              </el-container>
              <el-container v-if="scope.row.type !=1">-</el-container>
            </template>
          </el-table-column>
          <el-table-column label="执行方式" >
            <template slot-scope="scope">
              <span>{{scope.row.exec_type || "-"}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" class="float-left" >
            <template slot-scope="scope">
              <el-button type="text" @click="showModal('update',scope.row.id)">编辑</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button  @click="showDeleteConfirm(scope.row.id,scope.row.name)" type="text"  class="text-danger">删除</el-button>
              <el-container v-if="scope.row.type ==1 || scope.row.type == 4" >
                <el-container v-if="scope.row.exec_type == 'serial' ||scope.row.exec_type == 'camera1'||scope.row.exec_type == 'camera2' ||scope.row.exec_type == 'lua'  ">
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text" @click="openSettingModal(scope.row.id,scope.row.exec_type)" >开发设置</el-button>
                </el-container>
              </el-container>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :visible.sync="isVisible"  width="30%" title="新建功能">
      <span slot="title" >
        <span v-if="modalType=='add'">新建功能</span>
        <span v-if="modalType=='update'">编辑功能</span>
      </span>
      <el-form :model="feature" label-width="100px">
        <!--type-->
        <el-form-item  label="功能类型"  prop="type" v-model="feature.type">
          <el-container v-if="modalType == 'add'">
            <el-radio-group v-model="feature.type" @change="typeChange()" >
              <el-radio-button :label="1" >属性</el-radio-button>
              <el-radio-button :label="2" >服务</el-radio-button>
              <el-radio-button :label="3" >事件</el-radio-button>
              <el-radio-button :label="4" >摄像头</el-radio-button>
            </el-radio-group>
          </el-container>
          <el-container v-if="modalType == 'update'">
              <el-container v-if="feature.type ==1"><span>属性</span></el-container>
              <el-container v-if="feature.type ==2"><span>服务</span></el-container>
              <el-container v-if="feature.type ==3"><span>事件</span></el-container>
              <el-container v-if="feature.type ==4"><span>摄像头</span></el-container>
          </el-container>
        </el-form-item>
        <!--identifier-->
        <el-form-item label="标识符" prop="code">
          <el-input v-model="feature.code" placeholder="请输入标识符"></el-input>
        </el-form-item>
        <!--名称-->
        <el-form-item label="名称" prop="name">
          <el-input v-model="feature.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <!--功能类型 =4=‘摄像头’时-->
        <el-container v-if="feature.type ===4" style="display: block;">
          <!--rtmp地址-->
          <el-form-item label="rtmp地址" prop="rtmp_addr">
            <el-input v-model="dataSpec.rtmp_addr"></el-input>
          </el-form-item>
          <!--hls地址-->
          <el-form-item label="hls地址" prop="hls_addr">
            <el-input v-model="dataSpec.hls_addr"></el-input>
          </el-form-item>
          <!--数据来源-->
          <el-form-item label="数据来源" prop="exec_type">
            <el-select v-model="feature.exec_type" placeholder="请选择" style="float: left">
              <el-option v-for="data of camera_exec_type_list" :key="data" :value="data"  :label="data"></el-option>
            </el-select>
          </el-form-item>
        </el-container>
        <!--功能类型 =1=‘属性’时-->
        <el-container v-if="feature.type ===1" style="display: block;">
          <el-form-item label="执行方式" prop="exec_type">
            <el-select v-model="feature.exec_type" placeholder="请选择" style="float: left">
              <el-option v-for="data of attribute_exec_type_list" :key="data" v-bind:value="data" >{{data}}</el-option>
            </el-select>
          </el-form-item>

          <!--读写类型-->
          <el-form-item label="读写类型" prop="flag">
            <el-radio-group v-model="feature.flag"  style="float: left">
              <el-radio-button label="只读" value="'r'"></el-radio-button>
              <el-radio-button label="只写" value="'rw'"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <!--数据类型-->
          <el-form-item label="数据类型" prop="data_type">
            <el-select v-model="feature.data_type" placeholder="请选择" style="float: left">
              <el-option v-for="item of dataTypes"  :key="item.id" v-bind:value="item.code" >{{item.code + '-' +item.name}}</el-option>
            </el-select>
          </el-form-item>

          <!--数值值域-->
          <el-container v-if="feature.type ===1 && type_inspect(feature.data_type,['int', 'float', 'double'])" style="display: block;">
            <!--最大最小值-->
            <el-form-item label="值域">
              <el-col :span="11">
                <el-input v-model="dataSpec.min" prop="min" placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input v-model="dataSpec.max" prop="max" placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <!--单位-->
            <el-form-item label="单位" prop="unit">
              <el-input v-model="dataSpec.unit" placeholder="请输入单位"></el-input>
            </el-form-item>
            <!--单位名称-->
            <el-form-item label="单位名称" prop="unit_name">
              <el-input v-model="dataSpec.unit_name" placeholder="请输入单位名称"></el-input>
            </el-form-item>
          </el-container>

          <!--枚举值-->
          <el-container v-if="feature.type ===1 && feature.data_type === 'enum'" >
            <el-form-item label="枚举项">
              <el-container v-if="dataSpecList.length <1">
                <el-alert title="最少添加一项"></el-alert>
              </el-container>
              <el-col :span="11">参数值</el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">参数描述</el-col>
              <el-container v-for="item of dataSpecList" :key="item">
                <el-col :span="11">
                  <el-input type="number" v-model="item.value" placeholder="编号，如:'0'" min="0" step="1"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model="item.name"  placeholder="编号的描述"></el-input>
                </el-col>
                <el-button size="small" type="primary" @click="deleteEnum(i)" class="text-center" round><i class="el-icon-close"></i></el-button>
              </el-container>
              <el-button size="small"  @click="addEnum()"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
          </el-container>

          <!--布尔值-->
          <el-container v-if="feature.type ===1 && feature.data_type === 'bool'">
            <el-form-item label="布尔值">
              <el-container v-for="item of dataSpecList" :key="item">
              {{item.value}}<span class="text-center">-</span>
                <el-input v-model="item.name"  placeholder="如：item.value == 0 ? '关' : '开'"></el-input>
              </el-container>
            </el-form-item>
          </el-container>

          <!--string-->
          <el-container v-if="feature.type ===1 && feature.data_type ==='text'">
            <el-form-item label="字节长度">
              <el-input placeholder="请输入字节长度" v-model="dataSpec.length">
                <template slot="append">字节</template>
              </el-input>
            </el-form-item>
          </el-container>
          <!--Date-->
          <el-container v-if="feature.type ===1 && feature.data_type ==='date'">
            <el-form-item label="时间格式">
              <span>String类型的UTC时间戳(毫秒)</span>
            </el-form-item>
          </el-container>
          <!--ARRAY-->
          <el-container v-if="feature.type ===1 && feature.data_type ==='array'">
            <el-form-item label="数组元素类型" prop="type">
              <el-radio-group v-model="dataSpec.item_type">
                <el-radio  v-for="item of array_element_types" :key="item" value="item">{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-container>
          <!--STRUCT-->
          <el-container v-if="feature.type ===1 && feature.data_type ==='struct'">
            <el-form-item label="JSON对象" prop="type">
              <el-container v-if="dataSpecList.length <1" style="display: block">
                <el-alert title="最少添加一项" type="warning"></el-alert>
              </el-container>
              <ul class="list-group">
                <el-container v-for="item of dataSpecList" :key="item.id">
                  <li class="list-group-item">
                    <div class="row">
                      <div class="col-sm-8">
                        <h6>{{item.name}}<small class="text-secondary">{{item.data_type}}</small></h6>
                      </div>
                      <div class="col-sm-4">
                        <div class="text-right">
                          <el-button type="primary" size="small"  icon="el-icon-edit" round @click="showDataSpecsModal(feature.type, 'update', 'data_spec', $event, item, i)"></el-button>
                          <el-button type="danger" size="small"  class="ml-2" round icon="el-icon-close" @click="deleteDataSpecs(i, $event)"></el-button>
                        </div>
                      </div>
                    </div>
                  </li>
                </el-container>
              </ul>
              <el-button size="small" icon="el-icon-plus" @click="showDataSpecsModal(feature.type, 'add', 'data_spec', $event)"></el-button>
            </el-form-item>
          </el-container>
        </el-container>
        <!--功能类型 =2=‘服务’时-->
        <el-container v-if="feature.type ===2" style="display: block;">
          <!--执行方式-->
          <el-form-item label="执行方式" prop="exec_type">
            <el-select v-model="feature.exec_type" placeholder="请选择" style="float: left">
              <el-option v-for="item of service_exec_type_list" :key="item" :value="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
          <!--调用类型-->
          <el-form-item label="调用类型" prop="flag">
            <el-radio-group v-model="feature.flag"  style="float: left">
              <el-radio-button label="同步" value="'sync'"></el-radio-button>
              <el-radio-button label="异步" value="'async'"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!--输入参数-->
          <el-form-item label="输入参数" >
            <el-container v-if="argsSpecList.length <1">
              <el-alert type="warning" title="最少添加一项"></el-alert>
            </el-container>
            <ul class="list-group">
              <el-container v-for="item of argsSpecList" :key="item.id">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-sm-8">
                      <h6>{{item.name}}<small class="text-secondary">{{item.data_type}}</small></h6>
                    </div>
                    <div class="col-sm-4">
                      <div class="text-right">
                        <el-button type="primary" size="small"  icon="el-icon-edit" round @click="showDataSpecsModal(feature.type, 'update', 'args_spec', $event, item, i)"></el-button>
                        <el-button type="danger" size="small"  class="ml-2" round icon="el-icon-close" @click="deleteDataSpecs(i, $event)"></el-button>
                      </div>
                    </div>
                  </div>
                </li>
              </el-container>
            </ul>
            <el-button size="small" icon="el-icon-plus" @click="showDataSpecsModal(feature.type, 'add', 'args_spec', $event)"></el-button>
          </el-form-item>
          <!--输出参数-->
          <el-form-item label="输出参数" >
            <el-container v-if="dataSpecList.length <1">
              <el-alert type="warning" title="最少添加一项"></el-alert>
            </el-container>
            <ul class="list-group">
              <el-container v-for="item of dataSpecList" :key="item.id">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-sm-8">
                      <h6>{{item.name}}<small class="text-secondary">{{item.data_type}}</small></h6>
                    </div>
                    <div class="col-sm-4">
                      <div class="text-right">
                        <el-button type="primary" size="small"  icon="el-icon-edit" round @click="showDataSpecsModal(feature.type, 'update', 'data_spec', $event, item, i)"></el-button>
                        <el-button type="danger" size="small"  class="ml-2" round icon="el-icon-close" @click="deleteDataSpecs(i, $event)"></el-button>
                      </div>
                    </div>
                  </div>
                </li>
              </el-container>
            </ul>
            <el-button size="small" icon="el-icon-plus" @click="showDataSpecsModal(feature.type, 'add', 'data_spec', $event)"></el-button>
          </el-form-item>
        </el-container>
        <!--功能类型 =3=‘事件’时-->
        <el-container v-if="feature.type ===3" style="display: block;">
          <!--事件类型-->
          <el-form-item label="事件类型" prop="flag">
            <el-radio-group v-model="feature.flag"  style="float: left">
              <el-radio-button label="调用" value="'debug'"></el-radio-button>
              <el-radio-button label="信息" value="'info'"></el-radio-button>
              <el-radio-button label="告警" value="'alert'"></el-radio-button>
              <el-radio-button label="故障" value="'error'"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!--输出参数-->
          <el-form-item label="输出参数" >
            <el-container v-if="dataSpecList.length <1">
              <el-alert type="warning" title="最少添加一项"></el-alert>
            </el-container>
            <ul class="list-group">
              <el-container v-for="item of dataSpecList" :key="item.id">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-sm-8">
                      <h6>{{item.name}}<small class="text-secondary">{{item.data_type}}</small></h6>
                    </div>
                    <div class="col-sm-4">
                      <div class="text-right">
                        <el-button type="primary" size="small"  icon="el-icon-edit" round @click="showDataSpecsModal(feature.type, 'update', 'data_spec', $event, item, i)"></el-button>
                        <el-button type="danger" size="small"  class="ml-2" round icon="el-icon-close" @click="deleteDataSpecs(i, $event)"></el-button>
                      </div>
                    </div>
                  </div>
                </li>
              </el-container>
            </ul>
            <el-button size="small" icon="el-icon-plus" @click="showDataSpecsModal(feature.type, 'add', 'data_spec', $event)"></el-button>
          </el-form-item>
        </el-container>

        <!--描述-->
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="feature.desc" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 20px">
          <el-button class="text-right" type="primary" @click.prevent="submitForm()" >确认</el-button>
          <el-button class="ml-2" @click="isVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getFeatures,getFeature,deleteFeature,middleWarePushModel,middleWarePushConfig} from '../../../../api/console/feature.js'
  import ExecSpec from '../../../shared/exec-spec/exec-spec'
  import DataTypeService  from '../../../../api/console/data_type_api'
    export default {
        name: "features",
        data(){
          return{
            dataTypeChangeIndex:0,
            type :0,
            search: '',
            product_id: '',
            feature_id :'',
            feature:{},
            dataSpec:{},
            dataSpecList:[],
            argsSpecList:[],
            features:[],
            //创建修改模态
            isVisible :false,
            isOkLoading:false,
            modalType : 'add',
            dataSpecsModalType : 'add',
            parameter_type : 'data_spec',
            dataSpecsIndex : 0,
            attribute_exec_type_list : [
              'none', 'serial', 'lua'
            ],
            service_exec_type_list : [
              'none', 'serial', 'lua', 'shell'
            ],
            camera_exec_type_list : [
              'camera1', 'camera2'
            ],
            dataTypes: DataTypeService.dataTypes,
            array_element_types:DataTypeService.array_element_types,
          }
        },
      methods:{
        type_inspect(type, types) {
          if (types.indexOf(type) !== -1) {
            return true;
          }
          return false;
        },
        typeChange(){
            if (this.modalType === 'add') {
              this.dataSpec = {}
              this.dataSpecList = [];
              this.data_init()
            }
        },
        selectType(type){
          this.type = type;
          this.getFeatures()
        },
        //获取属性列表
        getFeatures(){
          let feaParams ={
            _url: "/api/products/" + this.product_id + "/features" ,
            _obj: {
              type: this.type,
              search: this.search
            }
          };
          getFeatures(feaParams).then(res =>{
            this.features = res.data.data
          })
        },
        onSearch(){
          this.type =0;
          this.getFeatures()
        },
        /*开发图片模态框*/
        showIconModal(product_id,feature_id,dara_icon){
          this.feature_id = feature_id;
          /*！！！调取feature_icon子组件*/
        },
        data_init() {
          switch (Number(this.feature.type)) {
            case 1:
              this.feature.flag = 'r';
              this.feature.exec_type = 'none';
              this.feature.data_type = 'int';

              this.dataSpec.rtmp_addr = undefined;
              this.dataSpec.hls_addr = undefined;
              break;
            case 2:
              this.dataSpec.rtmp_addr = undefined;
              this.dataSpec.hls_addr = undefined;
              this.feature.exec_type = 'none';
              this.feature.data_type = undefined;
              this.feature.flag = 'sync';
              break;
            case 3:
              this.dataSpec.rtmp_addr = undefined;
              this.dataSpec.hls_addr = undefined;
              this.feature.exec_type = undefined;
              this.feature.data_type = undefined;
              this.feature.flag = 'debug';
              break;
            case 4:
              this.feature.exec_type = 'camera1';
              this.feature.data_type = undefined;
              this.feature.flag = undefined;
              this.dataSpec.rtmp_addr = 'rtmp://';
              this.dataSpec.hls_addr = 'http://';
              break;
            default:
          }
        },
        /*打开模态框*/
        showModal(type,feature_id){
          this.modalType = type;
          if(type === 'add'){
            this.feature.flag = 'r';
            this.feature.exec_type ='none';
            this.feature.data_type = 'int';
            this.dataTypeChangeIndex =0;
            this.isVisible = true;
          }else if((typeof(feature_id)!= "undefined") && type === 'update') {
            let feaParams = {
              _url: "/api/products/" + this.product_id + "/features/" + feature_id,
            }
            getFeature(feaParams).then(res =>{
              this.feature = res.data.data;
              console.log(this.feature)
              if(this.feature.type ===1){
                this.dataSpecList = JSON.parse(this.feature.data_spec)
              }else if(this.feature.type ===2){
                this.dataSpecList = JSON.parse(this.feature.data_spec);
                this.argsSpecList = JSON.parse(this.feature.args_spec)
              }else if(this.feature.type === 3){
                this.dataSpecList = JSON.parse(this.feature.data_spec);
              }else if(this.feature.type =4){
                this.dataSpec = JSON.parse(this.feature.data_spec)
              }
              this.dataTypeChangeIndex =0;
              this.isVisible = true;
            })
          }
        },
        showDeleteConfirm(id,name){
          this.$confirm('<p>删除后可在回收站进行恢复或者彻底删除</p>','确定要删除功能吗',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString:true,
            type:'info',
          }).then(() =>{
            let delParams = {
              _url: "/api/products/" + this.product_id + "/features/" + id + "/deleted",
              _body: {}
            }
            deleteFeature(delParams).then(res =>{
              this.features = this.features.filter(d => d.id !== id);
            })
          })
        },
        /*打开开发设置模态框，1：属性，4：摄像头*/
        openSettingModal(feature_id,exec_type){
          this.feature_id = feature_id;
          let feaParams = {
            _url: "/api/products/" + this.product_id + "/features/" + feature_id,
          }
          getFeature(feaParams).then(res =>{
            const f = res.data.data;
            switch (exec_type) {
              case 'serial':{
                ExecSpec.openModal(f);
                break;
              }
              case 'lua': {
                break;
              }
              case 'camera1':
              case 'camera2': {
                // this.cameraSettings = f.exec_spec;
                //this.devSettingCamera.openModal(f);
                break;
              }
              default: {
                console.error('invalid exec_type: ', exec_type);
                break;
              }
            }
          })
        },
        addEnum(){
          const a = new DataSpec();
          a.name = '';
          a.value = undefined;
          this.dataSpecList.push(a);
        },
        deleteEnum(i) {
          this.dataSpecList.forEach((value,index) =>{
            if (i === index) {
              this.dataSpecList.splice(index, 1);
            }
          })
        },
        showDataSpecsModal(feature_type,modal_type,parameter_type,$event,item,index){
          this.parameter_type = parameter_type;
          this.dataSpecsModalType = modal_type;
          const feature = {}
          if(typeof(item)!= "undefined"){
            feature.code = item.code;
            feature.name = item.name;
            feature.spec = item.spec;
            feature.type = item.type;
          }
         // this.dataspec.showModal(feature_type, modal_type, feature);
        },
        /*下发更新：修改配置，下发更新给中间件*/
        middleWarePush(){
          this.$confirm('请谨慎后操作，这将影响整个产品的配置！','您确定要将最新配置更新下发吗？',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'info',
          }).then(() => {
            const p1 = new Promise((resolve,reject) =>{
              let parParams1={
                _url: "/mqtt/sys/" + this.product_id +"/thing/model/push" ,
                _method: "post",
                _body: {}
              };
              middleWarePushModel(parParams1).then(res =>{
                resolve(res);
                },err =>{
                reject(err)
              })
              })
            const p2 = new Promise((resolve,reject) =>{
              let parParams2={
                _url: "/mqtt/sys/" + this.product_id +"/thing/config/push" ,
                _method: "post",
                _body: {}
              };
              middleWarePushConfig(parParams2).then(res =>{
                resolve(res);
              },err =>{
                reject(err)
              })
            })
            Promise.all([p1,p2]).then(res =>{
              this.$message({
                message: '下发更新成功！',
                type: 'success'
              });
            }).catch(err =>{
              this.$message.error('下发更新失败！');
            })
          })
        }
      },
      created() {
        /*通过路由获取产品id*/
        this.product_id = this.$route.params.id;
        this.getFeatures();
      }
    }
</script>

<style scoped>

</style>
