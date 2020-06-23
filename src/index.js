import _ from 'loadsh'
import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";
import './index.css'
import Logo from './assets/logo.jpg'
import XmlData from './data.xml'
import PrintMe, { cube } from './print'


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
  // btn.onclick = PrintMe
  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default
    print()
  })
  element.appendChild(btn)

  var btn2 = document.createElement('button')
  btn2.innerText = 'cube'
  btn2.onclick = cube
  element.appendChild(btn2)

  console.log(XmlData)

  return element;
}



window.addEventListener('load', function(){
   document.body.appendChild(component());
}, false)