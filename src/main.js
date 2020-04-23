import Vue from 'vue'
import App from './App.vue'
import stButton from './../packages'
Vue.config.productionTip = false

Vue.use(stButton)

new Vue({
  render: h => h(App)
}).$mount('#app')
