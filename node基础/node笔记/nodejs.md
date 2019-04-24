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
fs.readFile(path.join(__dirname, 'readMe.txt'), 'utf8', (err, data) => {
  if (err) {
    return console.log('文件读取失败')
  }
  console.log('data', data)
  if (data) {
    fs.writeFile('test.txt', data, function() {
      console.log('write')
    })
  }
})
```

##### writeFile

> 异步写入文件

```js
// test.txt写入文件的名称  data 写入文件的内容   回调函数
fs.writeFile('test.txt', data, function() {
  console.log('write')
})
```

##### unlink

> 异步删除文件

```js
// test.txt 文件名 回调函数
fs.unlink('test.txt', err => {
  if (err) throw err
  console.log('异步删除文件')
})
```

##### unlinkSync

> 同步删除文件

```js
fs.unlinkSync('test1.txt')
```

##### mkdirSync

> 同步创建文件夹

```js
fs.mkdirSync('stuff')
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
fs.mkdir('sutff', function() {
  fs.readFile('./readMe.txt', 'utf8', (err, data) => {
    fs.writeFile('./sutff/sutReadMe.txt', data, err => {
      if (err) throw new Erroe(err)
    })
  })
})
```

##### createReadStream 与 createWriteStream

> createReadStream 创建读取流文件
>
> createWriteStream 创建写入流文件

```js
let fs = require('fs')
let path = require('path')
var myReadyStream = fs.createReadStream(path.join(__dirname, './readMe.txt'))
var myWriteStream = fs.createWriteStream(
  path.join(__dirname, './testStream.txt')
)

// 使用管道 写入流
//myReadyStream.pipe(myWriteStream)

// 另一种写入文件的方式
var writeData = 'hello world'
myWriteStream.write(writeData, 'utf8')
myWriteStream.end()
myWriteStream.on('finish', function() {
  console.log('finish')
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

#### 使用 express 处理 post 与 get 请求

```js
let express = require('express')
let fs = require('fs')
// 处理上传的文件需要使用这个插件
let multer = require('multer')
// 中间件 用于解析post请求的数据
let bodyParser = require('body-parser')
let url = require('url')
let app = express()
// 上传的文件存储的路径(上传文件的名称随机数)
// let upload = multer({
//   dest: 'uploads/'
// })
// // 解析  application/x-www-form-urlencoded 格式的数据
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
// // 解析 application/json格式的数据
// app.use(bodyParser.json())
// 如果需要同时解析 application/x-www-form-urlencoded 与 application/json格式的数据 使用下面这种方式 单独配置路由的请求解析方式
let urlencodedParser = bodyParser.urlencoded({
  extended: true
})
let jsonParse = bodyParser.json()
// 修改上传文件的文件名 开始---
// 查看是否有上传文件的目录 如果没有就创建目录
let createFolder = folder => {
  try {
    fs.accessSync(folder)
  } catch (error) {
    fs.mkdirSync(folder)
  }
}
// 定义目录路径及名称
let uploadFolder = './upload'
// 检测目录是否存在
createFolder(uploadFolder)
// 修改文件名称
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function(req, file, cb) {
    // cb(null, file.fieldname + '_' + Date.now());
    // 使用上传文件的原名称
    cb(null, file.originalname)
  }
})
let upload = multer({
  storage
})
// 修改上传文件的文件名 结束---
// post请求 处理application/json格式的数据
app.post('/', jsonParse, (req, res) => {
  console.log('req.boay', req.body)
  let str = 'this is post request'
  let obj = {
    data: req.body,
    errMsg: '',
    status: 200
  }
  res.send(obj)
})
// post请求 处理 application/x-www-form-urlencoded
app.post('/urlencoded', urlencodedParser, (req, res) => {
  console.log('req.boay', req.body)
  let str = 'this is post request'
  let obj = {
    data: req.body,
    errMsg: '',
    status: 200
  }
  res.send(obj)
})
/**
 * 上传文件接口
 * upload.single('file') single('file') 里边的file是上传文件的input的name值
 */
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body)
  let json = {
    status: 1
  }
  res.json(json)
})
// 返回页面一个表单页  用来上传文件
app.get('/form', (req, res) => {
  let form = fs.readFileSync('./from.html', {
    encoding: 'utf8'
  })
  res.send(form)
})
// 解析get请求的参数 ？name=zhangsan&age=18
app.get('/', (req, res) => {
  // 通过req.query获取到get请求的参数对象
  console.log('res.query', req.query)
  res.send('解析get参数' + req.query.find)
})
// 动态路由
app.get('/test/:id', (req, res) => {
  console.log('req', req.params.id)
  let response = 'this is home page>>>>' + req.params.id
  res.send(response)
})
// 监听3000端口
app.listen(3000)
console.log('linstening to port 3000')
```
