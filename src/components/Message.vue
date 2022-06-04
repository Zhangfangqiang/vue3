<template>
  <div v-show="show" :class="`alert alert-${type} alert-dismissible`">
    <button @click="close" type="button" class="close"><span>×</span></button>
    {{ msg }}
  </div>
</template>

<script>
const message = {
  name: 'Message',
  props: {
    // 是否显示消息框
    show: {
      type: Boolean,
      default: false
    },
    // 消息框的类型
    type: {
      type: String,
      default: 'success'
    },
    // 消息
    msg: {
      type: String,
      default: ''
    }
  },
  watch: {
    show(value) {
      if (value) {
        //如果传入新的值延迟执行会调
        this.$nextTick(() => {
          this.$el.scrollIntoView(true)
        })
      }
    }
  },

  methods: {
    close() {
      console.log(this.$emit('update:show', false))
    }
  }
}

export function setupMessageComponent(app) {
  app.component("Message", message);
}

export default message;
</script>

<style scoped>

</style>
