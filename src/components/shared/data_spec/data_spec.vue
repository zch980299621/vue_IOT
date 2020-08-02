<template>

</template>

<script>
  import DataTypeService  from '../../../api/console/data_type_api'
    export default {
        name: "data_spec",
      data(){
          return{
            property:{},
            modalType : 'add',
            isVisible : false,
            feature_type :0,
            dataTypeChangeIndex : 0,
            spec: {},
            specList: {},
            dataTypes1 : [
              {'id': 1, 'code': 'int', 'name': '整型'},
              {'id': 2, 'code': 'float', 'name': '单精度浮点型'},
              {'id': 3, 'code': 'double', 'name': '双精度浮点型'},
              {'id': 4, 'code': 'text', 'name': '文本'},
              {'id': 5, 'code': 'bool', 'name': '布尔型'},
              {'id': 6, 'code': 'enum', 'name': '枚举型'},
              {'id': 7, 'code': 'date', 'name': '时间'},
            ],
            dataTypes2 : [
              {'id': 1, 'code': 'int', 'name': '整型'},
              {'id': 2, 'code': 'float', 'name': '单精度浮点型'},
              {'id': 3, 'code': 'double', 'name': '双精度浮点型'},
              {'id': 4, 'code': 'text', 'name': '文本'},
              {'id': 5, 'code': 'bool', 'name': '布尔型'},
              {'id': 6, 'code': 'enum', 'name': '枚举型'},
              {'id': 7, 'code': 'date', 'name': '时间'},
              {'id': 8, 'code': 'array', 'name': '数组'},
            ],
            array_element_types : [
              'int',
              'float',
              'double',
              'text'
            ],
          }
      },
      methods:{
        showModal(feature_type, modal_type, item){
            this.modalType = modal_type;
            this.feature_type = feature_type;
            if(modal_type === 'add'){
              this.property.type = 'int'
            }else if(typeof(item.code)!= "undefined"){
              this.property =item;
              if(DataTypeService.type_inspect(this.property.type,['enum','bool'])){
                this.specList = this.property.spec;
              }else if(this.property.type === 'array'){
                this.spec.item = new ItemType();
                this.spec.item.type = this.property.spec.item.type;
              }else{
                this.spec = this.property.spec;
              }
            }
            this.dataTypeChangeIndex =0;
            this.isVisible = true;
        }
      }
    }
</script>

<style scoped>

</style>
