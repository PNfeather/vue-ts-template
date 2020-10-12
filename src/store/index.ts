import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate';
import storage from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
  },
  getters,
  plugins: [
    // store数据持久化
    createPersistedState({
      storage: {
        getItem: (key) => storage.get(key),
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.remove(key),
      },
      paths: ['common.userInfo'],
    }),
  ],
});
