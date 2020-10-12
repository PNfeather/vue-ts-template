import _ from '@/plugins/lodash';
/**
 * 对象处理方法
 * compare:深度比较两个对象属性是否一致
 * deleteFalseKey:深度删除对象空字符串空数组属性
 */
export const dealObj = {
  // 比较两个对象是否相等
  compare(oldData: any, newData: any) {
    oldData = this.replaceN(oldData);
    newData = this.replaceN(newData);
    // 类型为基本类型时,如果相同,则返回true
    if (oldData === newData) {
      return true;
    }
    if (dealObj.isObject(oldData) && dealObj.isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
      // 类型为对象并且元素个数相同
      // 遍历所有对象中所有属性,判断元素是否相同
      for (const key in oldData) {
        if (oldData.hasOwnProperty(key)) {
          if (!dealObj.compare(oldData[key], newData[key])) {
            // 对象中具有不相同属性 返回false
            return false;
          }
        }
      }
    } else if (dealObj.isArray(oldData) && dealObj.isArray(oldData) && oldData.length === newData.length) {
      // 类型为数组并且数组长度相同
      for (let i = 0, length = oldData.length; i < length; i++) {
        if (!dealObj.compare(oldData[i], newData[i])) {
          // 如果数组元素中具有不相同元素,返回false
          return false;
        }
      }
    } else {
      // 其它类型,均返回false
      return false;
    }
    // 走到这里,说明数组或者对象中所有元素都相同,返回true
    return true;
  },
  // 删除对象空字符空数组属性方法
  deleteFalseKey(obj: any): any {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val === '' || (dealObj.isArray(val) && !val.length)) {
        delete obj[key];
      }
      if (dealObj.isObject(val)) {
        obj[key] = dealObj.deleteFalseKey(obj[key]);
      }
    }
    return obj;
  },
  // 判断是否存在换行，然后统一换行符格式
  replaceN(str: string) {
    if (typeof str === 'string' && (str.indexOf('\n') > -1 || str.indexOf('\r\n') > -1)) {
      let result = str.replace(/\r\n/g, '\n');
      result = result.replace(/\n/g, '\r\n');
      return result;
    } else {
      return str;
    }
  },
  // 判断此类型是否是Array类型
  isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  // 判断此对象是否是Object类型
  isArray(arr: any) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  },
  // 判断此对象是否是String类型
  isString(str: any) {
    return Object.prototype.toString.call(str) === '[object String]';
  },
  // 对obj所有字符串类型属性去前后空格,数组不处理，子对象类型处理
  objectTrim(obj: any, exceptKeys?: string[]) {
    const copyObj = _.cloneDeep(obj);
    if (dealObj.isString(copyObj)) {
      return copyObj.trim();
    }
    if (dealObj.isObject(copyObj)) {
      for (const key of Object.keys(copyObj)) {
        if (exceptKeys && exceptKeys.includes(key)) {
          continue;
        }
        copyObj[key] = dealObj.objectTrim(copyObj[key]);
      }
    }
    return copyObj;
  },
};
