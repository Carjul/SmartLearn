import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
//import BootstrapVue from "bootstrap-vue"
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vuescroll from "vuescroll";

// You can set global config here.
Vue.use(vuescroll, {
    ops: {
        // The global config
    },
    name: "myScroll", // customize component name, default -> vueScroll
});


//Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuesax, {
  // options here
})

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.config.productionTip = false
Vue.use(VueAxios, axios)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
