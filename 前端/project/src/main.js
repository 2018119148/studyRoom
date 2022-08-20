import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import * as echarts from 'echarts'
// 引入element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)
Vue.use(ElementUI);
Vue.use(echarts);
Vue.prototype.$axios=axios

Vue.config.productionTip = false

// axios请求时默认不会携带cookie，这句代码可以使axios请求时携带cookie
axios.defaults.withCredentials=true;
axios.defaults.baseURL="http://localhost:8080/"
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
