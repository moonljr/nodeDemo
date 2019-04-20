let fs = require('fs')
let path = require('path')
var myReadyStream = fs.createReadStream(path.join(__dirname, './readMe.txt'))
var myWriteStream = fs.createWriteStream(path.join(__dirname, './testStream.txt'));
// 使用管道 写入流
myReadyStream.pipe(myWriteStream)



// 另一种写入文件的方式
// var writeData = 'hello world'
// myWriteStream.write(writeData, 'utf8');
// myWriteStream.end();
// myWriteStream.on('finish', function() {
//   console.log('finish');
// })
// 另一种写入文件的方式 结束



// myReadyStream.setEncoding('utf8');
// let data  = '';
// // 监听流文件的读取过程
// myReadyStream.on('data', function( chunk) {
//   // console.log('chunk', chunk); chunk 是 stream 文件
//   // data += chunk
//   // myWriteStream.write(chunk); // 将流文件写入testStream.txt
// })
// //  监听流文件结束的时候会触发该函数
// myReadyStream.on('end', function() {
//   console.log('data>>', data);
// })