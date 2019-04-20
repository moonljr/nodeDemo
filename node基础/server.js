let http = require('http')
let fs = require('fs')
let path = require('path')
let server = http.createServer();
// 创建简易web 服务器
server.on('request', function (req,res) {
  res.writeHead(200, {'content-type': 'text/html'})
  // res.writeHead(200, {'content-type': 'application/json'}) // 设置返回json的请求头
  let myReadStream = fs.createReadStream(path.join(__dirname, './test.html'), 'utf8')
  myReadStream.pipe(res) // 创建流文件返回给前端页面就不需要res.end()了


  // let obj = {
  //   name: 'zhangsan',
  //   age: 18,
  //   job: 'programmer'
  // }
  //res.end(JSON.stringify(obj)); // 返回json
  // res.end('hello world') // 返回文本
})
server.listen(3000)