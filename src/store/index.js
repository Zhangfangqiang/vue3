import { createStore } from 'vuex'
import ls              from '../utils/localStorage'
import router          from '../router'

//存储 的值来自 localStorage
const state = {
  user: ls.getItem('user'),
  // 添加 auth 来保存当前用户的登录状态
  auth: ls.getItem('auth'),
  //获取所有文章
  articles: ls.getItem('articles'),
  searchValue: '',
 origin: location.origin
}

//事件 修改 localStorage存储
const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  // 添加 UPDATE_AUTH 来更改当前用户的登录状态
  UPDATE_AUTH(state, auth) {
    state.auth = auth
    ls.setItem('auth', auth)
  },
  // 更改所有文章的事件类型
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles
    ls.setItem('articles', articles)
  },
  // 更新搜索值的事件类型
  UPDATE_SEARCH_VALUE(state, searchValue) {
    state.searchValue = searchValue
  }
}

//动作 -> 事件 -> 存储
const actions = {
  //登陆
  login({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    // 更新当前用户的登录状态为已登录
    commit('UPDATE_AUTH', true)
    router.push('/')
  },
  //退出登陆
  logout({ commit }) {
    commit('UPDATE_AUTH', false)
    router.push({ name: 'Home', params: { logout: true } })
  },
  //更新用户资料
  updateUser({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }

    commit('UPDATE_USER', user)
  },
  //文章提交
  post({commit, state}, {article, articleId}) {
    let articles = state.articles

    if (!Array.isArray(articles)) articles = []

    if (article) {
      const uid = 1
      const {title, content} = article
      const date = new Date()

      if (articleId === undefined) {
        const lastArticle = articles[articles.length - 1]

        if (lastArticle) {
          articleId = parseInt(lastArticle.articleId) + 1
        } else {
          articleId = articles.length + 1
        }

        articles.push({uid, articleId, title, content, date})
      } else {
        for (let article of articles) {
          if (parseInt(article.articleId) === parseInt(articleId)) {
            article.title = title
            article.content = content
            break
          }
        }
      }

      commit('UPDATE_ARTICLES', articles)
      router.push({name: 'Content', params: {articleId, showMsg: true}})

    }else {
      for (let article of articles) {

        if (parseInt(article.articleId) === parseInt(articleId)) {
          console.log(article)
          console.log(articleId)

          articles.splice(articles.indexOf(article), 1)
          break
        }
      }

      commit('UPDATE_ARTICLES', articles)
      router.push({ name: 'Home', params: { showMsg: true } })
    }
  },
  //文章点赞
  like({commit, state}, {articleId, isAdd}) {
    // 仓库的文章
    let articles = state.articles
    // 点赞用户列表
    let likeUsers = []
    // 用户 ID，默认为 1
    const uid = 1

    if (!Array.isArray(articles)) articles = []

    for (let article of articles) {
      // 找到对应文章时
      if (parseInt(article.articleId) === parseInt(articleId)) {
        // 更新点赞用户列表
        likeUsers = Array.isArray(article.likeUsers) ? article.likeUsers : likeUsers

        if (isAdd) {
          // 是否已赞
          const isAdded = likeUsers.some(likeUser => parseInt(likeUser.uid) === uid)

          if (!isAdded) {
            // 在点赞用户列表中加入当前用户
            likeUsers.push({uid})
          }
        } else {
          for (let likeUser of likeUsers) {
            // 找到对应点赞用户时
            if (parseInt(likeUser.uid) === uid) {
              // 删除点赞用户
              likeUsers.splice(likeUsers.indexOf(likeUser), 1)
              break
            }
          }
        }

        // 更新文章的点赞用户列表
        article.likeUsers = likeUsers
        break
      }
    }

    // 提交 UPDATE_ARTICLES 以更新所有文章
    commit('UPDATE_ARTICLES', articles)
    // 返回点赞用户列表
    return likeUsers
  },

  //评论
  comment({commit, state}, {articleId, comment, commentId}) {
    let articles = state.articles
    let comments = []

    if (!Array.isArray(articles)) articles = []

    for (let article of articles) {
      if (parseInt(article.articleId) === parseInt(articleId)) {
        comments = Array.isArray(article.comments) ? article.comments : comments

        if (comment) {
          const {uid = 1, content} = comment
          const date = new Date()

          if (commentId === undefined) {
            const lastComment = comments[comments.length - 1]

            if (lastComment) {
              commentId = parseInt(lastComment.commentId) + 1
            } else {
              commentId = comments.length + 1
            }

            comments.push({
              uid, commentId, content, date
            })
          } else {
            for (let comment of comments) {
              if (parseInt(comment.commentId) === parseInt(commentId)) {
                comment.content = content
                break
              }
            }
          }
        } else { // 不存在评论内容时
          for (let comment of comments) {
            // 找到对应的评论时
            if (parseInt(comment.commentId) === parseInt(commentId)) {
              // 删除这条评论
              comments.splice(comments.indexOf(comment), 1)
              break
            }
          }
        }

        article.comments = comments
        break
      }
    }

    commit('UPDATE_ARTICLES', articles)
    return comments
  }
}

//添加 getters
const getters = {
  getArticleById: (state) => (id) => {
    let articles = state.articles

    if (Array.isArray(articles)) {
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      return articles.length ? articles[0] : null
    } else {
      return null
    }
  },

  //返回添加用户信息后的所有文章
  computedArticles : (state) => {
    let articles = state.articles
    let newArticles = []

    // 添加用户信息，参数 isCurrentUser 代表是否是当前用户
    const addUserInfo = function(isCurrentUser) {
      const userName = state.user && state.user.name
      const userAvatar = state.user && state.user.avatar
      const avatarUrl = 'https://api.adorable.io/avatars/200/'

      // 是当前用户时，设置用户数据为当前用户的信息
      if (isCurrentUser) {
        this.uname = userName
        this.uavatar = userAvatar
      } else {
        // 不是当前用户时，设置用户数据为对象里用户的信息
        this.uavatar = `${avatarUrl}${this.uname}`
      }
    }

    if (Array.isArray(articles)) {
      // 深拷贝 articles 以不影响其原值
      newArticles = JSON.parse(JSON.stringify(articles))
      newArticles.forEach((article) => {
        const comments = article.comments
        const likeUsers = article.likeUsers

        // 添加用户信息到文章
        if (article.uid === 1) {
          addUserInfo.call(article, true)
        } else {
          addUserInfo.call(article)
        }

        // 添加用户信息到评论
        if (Array.isArray(comments)) {
          comments.forEach((comment) => {
            if (comment.uid === 1) {
              addUserInfo.call(comment, true)
            } else {
              addUserInfo.call(comment)
            }
          })
        }

        // 添加用户信息到点赞
        if (Array.isArray(likeUsers)) {
          likeUsers.forEach((likeUser) => {
            if (likeUser.uid === 1) {
              addUserInfo.call(likeUser, true)
            } else {
              addUserInfo.call(likeUser)
            }
          })
        }
      })
    }

    return newArticles
  },

  //筛选过滤
  getArticlesByFilter : (state, getters) => (filter) => {
    // 使用派生状态 computedArticles 作为所有文章
    let articles = getters.computedArticles
    let filteredArticles = []

    if (Array.isArray(articles)) {
      // 深拷贝 articles 以不影响其原值
      filteredArticles = articles.map(article => ({ ...article }))

      switch(filter) {
        case 'excellent':
          // 将当前用户的文章设置为精华文章
          filteredArticles = getters.getArticlesByUid(1)
          break
        case 'vote':
          // 将赞的最多的文章排在前面
          filteredArticles.sort((a, b) => {
            const alikeUsers = Array.isArray(a.likeUsers) ? a.likeUsers : []
            const blikeUsers = Array.isArray(b.likeUsers) ? b.likeUsers : []

            return blikeUsers.length - alikeUsers.length
          })

          break
        case 'recent':
          // 将最新写的文章排在前面
          filteredArticles.reverse()
          break
        case 'noreply':
          // 将评论最少的文章排在前面
          filteredArticles.sort((a, b) => {
            const aComments = Array.isArray(a.comments) ? a.comments : []
            const bComments = Array.isArray(b.comments) ? b.comments : []

            return aComments.length - bComments.length
          })

          break
        default:
          // 默认将回复时间最新的文章排在前面
          filteredArticles.sort((a, b) => {
            const aComments = Array.isArray(a.comments) ? a.comments : []
            const bComments = Array.isArray(b.comments) ? b.comments : []
            const aCommentsLength = aComments.length
            const bCommentsLength = bComments.length

            if (aCommentsLength > 0) {
              if (bCommentsLength > 0) {
                return new Date(bComments[bCommentsLength - 1].date) - new Date(aComments[aCommentsLength - 1].date)
              } else {
                return -1
              }
            } else {
              return 1
            }
          })

          break
      }
    }

    return filteredArticles
  },

  //通过userId 获取文章
  getArticlesByUid :(state, getters) => (uid, user) => {
    // 使用派生状态 computedArticles 作为所有文章
    let articles = getters.computedArticles


    if (Array.isArray(articles)) {
      if (user) {
        // 有用户名时遍历所有文章
        for (const article of articles) {
          if (article.uname === user) {
            // 指定 uid 为文章上的 uid
            uid = article.uid
            break
          }
        }
      }

      // 使用指定 uid 过滤所有文章
      articles = articles.filter(article => parseInt(uid) === parseInt(article.uid))
    } else {
      articles = []
    }
    return articles
  },

  //关键词搜索
  getArticlesByKeyword: (state, getters) => (keyword, filter) => {
    let articles = getters.computedArticles
    let results = []

    if (Array.isArray(articles)) {
      articles.forEach((article) => {
        let {articleId, title, content} = article
        const regex = new RegExp(`(${keyword})`, 'gi')

        if (title.indexOf(keyword) !== -1 || content.indexOf(keyword) !== -1) {
          const url = `${state.origin}/articles/${articleId}/content`
          title = title.replace(regex, '<span class="highlight">$1</span>')
          content = content.substr(0, 100).replace(regex, '<span class="highlight">$1</span>')
          results.push({...article, ...{url, title, content}})
        }
      })
    }

    // 评估排序方式
    switch (filter) {
      case 'vote':
        // 将赞的最多的文章排在前面
        results.sort((a, b) => {
          const alikeUsers = Array.isArray(a.likeUsers) ? a.likeUsers : []
          const blikeUsers = Array.isArray(b.likeUsers) ? b.likeUsers : []

          return blikeUsers.length - alikeUsers.length
        })

        break
      default:
        // 默认将标题中含有关键字的文章排在前面
        results.sort((a, b) => a.title.indexOf(keyword) < b.title.indexOf(keyword))
    }

    return results
  }
}

const store = createStore({
  state,
  getters,
  mutations,
  actions
})

export default store
