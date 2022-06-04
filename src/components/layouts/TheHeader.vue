<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <a href="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </a>
      </div>
      <!--
      in 这个样式是否显示看showCollapsedNav 变量是否为true
      -->
      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <!--
          active 这个样式是否显示看表达式结果是否为true
          -->
          <li v-for="(item, index) in navList" :key="index" :class="{ active: index === activeNavIndex }">
            <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
          </li>
        </ul>

        <!--登陆组件开始-->
        <div class="navbar-right">
          <SearchInput></SearchInput>
          <TheEntry></TheEntry>
        </div>
        <!--登陆组件结束-->

      </div>
    </div>
  </div>
</template>

<script>
import TheEntry from "@/components/layouts/TheEntry";
import SearchInput from '@/components/layouts/SearchInput'

export default {
  name: 'TheHeader',
  components:{
    TheEntry,
    SearchInput
  },
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}images/202101/26/48878/4NbpRGTbE3.png`,
        title: 'Learnku Vue.js'
      },
      navList: ['社区', '头条', '问答', '教程'],
      activeNavIndex: 0,          //选中第几个nav导航
      showCollapsedNav: false     //手机模式下是否展示菜单的函数
    }
  },
  beforeCreate() {
    this.uploadsUrl = 'https://cdn.learnku.com/uploads/'
  },
  methods: {
    /**
     * 改变nav第几个导航样式
     * @param index
     */
    changeNavIndex(index) {
      this.activeNavIndex = index
    },

    /**
     * 改变手机模式下是否显示菜单的方法
     */
    toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav
    }
  }
}
</script>

<style scoped>
.title { display: none;}
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>
