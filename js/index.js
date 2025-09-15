const login_form = document.querySelector('.login-form')
const btn_login = document.querySelector('#btn-login')
console.log(btn_login);
btn_login.addEventListener('click', async e => {
  const username = login_form.querySelector('[name=username]')
  console.log(username);
  console.log(e.target);
})