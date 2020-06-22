import _ from 'loadsh'
import './index.css'
import Logo from './assets/logo.jpg'
import XmlData from './data.xml'
import PrintMe from './print'

function component() {
  var element = document.createElement("div");
  element.className = 'hello'

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  var myIcon = new Image()
  myIcon.src = Logo
  element.appendChild(myIcon)

  var btn = document.createElement('button')
  btn.innerText = 'button'
  btn.onclick = PrintMe
  element.appendChild(btn)

  console.log(XmlData)

  return element;
}



window.addEventListener('load', () => {
   document.body.appendChild(component());
}, false)