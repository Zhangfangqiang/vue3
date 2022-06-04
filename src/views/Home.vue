<template>
  <div>
    <Message :show="msgShow" @update:show="msgShow = val" :type="msgType" :msg="msg"/>


    <!-- 帖子列表 -->
    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li v-for="(item,index) in filters" :key="index">
              <router-link v-title="item.title" :class="{ active: filter === item.filter }" :to="`/topics?filter=${item.filter}`">{{ item.name }}</router-link>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.articleId" class="list-group-item">
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{  $filters.moment(article.date,'from') }}</abbr>
                </div>
              </router-link>
              <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
                <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize" :onPageChange="changePage" />
        </div>

      </div>
    </div>

    <!--侧边栏开始-->
    <TheSidebar></TheSidebar>
    <!--侧边栏结束-->

  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheSidebar from '@/components/layouts/TheSidebar'

export default {
  name: 'Home',
  components: {
    TheSidebar
  },
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      articles: [], // 文章列表
      filter: 'default', // 默认过滤方式
      filters: [ // 过滤方式列表
        { filter: 'default', name: '活跃', title: '最后回复排序'},
        { filter: 'excellent', name: '精华', title: '只看加精的话题'},
        { filter: 'vote', name: '投票', title: '点赞数排序'},
        { filter: 'recent', name: '最近', title: '发布时间排序'},
        { filter: 'noreply', name: '零回复', title: '无人问津的话题'}
      ],
      total: 0, // 文章总数
      pageSize: 15, // 每页条数
    }
  },
  computed: {
    ...mapState([
      'auth',
      'user',
      'articles'
    ]),
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
    //这个方法会覆盖 articles 这个变量, 每次调用变量就相当于调用这个方法
    //articles() {
    //  return this.$store.getters.computedArticles
    //}
  },
  //组件内的路由导航守卫
  beforeRouteEnter(to, from, next) {
    //路由的名称，对应路由配置中的 name
    const fromName = from.name
    const logout = to.params.logout   //获取路由跳转的参数是否有logout
    //确认导航
    next(vm => {
      //通过 vm 参数访问组件实例，已登录时，评估路由名称
      if (vm.$store.state.auth) {
        switch (fromName) {
          // 如果从注册页面跳转过来
          case 'Register':
            // 显示注册成功
            vm.showMsg('注册成功')
            break
          case 'Login':
            // 显示注册成功
            vm.showMsg('登陆成功')
            break
        }
      } else if (logout) {
       vm.showMsg('操作成功')
      }
      vm.setDataByFilter(to.query.filter)
    })


  },

  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    },
    '$route'(to) {
      this.setDataByFilter(to.query.filter)
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    // 设置相关数据
    setDataByFilter(filter = 'default') {
      // 每页条数
      const pageSize = this.pageSize
      // 当前页
      const currentPage = this.currentPage
      // 过滤后的所有文章
      const allArticles = this.$store.getters.getArticlesByFilter(filter)

      this.filter = filter
      // 文章总数
      this.total = allArticles.length
      // 当前页的文章
      this.articles = allArticles.slice(pageSize * (currentPage - 1), pageSize * currentPage)
    },
    // 回调，组件的当前页改变时调用
    changePage(page) {
      // 在查询参数中混入 page，并跳转到该地址
      // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })
      this.$router.push({ query: { ...this.$route.query, page } })
    }

  }
}
</script>

<style scoped>

</style>
