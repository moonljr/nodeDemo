var server = require('./testRouter')
var router = require('./router')
let handler = require('./handle')
let handle = {}
handle['/'] = handler.home
handle['/home'] = handler.home
handle['/review'] = handler.review
handle['/api/v1/records'] = handler.apiRecords
server.startServer(router.route, handle)

/**
* app.js 做为入口文件
  router 做为路由文件
  handle 做为专门处理路由事件的文件
  testRouter 做为web服务器
  将handle对象的key值设置为路由的地址 在router 中可以直接 handle[pathname]() 调用路由对应的事件
*/

// let http = require('http')
// let server = http.createServer();
// server.on('request',(req,res) => {
//   console.log('req',req.url);
//   res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
//   res.write('hello nodejs')
//   res.end()
// })
// server.listen(3000)
// console.log('hello world');

// setTimeout(() => {
//   console.log('3 secondl have passed');
// }, 3000);
// console.log(__dirname);
// console.log(__filename);
// var count = require('./count')
// console.log(count.count([1, 2, 3, 4]));
// console.log(count.adder(2,3));
// let event = require('events')
// let utils = require('util')

// function Person(name) {
//    this.name = name
// }
// utils.inherits(Person, event.EventEmitter)
// let xiaoming = new Person('xiaoming');
// let lili = new Person('lili');
// let luck = new Person('luck');
// let person = [xiaoming, lili, luck]
// person.forEach( e => {
//   e.on('speak', (message)=> {
//     console.log(e.name + 'said: ' + message);
//   })
// })
// xiaoming.emit('speak', 'hi xiaoli')
// lili.emit('speak', 'hello lili')
// luck.emit('speak', 'testluck')