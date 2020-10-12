/**
 * 时间格式化方法
 * currentDate:需要格式化的时间，new Date()或时间戳对象
 * fmt:需要转换出来的样式
 */
function format(currentDate: any, fmt = 'YYYY-MM-DD HH:mm') {
  let date = currentDate;
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    const reg = /^[1-9]\d{3}[\-\/](0[1-9]|1[0-2])([\-\/](0[1-9]|[1-2][0-9]|3[0-1]))?(\s+)?(20|21|22|23|[0-1]\d)?(:[0-5]\d)?(:[0-5]\d)?$/;
    if (reg.test(date)) {
      date = new Date(date.replace(/-/g, '/'));
    } else {
      date = new Date(date);
    }
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'DD+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds(), // 毫秒
  };
  const week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay() + '']);
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

export default format;
