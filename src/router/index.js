import store from '../store'
import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes' // 引入路由配置文件

const router = createRouter({
  history: createWebHistory(),
  //linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // 有锚点时，滚动到锚点
      return { selector: to.hash }
    } else if (savedPosition) {
      // 有保存位置时，滚动到保存位置
      return savedPosition
    } else {
      // 默认滚动到页面顶部
      return { x: 0, y: 0 }
    }
  },
  routes
})

//全局路由首位
router.beforeEach((to, from, next) => {
  const auth      = store.state.auth
  const articleId = to.params.articleId
  const paramUser = to.params.user
  const user = store.state.user && store.state.user.name
  if (
    auth && to.path.indexOf('/auth/') !== -1 ||
    (!auth && to.meta.auth)||
    (articleId && !store.getters.getArticleById(articleId))||
    (paramUser && paramUser !== user && !store.getters.getArticlesByUid(null, paramUser).length)
  ) {
    next('/')
  } else {
    next()
  }
})

//后置路由
router.afterEach((to, from) => {
  /**
  const app = router.app
  const showMsg = to.params.showMsg

  if (showMsg) {
    if (typeof showMsg === 'string') {
      app.$message.show(showMsg)
    } else {
      app.$message.show('操作成功')
    }
  }*/
})

export default router
