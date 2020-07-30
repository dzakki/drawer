// const baseUrl = "http://localhost:3000";
// const bs = "/libs/drawer/assets/bootstrap.min.css"
// const fontawesome = "/libs/drawer/dist/drawerJs.css"
import { 
  plugins, 
  contentConfig,
  pluginsConfig, 
  toolbars 
} from "./configDrawer";

let $, DrawerJs;

function installPackage(apiUrl, tag, new_element) {
    return new Promise((resolve) => {
     
      var element;
      if (tag) {
        element = document.createElement(new_element)
        element.rel = "stylesheet"
        element.href = apiUrl
      }else{
        element = document.createElement('script')
        element.src = apiUrl
      }
      element.onreadystatechange = element.onload = function () {
        if (!element.readyState || /loaded|complete/.test(element.readyState)) {
          setTimeout(function () {
            resolve()
          }, 500)
        }
      }
      document.getElementsByTagName(tag || 'body')[0].appendChild(element)
    //   document.getElementsByTagName('body')[0].appendChild("hai")
    })
}


export const init =  () => {
    return new Promise(async (resolve, rejected) => {
      try {
          const jquery = '/libs/drawer/jquery.js'
          const drawerjs = '/libs/drawer/dist/drawerJs.standalone.js'
          const bs = '/libs/drawer/assets/bootstrap.min.css'
          const fontawesome = "/libs/drawer/assets/font-awesome.min.css"
          const drawerCss = "/libs/drawer/dist/drawerJs.css"
          await installPackage(bs, "head", "link")
          await installPackage(fontawesome, "head", "link")
          await installPackage(drawerCss, "head", "link")
          await installPackage(jquery)
          await installPackage(drawerjs)
          console.log(window)
          $ = window.jQuery
          DrawerJs = window.DrawerJs
          console.log(DrawerJs, "< drawer:jquery > ", $)
          resolve()
      } catch (error) {
          console.error(error)
          rejected(error)
      }
    })
}

export const initDrawer =  () => {
  //  console.log()
  window.drawer = new DrawerJs.Drawer(null, {
    exitOnOutsideClick: false,
    plugins,
    contentConfig,
    corePlugins: [
        'Zoom' // use null here if you want to disable Zoom completely
    ],
    pluginsConfig,
    toolbars,
    defaultImageUrl: 'https://carstenschaefer.github.io/DrawerJs/examples/redactor/images/drawer.jpg',
    defaultActivePlugin : { name : 'Pencil', mode : 'lastUsed'},
    debug: true,
    activeColor: '#a1be13',
    transparentBackground: true,
    align: 'floating',  //one of 'left', 'right', 'center', 'inline', 'floating'
    lineAngleTooltip: { enabled: true, color: 'blue',  fontSize: 15}
  }, 400, 400);

  $(document).ready(function () {
      $('#canvas-editor').append(window.drawer.getHtml());
      window.drawer.onInsert();
      window.drawer.api.startEditing();
      if (localStorage.getItem('whiteboard_canvas') !== null) {
          console.log("masuk sni")
          // window.drawer.loadCanvas(localStorage.getItem('whiteboard_canvas'))
          const jsonData = JSON.parse(JSON.parse(localStorage.getItem('whiteboard_canvas')))
          window.drawer.api.loadCanvasFromData(jsonData)
      }else {
          // window.drawer.loadCanvas({"objects":[],"background":"#ffffff"})
          window.drawer.api.loadCanvasFromData({"objects":[],"background":"#ffffff"})
      }
      // window.drawer.api.startEditing();
    
      // window.drawer.api.stopEditing();
      // var parseData = JSON.parse(localStorage.getItem('canvas-1'))
      // console.log(JSON.parse(parseData))
  });
}