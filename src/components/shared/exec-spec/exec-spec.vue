<template>

</template>

<script>
  import execSpecOptsService from '../../../api/console/exec-spec-opts_api'
    export default {
        name: "exec-spec",
      data(){
          return{
            execSpecValue:''
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
          //this.showModal(f, execSpec);
        }
      }
    }
</script>

<style scoped>

</style>
