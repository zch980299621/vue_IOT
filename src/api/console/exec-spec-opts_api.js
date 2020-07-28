class ExecSpecOptsService {
  // 功能码
  function_code_opts = [
    { value: '01', name: '01'},
    { value: '02', name: '02'},
    { value: '03', name: '03'},
    { value: '04', name: '04'},
    { value: '05', name: '05'},
    { value: '06', name: '06'},
    { value: '0F', name: '0F'},
    { value: '10', name: '10'}
  ];
  // 串口
  tty_opts = [
    { value: 'tty0', name: '串口0（内置）'},
    { value: 'tty1', name: '串口1'},
    { value: 'tty2', name: '串口2'},
    { value: 'tty3', name: '串口3'},
    { value: 'tty4', name: '串口4'},
  ];

  // 波特率
  baud_rate_opts = [
    { value: 115200, name: '115200' },
    { value: 38400, name: '38400' },
    { value: 19200, name: '19200' },
    { value: 9600, name: '9600' },
    { value: 4800, name: '4800' },
    { value: 2400, name: '2400' },
    { value: 1200, name: '1200'},
    { value: 400, name: '400' },
    { value: 300, name: '300' }
  ];

  // 数据位
  data_bit_opts = [
    { value: 8, name: '8' },
    { value: 7, name: '7' },
    { value: 6, name: '6' }
  ];

  // 停止位
  stop_bit_opts = [
    { value: 1, name: '1'},
    { value: 2, name: '2'}
  ];

  // 校验位
  parity_bit_opts = [
    { value: 'N', name: 'None' },
    { value: 'E', name: 'Even' },
    { value: 'O', name: 'Odd' }
  ];

  // 原始数据，将不用
  original_code_opts = [
    { value: 'float', name: 'Float' },
    { value: 'bcd', name: 'BCD' },
    { value: 'custom', name: '自定义' },
  ];

  // camera_vga = [
  //     { id: '1280*720' , value: '1280*720'},
  //     { id: '1280*960' , value: '1280*960'},
  //     { id: '1920*1080' , value: '1920*1080'},
  //     { id: '2560*1400' , value: '2560*1400'},
  //     { id: '3072*2048' , value: '3072*2048'},
  // ];
  camera_vga = [
    { id: '720P' , value: '720P'},
    { id: '1080P' , value: '1080P'},
  ];

  camera_bit_rate = [
    {id: '399', value: '399'},
    {id: '598', value: '598'},
    {id: '798', value: '798'},
    {id: '997', value: '997'},
    {id: '1197', value: '1197'},
    {id: '1596', value: '1596'},
  ];

  // 传感器类型 将不用
  seneor_type = [
    { value: 1, name: '4-20mA' },
    { value: 2, name: '0-10v' }
  ];

  // 读写协议类型
  rw_type = [
    { value: 'none', name: 'none' },
    { value: 'serial', name: 'serial' },
    { value: 'modbus', name: 'modbus' },
    { value: 'lua', name: 'lua' },
  ];

  // 计算、校准类型
  calculate_calibrate_type = [
    { value: 'none', name: 'none' },
    { value: 'expr', name: 'expression' },
    { value: 'lua', name: 'lua' },
  ];

  // 原始数据转换类型
  transform_type = [
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
  ];
  // 大小端
  transform_endian = [
    {value: 'big', name: '大端'},
    {value: 'little', name: '小端'},
  ];
  // 转换字节数量
  transform_count = [
    {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5},
  ];
  // modbus功能码,读类型
  modbus_r_cmd_type = [
    { value: '01', name: '01'},
    { value: '02', name: '02'},
    { value: '03', name: '03'},
    { value: '04', name: '04'},

  ];
  // modbus功能码,写类型
  modbus_w_cmd_type = [
    { value: '05', name: '05'},
    { value: '06', name: '06'},
    { value: '0F', name: '0F'},
    { value: '10', name: '10'}
  ];

  // 上报类型
  post_type = [
    { value: 'none', name: 'none' },
    { value: 'interval', name: '间隔' },
    { value: 'timing', name: '定点' },
  ];

  // 间隔上报选项
  interval_opts = [
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
  ];

  // 定点上报，按天
  timing_hours = [
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
  ];

  timing_base_type = [
    { value: 'd', name: '每天' },
    { value: 'h', name: '每小时' },
  ];
  timing_minutes = [];   // 定点上报，按小时
  default_lua_conf = {
    'read':
      {
        'script': '',
        'transform': {'type': 'none', 'endian': '', 'start': 0, 'count': 0, 'k': 0, 'p': 0 , 'script': ''},
        'calculate': {'type': 'none', 'expr': '', 'script': ''},
        'calibrate': {'type': 'none', 'expr': '', 'script': ''},
        'post':      {'type': 'none', 'interval': '', 'timing': {'conf': Array(0)}},
      },
    'write': { 'script': ''}
  };
  create_timing_minutes() {
    this.timing_minutes = [];
    for ( let i = 0; i < 60; i++) {
      const name = '第' + i + '分钟';
      let value = i + ':00';
      if (i < 10) { value = '0' + value; }
      this.timing_minutes.push({
        value: value,
        name: name
      });
    }
  }
  getDefaultExecSpec() {
    return   {
      'tty':
        {'port': '/dev/ttyO3', 'baudrate': 9600, 'databits': 8, 'stopbits': 1, 'parity': 'E'},
      'read':
        {
          'type': 'none',
          'serial': '',
          'script': '',
          'transform': {'type': 'none', 'endian': '', 'start': 0, 'count': 0, 'k': 0, 'p': 0 , 'script': ''},
          'calculate':      {'type': 'none', 'expr': '', 'script': ''},
          'calibrate':   {'type': 'none', 'expr': '', 'script': ''},
          'post':      {'type': 'none', 'interval': '', 'timing': {'conf': Array(0)}},
          'modbus':    {'slave': '', 'func': '03', 'addr': '', 'count': ''},
        },
      'write': {
        'type': 'none',
        'serial': '',
        'script': '',
        'modbus': ''
      }
    };
  }

  getDefaultCamera() {
    return   {
      'live_ip': 'rtmp://121.199.18.4/live',
      'bit_rate': '7K~8Mbps',
      'vga': '1280*720',
      'camera_ip': '121.12.121',
      'camera_user': 'wyw',
      'camera_psd': '123456',
      'desc': '',
      'port': 554

    };

  }
}
export default new ExecSpecOptsService()
