let express = require('express')
let fs = require('fs')
let path = require('path')
// 导入ejs
let ejs = require('ejs')
// 处理上传的文件需要使用这个插件
let multer = require('multer')
// 中间件 用于解析post请求的数据
let bodyParser = require('body-parser')
let url = require('url')
let app = express();
//设置视图模板的默认后缀名为.ejs,
app.set('view engine', 'ejs');
//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views', path.join(__dirname, './view'));

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
let createFolder = (folder) => {
  try {
    fs.accessSync(folder)
  } catch (error) {
    fs.mkdirSync(folder)
  }
}
// 定义目录路径及名称
let uploadFolder = './upload';
// 检测目录是否存在
createFolder(uploadFolder)
// 修改文件名称
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '_' + Date.now());
    // 使用上传文件的原名称
    cb(null, file.originalname);
  }
})
let upload = multer({
  storage
})
// 修改上传文件的文件名 结束---
// post请求 处理application/json格式的数据
app.post('/', jsonParse, (req, res) => {
  console.log('req.boay', req.body);
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
  console.log('req.boay', req.body);
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
  console.log(req.body);
  let json = {
    status: 1
  }
  res.json(json);
})
// 返回页面一个表单页  用来上传文件
app.get('/form/:name', (req, res) => {
  // 读取html 返回给页面
  // let form = fs.readFileSync('./from.html', {
  //   encoding: 'utf8'
  // })
  // 使用这种方式也可以直接返回页面给浏览器
  // res.sendFile(path.join(__dirname, './from.html'))
  // 使用ejs模板引擎 并且给页面传递参数
  // let person = req.params.name
  // res.render('form', {
  //   person: person
  // })
  // 模板引擎中使用列表
  let data = {
    name: 'moon',
    age: 18,
    list: [
      'one',
      'two',
      'three'
    ]
  }
    res.render('form', {
      data: data
    })
})
// 解析get请求的参数 localhost:3000/?name=zhangsan&age=18
app.get('/', (req, res) => {
  // 通过req.query获取到get请求的参数对象 ?name=zhangsan&find=18
  console.log('res.query', req.query);
  res.send('解析get参数' + req.query.find)
})
// 动态路由 /test/id
app.get('/test/:id', (req, res) => {
  // req.params.id  获取到动态的id
  console.log('req', req.params.id);
  let response = 'this is home page>>>>' + req.params.id
  res.send(response)
})
// 监听3000端口
app.listen(3000)
console.log('linstening to port 3000');