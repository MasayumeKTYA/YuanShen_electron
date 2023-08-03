const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    width: 1200,


    height: 800,
    resizable: false, // 禁止调整窗口大小

    autoHideMenuBar: true, //选项栏
    center: true,
    // frame: false, 
    // icon:'' 自定义图标
    webPreferences: {  //  html 渲染进程   该文件 主进程 
      nodeIntegration: true,
      contextIsolation: false,
    },

  })
  //win.loadURL('https://github.com')
  win.loadFile('index.html')
  win.on('ready-to-show', () => {
    win.show()
  })
}

app.whenReady().then(() => {
  createWindow()
})