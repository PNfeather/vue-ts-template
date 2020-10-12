import axios from 'axios';
import {Message, Loading} from 'element-ui';
import Qs from 'qs';
import router from '@/router';
import storage from '@/utils/storage';
import _ from '@/plugins/lodash';

const message = {
  401: _.debounce(() => {
    Message.warning('未登录或登录过期，请登录');
    setTimeout(() => {
      router.push({path: '/login', query: {autoBack: 'true'}});
    }, 1200);
  }, 200),
  500: _.debounce(() => {
    Message.error('服务器维护中，请稍候访问');
  }, 200),
};

// 请求参数类型
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

// 默认返回数据格式
axios.defaults.responseType = 'json';

// 防止请求session变动
axios.defaults.withCredentials = true;

// 请求超时时间
axios.defaults.timeout = 120000;

// 请求路径
axios.defaults.baseURL = process.env.VUE_APP_URL;

// 全局等待遮罩
let loadingInstance: any;

const pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken;
const removePending = (config: any) => {
  for (let i = 0; i < pending.length; i++) {
    if (pending[i].u === JSON.stringify(config, ['url', 'method'])) { // 当前请求在数组中存在时执行函数体
      pending[i].f(pending[i].u); // 执行取消操作
      pending.splice(i, 1); // 把这条记录从数组中移除
    }
  }
};

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  removePending(config); // 在一个ajax发送前执行一下取消操作
  let token = '';
  const storageVuex = storage.get('vuex');
  if (storageVuex && Object.keys(JSON.parse(storageVuex)).length) {
    token = JSON.parse(storageVuex).common.userInfo.token;
  }
  // 设置默认token
  config.headers.common['X-TOKEN'] = token;
  config.cancelToken = new CancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({u: JSON.stringify(config, ['url', 'method']), f: c});
  });
  loadingInstance = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.8)',
  });
  // 处理get请求数组型入参
  if (config.method === 'get' || config.method === 'delete' ) {
    config.paramsSerializer = (params) => {
      return Qs.stringify(params, {arrayFormat: 'repeat'});
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  loadingInstance.close();
  removePending(response.config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  const res = response.data;
  if (res && +res.code === 401) { // 登录过期自动跳登录
    message['401']();
  } else if (res && +res.code === 200) {
    const sucessMessage = ['操作成功', '任务导出进行中...'];
    if ((res.data === null || res.data === undefined) && sucessMessage.includes(res.message)) {
      return true;
    }
    return res.data;
  } else {
    Message.error(res.message);
  }
}, (error) => {
  loadingInstance.close();
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message.error('请求超时');
  }
  if (error.response) {
    const response = error.response;
    switch (response.status) {
      case 500:
      case 502:
        message['500']();
        break;
      default:
        break;
    }
  }
  // tslint:disable no-console
  console.warn(error);
});

export const Http = axios;

export default {
  install(Vue: any) {
    Vue.prototype.$http = axios;
    Vue.http = axios;
  },
};
