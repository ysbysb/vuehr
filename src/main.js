// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as d3 from "d3"
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import VueDragResize from 'vue-drag-resize'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {post2Request} from './utils/api'
import {deleteRequest} from './utils/api'
import {delete2Request} from './utils/api'
import {putRequest} from './utils/api'
import {initMenu} from './utils/utils'
import {isNotNullORBlank} from './utils/utils'
import './utils/filter_utils'
import 'font-awesome/css/font-awesome.min.css'
import publicFunction from '../static/js/editPages3/public'

Vue.component('vue-drag-resize', VueDragResize)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.d3=d3;
Vue.prototype.$http=axios;
//Vue.prototype.api='ws://192.168.9.55:8084/websocket';
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.post2Request = post2Request;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.delete2Request = delete2Request;
Vue.prototype.putRequest = putRequest;
Vue.prototype.isNotNullORBlank = isNotNullORBlank;
Vue.prototype.publicFunction = publicFunction;
Vue.config.productionTip = false;



router.beforeEach((to, from, next)=> {

    if (to.name == 'Login') {
      next();
      return;
    }

    var name = store.state.user.name;

    if (name == '未登录') {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}})
      } else {
        next();
      }
    } else {
      initMenu(router, store);
      if(to.path=='/chat')
        store.commit("updateMsgList", []);
      next();
    }
  }
)


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
