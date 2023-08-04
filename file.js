
const { exec } = require('child_process');
const { ipcRenderer } = require('electron');
const arr = []
const yuan = document.querySelector('#Yuan')
const Star = document.querySelector('#Star')
const Impact = document.querySelector('#Impact')
const start = document.querySelector("#start")
const li = document.querySelectorAll('.liChild')
// 缓存获取路径
const yuanShen = JSON.parse(localStorage.getItem('yuan'))
const starRail = JSON.parse(localStorage.getItem('star'))
const Impact3 = JSON.parse(localStorage.getItem('impact'))
console.log(yuanShen, starRail, Impact3);
console.log(li);

yuan.addEventListener('click', SelectUrl)
Star.addEventListener('click', SelectUrl)
Impact.addEventListener('click', SelectUrl)

start.addEventListener('click', exeCF)



