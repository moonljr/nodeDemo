let fs = require('fs');
// 异步删除文件
// fs.unlink('test.txt', (err) => {
//   if(err) throw err
//   console.log('异步删除文件');
// })
// 同步删除文件
// fs.unlinkSync('test1.txt')
// 同步创建文件
// fs.mkdirSync('stuff');
// 同步删除文件
// fs.rmdirSync('stuff')
// 异步创建文件夹
fs.mkdir('sutff', function () {
  fs.readFile('./readMe.txt', 'utf8', (err, data) => {
    fs.writeFile('./sutff/sutReadMe.txt', data, (err)=> {
      if(err) throw new Erroe(err);
    })
  })
})