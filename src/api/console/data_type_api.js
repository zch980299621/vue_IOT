class DataTypeService {
   dataTypes = [
    {'id': 1, 'code': 'int', 'name': '整型'},
    {'id': 2, 'code': 'float', 'name': '单精度浮点型'},
    {'id': 3, 'code': 'double', 'name': '双精度浮点型'},
    {'id': 4, 'code': 'text', 'name': '文本'},
    {'id': 5, 'code': 'bool', 'name': '布尔型'},
    {'id': 6, 'code': 'enum', 'name': '枚举型'},
    {'id': 7, 'code': 'date', 'name': '时间'},
    {'id': 8, 'code': 'array', 'name': '数组'},
    {'id': 9, 'code': 'struct', 'name': '结构'}
  ];
  array_element_types = [
    'int',
    'float',
    'double',
    'text'
  ];
  getDataSpecsString(type, range) {
    let rangeString = '';
    switch (type) {
      case 'int':
      case 'float':
      case 'double':
        const numberDataSpecs = JSON.parse(range);
        rangeString = `取值范围：${numberDataSpecs.min} ~ ${numberDataSpecs.max}；<span class="text-black-50">单位：${numberDataSpecs.unit || '-'}</span>`;
        break;
      case 'enum':
        const enumDataSpecs = JSON.parse(range);
        let enumString = '';
        enumDataSpecs.forEach((item, index, array) => {
          enumString += `${item.value} ~ ${item.name}；`;
        });
        rangeString = `枚举项：${enumString}`;
        break;
      case 'bool':
        const boolDataSpecs = JSON.parse(range);
        let boolString = '';
        boolDataSpecs.forEach((item, index, array) => {
          boolString += `${item.value} ~ ${item.name}；`;
        });
        rangeString = `布尔值：${boolString}`;
        break;
      case 'text':
        const textDataSpecs= JSON.parse(range);
        rangeString = `数据长度：${textDataSpecs.length} 字节`;
        break;
      case 'date':
        rangeString = `String类型的UTC时间戳(毫秒)`;
        break;
      case 'array':
        const arrayDataSpecs= JSON.parse(range);
        rangeString = `数组元素类型：${arrayDataSpecs.item.type}`;
        break;
      case 'struct':
        const structDataSpecs= JSON.parse(range);
        rangeString = `参数个数：${structDataSpecs.length}`;
        break;
      default:
        rangeString = '-';
    }

    return rangeString;
  }

  // 判断是否是小数
  isDecimal(value) {
    if (isNaN(value)) {
      return false;
    }
    // const i = String(value).indexOf('.') + 1; // 获取小数点的位置
    // const count = String(value).length - i; // 获取小数点后的个数
    // if ( i > 0 && count > 0) {
    //     return true;
    // }

    const reg = /^[\-]?[0-9]+(.[0-9]+)$/;
    if (reg.test(value)) {
      return true;
    }

    return false;
  }

  // 判断是否是整数
  isInteger(value) {

    if (isNaN(value)) {
      return false;
    }
    const reg = /^[-+]?\d*$/;
    if (reg.test(value)) {
      return true;
    }

    return false;
  }

  // 验证ip
  isValidIP(ip) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return reg.test(ip);
  }

  isString(str) {
    const reg = /^[a-zA-Z0-9_]+$/;
    return reg.test(str);
  }
}
export default new DataTypeService()
