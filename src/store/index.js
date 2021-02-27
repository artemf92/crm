import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import categories from './categories';
import record from './record';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const currency = await fetch('https://www.cbr-xml-daily.ru/latest.js').then((response) => response.json());
      return currency;
    },
    async fetchValutes() {
      const valutes = await fetch('https://www.cbr-xml-daily.ru/daily_json.js').then((response) => response.json());
      return valutes;
    },
  },
  getters: {
    error: (s) => s.error,
  },
  modules: {
    auth,
    info,
    categories,
    record,
  },
});
