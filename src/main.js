import './mock'

import {createApp} from 'vue' //引入 vue.js 创建方法
import router from './router' //引入 vue route
import store from './store'   //引入store vuex
import { setupGlobDirectives } from './directives';     //引入指令
import { setupGlobComponents } from './components';     //引入组件
import { setupGlobFilters } from './filters';     //引入组件
import VueSweetalert2 from  './plugins/vue-sweetalert2' //引入插件
import App from './App.vue'   //引入 App.vue 根视图
import ls from "@/utils/localStorage";
import { mockArticles } from './mock/data'
import axios from 'axios'

const app = createApp(App)
const AddMockData = function (){
  // 是否加入测试数据
  const isAddMockData = true
  // 用户数据
  let userArticles = ls.getItem('articles')

  if (Array.isArray(userArticles)) {
    userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
  } else {
    userArticles = []
  }

  if (isAddMockData) {
    // 合并用户数据和测试数据，使用合并值作为所有文章
    store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(60)])
  } else {
    // 使用用户数据作为所有文章
    store.commit('UPDATE_ARTICLES', userArticles)
  }
}


app.config.globalProperties.$axios = axios

app.use(store)              //全局注册vuex
app.use(router)             //全局注册路由
app.use(VueSweetalert2);    //使用弹框插件
setupGlobDirectives(app);   //全局注册指令
setupGlobComponents(app);   //全局注册组件
setupGlobFilters(app)       //全局注册过滤器

app.mount('#app')
