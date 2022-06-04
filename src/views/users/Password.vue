<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2><i class="fa fa-lock"></i> 修改密码</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>

          <Message :show="msgShow" @update:show="msgShow = val" :type="msgType" :msg="msg"/>

          <div class="form-group">
            <label class="col-sm-2 control-label">密 码</label>
            <div class="col-sm-6">
              <input v-model.trim="password" id="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">确认密码</label>
            <div class="col-sm-6">
              <input v-model.trim="cpassword" v-validator.required="{ title: '确认密码', target: '#password' }" type="password" class="form-control">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updatePassword">应用修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPassword',
  data() {
    return {
      password: '', // 密码
      cpassword: '', // 确认密码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      this.password = user.password
    }
  },
  methods: {
    updatePassword(e) {
      setTimeout(() => {
        if (e.target.canSubmit) {
          this.$store.dispatch('updateUser', { password: this.cpassword })
          this.showMsg('修改成功')
        }
      })
    },
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    }
  }
}
</script>

<style scoped>

</style>
