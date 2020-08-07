var express = require('express');
var expressWs = require('express-ws');

var router = express.Router();
expressWs(router);
//初始三只模拟股票值
let stocks = {
    baidu: 80,
    tencent: 100,
    alibaba: 120,
  }
  //创建指定区间的随机数
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  //给原始值增加或减少成随机数
  function randomStockUpdate() {
    for (let stock in stocks) {
      let randomValue = randomInteger(-80, 80) / 100 //随机生成小数
      stocks[stock] = (new Number(stocks[stock]) + randomValue).toFixed(3) //转换成数字然后保留3位小数
    }
    //每一秒更新一次数据
    setTimeout(() => {
      randomStockUpdate()
    }, 1000)
  }
  randomStockUpdate() //调用
router
  .ws('/info', function (ws, req){
      console.log(req)
      ws.on('message', function (msg) {
        setInterval(() => {
          ws.send(JSON.stringify(stocks))
        }, 1000)
      })
   })

module.exports = router;
