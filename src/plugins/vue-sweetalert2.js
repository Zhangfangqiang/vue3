import swal from 'sweetalert2'

export default {
  install: (app) => {
    // sweetalert2 的设置默认配置的方法
    swal.setDefaults({
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(140,212,245)',
      cancelButtonColor: 'rgb(193,193,193)'
    })

    // 添加全局方法

    // 添加实例方法 配置了一个全局变量
    app.config.globalProperties.$swal = swal
  }
}
