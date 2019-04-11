import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // cash: 0,
  },
  mutations: {
    addSheet(state, sheet) {
      state.sheets.push(sheet);
    }
  },
  actions: {

  }
})
