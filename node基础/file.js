var fs = require('fs');
let path = require('path')
// 同步读取文件
// var readMe = fs.readFileSync(path.join(__dirname, './readMe.txt'), 'utf8')
// console.log('readMe:', readMe);
// 同步写入文件
// fs.writeFileSync('weireMe.txt', 'hello world')
// 异步读取文件
fs.readFile(path.join(__dirname, 'readMe.txt'), 'utf8', (err,data) => {
  if(err) {
    return console.log('文件读取失败');
  }
  console.log('data',data);
  if(data) {
    // 异步写入文件
    fs.writeFile( 'test.txt', data, function () {
      console.log('write');
    })
  }
})
console.log('fist');
