/*
 * @Author: wangcy
 * @Date: 2023-06-21 14:05:50
 * @LastEditors: 
 * @LastEditTime: 2023-06-21 14:10:48
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
