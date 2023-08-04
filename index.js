const { createApp } = Vue
const { ipcRenderer } = require('electron');
createApp({
  data() {
    return {
      list: [{
        id: 'Yuan',
        select: false,
        src: './asset/Genshin Impact.jpg',
        isPath: false
      },
      {
        id: 'Star',
        select: false,
        src: './asset/Star Rail.jpg',
        isPath: false
      }, {
        id: 'Impact',
        select: false,
        src: './asset/favicon.ico',
        isPath: false
      }],
      currentClick: -1,
      localPath: null
    }
  },
  created() {
    if (this.localPath == null) {
      localStorage.setItem('path', JSON.stringify([]))
    }
    this.localPath = JSON.parse(localStorage.getItem('path'))
    console.log(this.localPath);
    this.ipcListener()
  },
  methods: {
    //选择路径
    SelectUrl(item) {
      console.log(item);
      ipcRenderer.send('open-file-dialog', item);
    },
    //样式切换
    clickSwitchStyleLli(index) {
      this.list.forEach(item => {
        item.select = false
      });
      this.currentClick = index
      this.list[index].select = true
    },
    //移进移出
    onHover(falg, index) {
      //拦截 点击的不触发
      if (this.currentClick == index) {
        return
      }
      console.log(falg);
      this.list[index].select = falg
    },
    //启动
    start() {
      if (this.currentClick == -1) {
        ipcRenderer.send('tip');
        return
      }
      const path = this.localPath[this.currentClick]
      this.exeCF(path)
      console.log(path);
    },
    ipcListener() {
      //监听主进程的信息
      const that = this
      ipcRenderer.on('selected-file', (event, arr) => {
        console.log(arr);
        if (arr[0] == undefined) {
          return
        }
        let path = arr[0].replace(/\\/g, '/')
        path = '"' + path + '"'
        console.log(path);
        if (arr[1] === "Yuan") {
          that.localPath[0] = path
          localStorage.setItem('path', JSON.stringify(this.localPath))
        }
        if (arr[1] === "Star") {
          that.localPath[1] = path
          localStorage.setItem('path', JSON.stringify(this.localPath))
        }
        if (arr[1] === "Impact") {
          that.localPath[2] = path
          localStorage.setItem('path', JSON.stringify(this.localPath))
        }
      });
    },
    exeCF(exePath) {
      exec(exePath, (error, stdout, stderr) => {
        if (error) {
          console.error(`执行exe文件时出错：${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`执行exe文件产生了错误输出：${stderr}`);
          return;
        }
        console.log(`exe文件的输出：${stdout}`);
      });
    }
  },
}).mount('#app')
