import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  components: { App },
  store,
  template: "<App/>",
  render: h => h(App)
}).$mount('#app')
