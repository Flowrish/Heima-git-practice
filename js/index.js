
loginIf()

dataRender()
//
//
async function dataRender() {
  const token=localStorage.getItem('token')
  const res= await axios({
    url: '/dashboard',
    // headers:
    //   { Authorization: token }
  })
  console.log(res);
  console.log(token);
  debugger
  const overview=res.data.data.overview
  Object.keys(overview).forEach(ele => {
    document.querySelector(`.${ele}`).innerText=overview[ele]
  })
}

