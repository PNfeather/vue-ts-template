import _lodash from 'lodash';

// 将lodash常用方法封装到_里面
const _ = {
  cloneDeep: _lodash.cloneDeep,
  debounce: _lodash.debounce,
};

export default _;
