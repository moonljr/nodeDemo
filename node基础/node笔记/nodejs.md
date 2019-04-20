### nodejs 

##### readFileSync  

> 同步读取文件 

```js
var readMe = fs.readFileSync(path.join(__dirname, './readMe.txt'), 'utf8')
// readMe 是读取到  readMe.txt文件中的内容
```

##### writeFileSync  

> 同步写入文件

```js
fs.writeFileSync('weireMe.txt', 'hello world')
// hello world 是写入到weireMe.txt中的内容
```

##### readFile

> 异步读取文件

```js
// path.join(__dirname, 'readMe.txt') 读取文件的地址  utf8 字符集  回调函数
fs.readFile(path.join(__dirname, 'readMe.txt'), 'utf8', (err,data) => {
  if(err) {
    return console.log('文件读取失败');
  }
  console.log('data',data);
  if(data) {
    fs.writeFile( 'test.txt', data, function () {
      console.log('write');
    })
  }
})
```

##### writeFile

> 异步写入文件

```js
// test.txt写入文件的名称  data 写入文件的内容   回调函数
fs.writeFile( 'test.txt', data, function () {
      console.log('write');
})
```

##### unlink

> 异步删除文件

```js
// test.txt 文件名 回调函数
fs.unlink('test.txt', (err) => {
  if(err) throw err
  console.log('异步删除文件');
})
```

##### unlinkSync

> 同步删除文件

```js
fs.unlinkSync('test1.txt')
```

##### mkdirSync 

>同步创建文件夹

```js
fs.mkdirSync('stuff');
```

##### rmdirSync

> 同步删除文件夹

```js
fs.rmdirSync('stuff')
```

##### mkdir 

> 异步创建文件夹

```js
// 异步创建文件夹 sutff  然后异步读取 readMe.txt的内容  然后再异步写入./sutff/sutReadMe.txt中
fs.mkdir('sutff', function () {
  fs.readFile('./readMe.txt', 'utf8', (err, data) => {
    fs.writeFile('./sutff/sutReadMe.txt', data, (err)=> {
      if(err) throw new Erroe(err);
    })
  })
})
```



##### createReadStream 与createWriteStream

> createReadStream 创建读取流文件
>
> createWriteStream 创建写入流文件

```js
let fs = require('fs')
let path = require('path')
var myReadyStream = fs.createReadStream(path.join(__dirname, './readMe.txt'))
var myWriteStream = fs.createWriteStream(path.join(__dirname, './testStream.txt'));

// 使用管道 写入流
//myReadyStream.pipe(myWriteStream)

// 另一种写入文件的方式
var writeData = 'hello world'
myWriteStream.write(writeData, 'utf8');
myWriteStream.end();
myWriteStream.on('finish', function() {
  console.log('finish');
})
// 另一种写入文件的方式 结束



// myReadyStream.setEncoding('utf8');
// let data  = '';
// // 监听流文件的读取过程
// myReadyStream.on('data', function( chunk) {
//   // console.log('chunk', chunk); chunk 是 stream 文件
//   // data += chunk
		// 第一种写入流文件的方式
//   // myWriteStream.write(chunk); // 将流文件写入testStream.txt
		// 第一种写入流文件的方式 结束
// })
// //  监听流文件结束的时候会触发该函数
// myReadyStream.on('end', function() {
//   console.log('data>>', data);
// })
```

