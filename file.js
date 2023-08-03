
const { exec } = require('child_process');

const arr = []
localStorage.setItem('app', JSON.stringify({ naem: 'bengh,path:12312' }))
console.log(localStorage.getItem('app'));

const btn = document.querySelector('#file')
const submit = document.querySelector('.submit')
const start1 = document.querySelector('.start1')
const start2 = document.querySelector('.start2')
function SelectUrl(e) {
  let normalizedPath = btn.files[0].path.replace(/\\/g, '/');
  normalizedPath = '"' + normalizedPath
  normalizedPath = normalizedPath + '"'
  arr.push(normalizedPath)
  console.log(normalizedPath);
}
submit.addEventListener('click', SelectUrl)
//执行exe文件

start1.addEventListener('click', confirm)
function confirm() {
  const exePath = arr[0];
  console.log(arr);
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
start2.addEventListener('click', Sar)
function Sar() {
  const exePath = arr[1];
  console.log(arr);
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
