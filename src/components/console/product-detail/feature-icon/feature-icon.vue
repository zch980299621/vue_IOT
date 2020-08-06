<template>
  <div>
    <el-dialog :visible.sync="isVisible"  width="30%" title="设置图标">
      <div class="row">
        <span style="padding-left: 15px">搜索：</span>
        <div class="col-md-6">
          <el-input    type="text" autosize  placeholder="输入名称搜索" v-model="search" @keyup.enter="onSearch()">
            <el-button slot="append" icon="el-icon-search" @click="onSearch()"></el-button>
          </el-input>
        </div>
      </div>
      <el-container v-if="icons.lenth<1">
        <el-alert  title=" 没有查询记录！" type="warning"></el-alert>
      </el-container>
      <div class="row" style="padding: 15px" >
        <el-container v-for="item of icons" :key="item.id">
          <div class="icon-box">
            <el-image class="image rounded border-white" :style="{'background-image': 'url('+item.path+')'}" @click="selectImage(item)">
              <i class="el-icon-circle-close"></i>
              <span class="text-truncate image-name">{{item.name}}</span>
            </el-image>
          </div>
        </el-container>
      </div>
      <div class="text-right">
        <el-pagination
          background
          layout="prev,pager, next"
          @current-change="pageIndexChange($event)"
          @size-change="pageSizeChange()"
          :page-size="pageSize"
          :total="pagination.total_items">
        </el-pagination>
      </div>
      <el-button type="primary" @click="handleOk()" disabled="!iconPath"></el-button>
      <el-button class="ml-2"  @click="handleCancel()">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {getIconImages} from '../../../../api/console/icon_api'
    export default {
        name: "feature-icon",
      data(){
          return{
            isVisible :false,
            product_id: '',
            feature_id: '',
            isOkLoading : false,
            icons :[],
            icon:{},
            search : '',
            current:1,
            pageSize : 60,
            iconPath : '',
            checked :false,
            pagination:{}
          }
      },
      methods:{
        handleOk(){
          if(!this.icon.path){
            this.$message( '请选择功能定义图标');
            return;
          }
          this.isVisible = false;
        },
        handleCancel(){
          this.isVisible = false;
        },
        onSearch(){
          this.getIcons();
        },
        getIcons(){
          let params={
            search: this.search,
            page:this.current,
            pageSize: this.pageSize
          };
          getIconImages(params).then(res =>{
            this.icons = res.data.data;
            this.pagination = res.data.page;
          })
        },
        pageIndexChange($event){
          this.current = $event;
          this.getIcons();
        },
        pageSizeChange() {
          this.current = 1;
          this.getIcons();
        },
        selectImage(icon) {
          this.icon = icon;
          this.iconPath = this.icon.path;
        }
      }
    }
</script>

<style scoped lang="scss">
  .image {
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
    width: 100%;
    //height: 150px;
    height: 100%;
    background-color: #f9f9f9;
    position: relative;
    border-width: 1px;
    border-style: solid;
    border-color: #f9f9f9;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &:hover {
      border-style: dashed;
      border-color: #007bff!important;
    }

    .anticon-select-poster {
      color: #10b864 !important;
      font-size: 16px;
      position: absolute;
      margin: 5px 0 0 5px;
      display: none;
    }

    .image-name {
      position: absolute;
      width: 100%;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.61);
      color: #fff;
      padding: 0 5px;
      border-bottom-left-radius: .25rem;
      border-bottom-right-radius: .25rem;
      font-size:12px;
    }
  }

  .image.active {
    border-width: 2px;
    border-style: solid;
    border-color: #14de74 !important;
    box-shadow: 0 .25rem .75rem rgba(20, 222, 116, 0.2);
    .anticon-select-poster {
      display: block;
    }
  }
  .icon-box{
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 5px;
  }
</style>
