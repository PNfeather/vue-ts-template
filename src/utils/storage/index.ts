/**
 * window.sessionStorage再封装
 * 需要在./config中注册后的字段才可以运行window.sessionStorage
 */
import {config} from './data';

const pre = 'FXT_YP_';

function setItem(name: string, value: any) {
  return window.sessionStorage.setItem(pre + name, JSON.stringify(value));
}

function getItem(name: string) {
  return JSON.parse(window.sessionStorage.getItem(pre + name) as any);
}

function removeItem(name: string) {
  return window.sessionStorage.removeItem(pre + name);
}

const storage = {
  get(name: string) {
    if (config.includes(name)) {
      return getItem(name);
    } else {
      console.warn('当前字面量' + name + '未设置缓存，请在storage工具data中配置');
    }
  },
  set(name: string, value: any) {
    if (config.includes(name)) {
      return setItem(name, value);
    } else {
      console.warn('当前字面量' + name + '未设置缓存，请在storage工具data中配置');
    }
  },
  remove(name: string) {
    if (config.includes(name)) {
      return removeItem(name);
    } else {
      console.warn('当前字面量' + name + '未设置缓存，请在storage工具data中配置');
    }
  },
};

export default storage;
