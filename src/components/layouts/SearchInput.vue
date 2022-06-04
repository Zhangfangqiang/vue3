<template>
  <div class="navbar-form navbar-left hidden-sm">
    <div class="form-group">
      <!--
      .enter：回车键；
      .tab：制表键；
      .delete：删除和退格键；
      .esc：中止键；
      .space：空格键；
      .up：向上方向键；
      .down：向下方向键；
      .left：向左方向键；
      .right：向右方向键；
      -->
      <input
        v-model.trim="value"
        type="text"
        class="form-control search-input mac-style"
        placeholder="搜索"
        @keyup.enter="search"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      value: ''
    }
  },
  // 添加计算属性
  computed: {
    searchValue: {
      //获取searchValue 这个变量会调用get 方法
      get() {
        console.log(1)
        return this.$store.state.searchValue
      },
      //赋值会调用这个方法
      set(newValue) {
        console.log(2)
        this.value = newValue
      }
    }
  },
  methods: {
    search() {
      const value = this.value

      if (value !== '') {
        this.$router.push({ name: 'Search', query: { q: value } })
      }
    },
    // 更新 searchValue
    updateSearchValue() {
      this.$store.commit('UPDATE_SEARCH_VALUE', this.value)
    }
  }
}
</script>

<style scoped>
.search-input { background-image: url(https://cdn.learnku.com/assets/images/icon-search.png)}
</style>
