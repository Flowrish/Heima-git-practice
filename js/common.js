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

async function dataRender() {
  const token=localStorage.getItem('token')
  const res= await axios({
    url: '/dashboard',
    // headers:
    //   { Authorization: token }
  })
  console.log(res);
  console.log(token);
  const overview=res.data.data.overview
  Object.keys(overview).forEach(ele => {
    document.querySelector(`.${ele}`).innerText=overview[ele]
  })
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
axios.interceptors.response.use(response => {

  return response
}, error => {
  if (error.response.status === 401)
  {
    console.dir(error);
    debugger
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    setTimeout(() => {
      // login.html和index.html的相对关系
     location.href='./login.js'
    }, 1500)
  }
  return Promise.reject(error)
})