<style scoped>
/*编辑器样式*/
@import '~simplemde/dist/simplemde.min.css';
/*代码高亮*/
@import '~highlight.js/styles/paraiso-dark.css';

.blog-container {
  max-width: 980px;
  margin: 0 auto;
  margin-top: 20px;
}

textarea {
  height: 200px;
}
</style>

<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">{{ articleId ? '编辑文章' : '创作文章' }}</h2>
          <hr>
          <div data-validator-form>
            <div class="form-group">
              <input v-model.trim="title" v-validator:blur.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题" @input="saveTitle">
            </div>
            <div class="form-group">
              <textarea id="editor"></textarea>
            </div>
            <br>
            <div class="form-group">
              <button @click="post" class="btn btn-primary" type="submit">发 布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import ls from '@/utils/localStorage'
import router from "@/router";

window.hljs = hljs

export default {
  name: 'Create',
  data() {
    return {
      title: '', // 文章标题
      content: '', // 文章内容
      articleId: undefined // 文章 ID
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //vm.setArticleId(vm.$route.params.articleId)
      console.log(vm)
    })
  },
  // 在离开该组件的对应路由前
  beforeRouteLeave(to, from, next) {
    // 清空自动保存的文章数据
    this.clearData()
    next()
  },
  watch: {
    // 监听路由参数的变化
    '$route'(to) {
      // 清空自动保存的文章数据
      this.clearData()
      // 设置 articleId
      this.setArticleId(to.params.articleId)
    }
  },

  /**
   * 在dom加载出来后
   */
  mounted() {
    const simplemde = new SimpleMDE({
      element: document.querySelector('#editor'),
      spellChecker: false,
      autoDownloadFontAwesome: false,
      autosave: {
        enabled: true,
        uniqueId: 'vuejs-essential'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    })

    simplemde.codemirror.on('change', () => {
      this.content = simplemde.value()
      ls.setItem('smde_content', this.content)
    })

    this.simplemde  = simplemde
    const articleId = this.$route.params.articleId                //从路由中获取参数
    this.setArticleId(articleId)

  },

  methods: {
    saveTitle() {
      ls.setItem('smde_title', this.title)
    },
    fillContent(articleId) {
      const simplemde = this.simplemde
      const smde_title = ls.getItem('smde_title')
      const smde_content = ls.getItem('smde_content')

      if (articleId !== undefined) {
        const article = this.$store.getters.getArticleById(articleId)

        if (article) {
          const { title, content } = article

          this.title = smde_title || title
          this.content = smde_content|| content

          simplemde.value(this.content)
        }
      } else {
        this.title = smde_title
        this.content = smde_content
      }
    },
    post() {
      const title = this.title
      const content = this.content

      if (title !== '' && content.trim() !== '') {
        const article = {
          title,
          content
        }

        this.$store.dispatch('post', { article, articleId: this.articleId })
        this.clearData()
      }
    },
    setArticleId(articleId) {
      const localArticleId = ls.getItem('articleId')

      if (articleId !== undefined && !(articleId === localArticleId)) {
        this.clearData()
      }

      this.articleId = articleId
      this.fillContent(articleId)
      ls.setItem('articleId', articleId)
    },
    clearData() {
      this.title = ''
      ls.removeItem('smde_title')
      ls.removeItem('smde_content')
      this.simplemde.value('')
      this.simplemde.clearAutosavedValue()
    },
  }
}
</script>
