import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io'
Vue.config.productionTip = false


Vue.use(ElementUI).use(
  new VueSocketIO({
    debug: false,
    connection: "http://localhost:3000",// 多路复用/test
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
    options: { 
      autoConnect:false, //关闭自动连接，在用户登录后在连接。
      withCredentials: false
    },
    
  })
);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')