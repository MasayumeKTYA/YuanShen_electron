const { app, BrowserWindow, ipcMain, dialog, } = require('electron')
const { join } = require('path');


const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    resizable: false, // 禁止调整窗口大小
    autoHideMenuBar: true, //选项栏
    center: true,
    // frame: false,
    icon: join(__dirname, 'asset/Genshin Impact.jpg'),  //自定义图标
    webPreferences: {  //  html 渲染进程   该文件 主进程 
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.loadFile('index.html')
  win.on('ready-to-show', () => {
    win.show()
  })
}


app.whenReady().then(() => {
  createWindow()
  // 打开文件部分
  openFile()
  //提示选择游戏
  tipSelectGame()
})
// 打开文件部分
function openFile() {
  ipcMain.on('open-file-dialog', (event, args) => {
    dialog.showOpenDialog({ properties: ['openFile'] })
      .then((result) => {
        const selectedFile = result.filePaths[0];

        // 发送选中的文件路径给渲染进程
        console.log(args);
        event.reply('selected-file', [selectedFile, args]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
// 提示选择游戏
function tipSelectGame() {
  ipcMain.on('tip', () => {
    dialog.showMessageBoxSync({ message: '请选择游戏', title: '提示', icon: join(__dirname, 'asset/Genshin Impact.jpg') })
  })
}
