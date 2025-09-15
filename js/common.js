//<div class="toast-body">提示消息</div>
axios.defaluts.baseURl='https://hmajax.itheima.net/'
const toast_Com = new bootstrap.Toast(document.querySelector('.my-toast'))
// console.log(toast_Com);
function Alert(msg) {
  const message= document.querySelector('.toast-body').innerText=msg
  toast_Com.show(message)
}