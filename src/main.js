import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import VueResource from 'vue-resource'
import CONST from './const.js'

Vue.config.productionTip = true

Vue.use(VueResource)
Vue.use(Vuetify, { //material icons
  iconfont: 'mdi'
})

Vue.use(VueKeyCloak, {
  config: CONST.keyCloakConf,
  onReady: () => {
    new Vue({
      el: '#app',
      template: '<App/>',
      render: h => h(App)
    })
  },
  init: {onLoad: 'login-required'}
})


