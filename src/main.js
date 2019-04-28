// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Buefy from "buefy";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

import 'buefy/dist/buefy.css'

import config from 'buefy/src/utils/config'
config.defaultIconPack = 'fas';

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import Welcome from './components/Welcome'
import Create from './components/Create'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Buefy, {
  defaultIconPack: "fas"
});
// Vue.use(ElementUI);

//define your routes
const routes = [
  { path: '/', component: Welcome },
  { path: '/create', component: Create}
]

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})

new Vue({
  el: '#app',
  components: { App },  
  template: '<App/>',
  router
})
