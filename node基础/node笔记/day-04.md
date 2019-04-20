# NodeJS

- [跨站点脚本（Cross-site scripting，XSS）](http://qingbob.com/Excess-XSS/)

## 模块化改造hackernews

- `app.js`模块
- `extend.js`模块
- `router.js`模块
- `handler.js`模块

## Express 框架

- **基于 Node.js 平台，快速、开放、极简的 web 开发框架**
- [express 官网](http://expressjs.com/)
- [express 中文网](http://expressjs.com.cn/)

### 起步

- 安装：`npm i express`

```js
// 导入 express
var express = require('express')
// 创建 express实例，也就是创建 express服务器
var app = express()

// 路由
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// 启动服务器
app.listen(3000, function () {
  console.log('服务器已启动')
})
```

### API说明

- `express()`：创建一个Express应用，并返回，即：app
- `app.get()`：注册一个GET类型的路由
  - 注意：只要注册了路由，所有的请求都会被处理（未配置的请求路径，响应404）
- `res.send()`：发送数据给客户端，并自动设置Content-Type
  - 参数可以是：字符串、数组、对象、Buffer
  - 注意：只能使用一次
- `req` 和 `res`：与http模块中的作用相同，是扩展后的请求和响应对象

## 注册路由的三种方式

- 1 `app.METHOD`：比如：app.get / app.post / app.delete / app.patch
- 2 `app.all(path, callback)`
  - 注意：path 与 请求地址必须完全相同
  - 注意：可以处理任意的请求类型
- 3 `app.use(path, callback)` 更重要的作用是处理中间件
  - 注意：只要是以path开头的请求地址，都可以被use处理
  - 注意：可以处理任意的请求类型
  - 注意：path参数可省略，默认值为：`/`

## 模拟Apache服务器

- `req.path`：请求路径
  - 示例：URL为'example.com/users?sort=desc'，path表示：`/users`
- `res.sendFile()`

### 处理静态资源

- 静态资源：图片、CSS、JavaScript 文件 等
- 如何处理？使用 express.static() 方法来托管静态资源
- 注意：`express.static()`可以调用多次
- 思考：`app.use('/web', express.static('web'))` 的含义？
  - 访问：`http://localhost:3000/web/anoceanofsky.jpg`

```js
// 托管web目录下的静态资源
app.use(express.static('web'))
// 相当于：app.use('/', express.static('web'))

// 访问上述静态资源
// http://localhost:3000/anoceanofsky.jpg

// 当请求达到服务器后，express就会到web目录下，查找anoceanofsky.jpg
// 并读取该文件，返回给浏览器
```

## request常用属性和方法

```js
// 获取请求路基中的参数，是一个对象 ---> Get请求参数
req.query

// 获取POST请求参数，需要配置`body-parser`模块， POST请求参数
req.body
```

- 获取`POST`请求参数

```js
// 导入body-parser模块
var bodyParser = require('body-parser');
// 将POST请求参数转化为对象，存储到req.body中
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 此时，就可以获取到POST请求参数了
console.log(req.body)
```

## response常用属性和方法

```js
// send() 发送数据给客户端，并自动设置Content-Type
res.send()

// 发送文件给浏览器，并根据文件后缀名自动设置Content-Type
// 注意：文件路径必须是绝对路径
res.sendFile(path.join(__dirname, 'index.html'))

// 设置HTTP响应码
res.sendStatus(200) // equivalent to res.status(200).send('OK')

// 设置响应头
res.set('Content-Type', 'text/plain')
res.set({
  'Content-Type': 'text/plain',
  'cute': 'fangfang'
})

// 重定向
res.redirect('/index')
```

## Express使用模板引擎

```js
// 为后缀为html的模板设置模板引擎
app.engine('html', require('express-art-template'))

// 设置模板文件所在的目录
app.set('views', './')
// 设置模板文件的后缀为 html
app.set('view engine', 'html')

// 渲染 index.html 模板文件，并发送给浏览器
res.render('index', { list: [] })
```

## Express 中外置路由使用

- 目的：将路由封装到一个独立的路由模块中，有利于代码的封装和模块化

```js
/*
  router.js 文件代码如下:
*/

// 1 加载 express 模块
var express = require('express')

// 2 调用 express.Router() 方法，得到一个路由容器实例
var router = express.Router()

// 3 为 router 添加不同的路由
router.get('/', function (req, res) {
  res.send('hello express')
})
router.get('/add', function (req, res) {

})

// 4. 将 router 路由容器导出
module.exports = router
```

```js
/*
  在 app.js 文件中：
*/
var express = require('express')

// 1 加载上面自定义的路由模块
var router = require('./router')

var app = express()

// 2. 将自定义路由模块 router 通过 app.use() 方法挂载到 app 实例上
//    这样 app 实例程序就拥有了 router 的路由
app.use( router )

app.listen(3000, function () {
  console.log('running...')
})
```

## 使用express重构hacker-news案例
