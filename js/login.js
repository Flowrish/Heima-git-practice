const login_form = document.querySelector('.login-form')
const btn_login = document.querySelector('#btn-login')
btn_login.addEventListener('click', async e => {
  const username = login_form.querySelector('[name=username]')
  const password = login_form.querySelector('[name=password]')
  const Info=serialize(login_form,{hash:true,empty:true})
  if (!username.value||username.value.length<8)
    return Alert('用户名不能小于8位')
  else if (!password.value || password.value.length < 6)
    return Alert('密码不能小于6位')
  else {
    const loginMsg=await axios.post('/login',`${Info}`)
  }
})