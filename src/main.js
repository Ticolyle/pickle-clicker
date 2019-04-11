import Vue from "vue";
import Vuex from "vuex";
// import Router from "vue-router";
import App from "./App";

Vue.config.productionTip = false;
Vue.use(Vuex);
// Vue.use(Router);

// const router = new Router({
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: home
//     }
//   ]
// });

const store = new Vuex.Store({
  state: {
    cash: 0
  },
  mutations: {
    addSheet(state, sheet) {
      state.sheets.push(sheet);
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  // router,
  store,
  template: "<App/>"
});
