 class SettingsService {
  default_photo = '/assets/images/user-head.png';

  APPHOST = 'https://v1.wuyuyun.com';

  wechat = {
    AppID: 'wx7cf791b39d2b1118',
    AppSecret: 'de68ee9711ca66ee31ab2c877c102419'
  };
  date_format(date, fmt) {

     fmt = 'yyyy-MM-dd hh:mm:ss';

    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
    }
    mqtt() {
    const mqtt = {
      host: 'ws://192.168.88.120:1884/mqtt',
      // host: 'ws://116.62.48.231:1884/mqtt',
      // host: 'wss://v1.wuyuyun.com/mqtt',
      clientId: 'WEB_' + Date.now() + '_' + Math.floor(Math.random() * 1000000)
    };
    return mqtt;
  }

}
 export default new SettingsService()
