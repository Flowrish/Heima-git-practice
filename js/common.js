// 抽取轻提示函数
axios.defaults.baseURL = 'https://hmajax.itheima.net'
function showToast(msg) {
  const toastDom = document.querySelector('.my-toast')
  // 实例化toast组件
  const toast = new bootstrap.Toast(toastDom)
  // 修改内容并显示
  document.querySelector('.toast-body').innerText = msg
  toast.show()
}

function loginIf() {
  const token = localStorage.getItem('token')
  console.log(token);
  if (!token) {
    showToast('请先登录')
    setTimeout(e => {
      location.href='./login.html'
    },1500)
  }
}
//Authorization
axios.interceptors.request.use(function (config) {
  console.log(config);
  const token = localStorage.getItem('token')
  if(token)
  config.headers['Authorization'] = token
  return config
}, function (error) {
  return Promise.reject(error)
})