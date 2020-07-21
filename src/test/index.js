function component () {
  var element = document.createElement('div')
  element.className = 'hello'

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // eslint-disable-next-line no-undef
  element.innerHTML = _.join(['Hello', '多页面'], ' ')
  // btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  //   const print = module.default
  //   print()
  // })
  //  element.appendChild(btn)

  return element
}

window.addEventListener('load', function () {
  document.body.appendChild(component())
}, false)
