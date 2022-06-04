<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2><i class="fa fa-picture-o"></i> 请输入头像地址</h2>
        <hr>
        <div data-validator-form>
          <Message :show="msgShow" @update:show="msgShow = val" :type="msgType" :msg="msg"/>

          <div class="form-group">
            <label>头像预览：</label>
            <div>
              <img :src="avatar" class="avatar-preview-img">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-8">
              <input v-model.trim.lazy="avatar" v-validator.required="{ title: '头像地址' }" type="text" class="form-control avatar-input">
            </div>
            <div class="clearfix"></div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-primary" @click="updateAvatar">上传头像</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditAvatar',
  data() {
    return {
      avatar: '', // 头像地址
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      this.avatar = user.avatar
    }
  },
  methods: {
    /**
     * 更新头像
     */
    updateAvatar() {
      const avatar = this.avatar

      if (avatar) {
        let img = new Image()

        img.onload = () => {
          this.$store.dispatch('updateUser', { avatar })
          this.showMsg('上传成功')
        }

        img.onerror = () => {
          this.showMsg('上传失败', 'danger')
        }

        img.src = avatar
      }
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
.avatar-preview-img { min-width: 200px; min-height: 200px; max-width: 50%;}
</style>
