# NodeJS

## art-template 模板引擎

- [文档](https://aui.github.io/art-template/zh-cn/docs/)

```js
// 基于模板路径渲染模板
template(filename, data)
// var html = template('./index.html', { name: '吃鸡' })

// 将模板源代码编译成函数并立刻执行
template.render(source, data)
// var html = template.render('<div>{{ name }}</div>', {name: '大吉大利'})

// 将模板源代码编译成函数
var render = template.compile(source)
render(data)
// var render = template.compile('<div>{{ name }}</div>')
// var html = render({name: '大吉大利'})
```

## hacknews 数据处理

- 采用`后端渲染`将模板页面和数据渲染为用户能够看懂的正常页面返回

## url模块

- 说明：用于 URL 处理与解析
- 注意：通过url拿到的查询参数都是字符串格式

```js
// 导入url模块
var url = require('url')

// 解析 URL 字符串并返回一个 URL 对象
// 第一个参数：表示要解析的URL字符串
// 第二个参数：是否将query属性（查询参数）解析为一个对象，如果为：true，则query是一个对象
var ret = url.parse('http://localhost:3000/details?id=1&name=jack', true)
console.log(ret.query) // { id: '1', name: 'jack' }
```

## querystring模块

- 用于解析与格式化 URL 查询字符串
- 注意：只在专门处理查询字符串时使用

```js
// foo=bar&abc=xyz&abc=123
var querystring = require('querystring')

// 将查询参数转化为对象
// 第一个参数: 要解析的 URL 查询字符串
querystring.parse('foo=bar&abc=xyz') // { foo: 'bar', abc: 'xyz' }
```

## 服务端重定向

- [HTTP 状态码说明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- [301 和 302](http://shuai.be/archives/301-302-redirection/)
- 说明：服务端可以通过HTTP状态码让浏览器中的页面重定向

```js
res.writeHead(302, {
  'Location': '/'
})
```

## POST请求参数的处理

- 说明：POST请求可以发送大量数据，没有大小限制

```js
// 接受POST参数
var postData = []

// data事件：用来接受客户端发送过来的POST请求数据
req.on('data', function (chunk) {
  postData.push(chunk)
})

// end事件：当POST数据接收完毕时，触发
req.on('end', function () {
  var result = Buffer.concat(postData)
  console.log(result.toString())
})
```

## 其他模板引擎

- [ejs](https://github.com/mde/ejs)
- [underscore](http://www.css88.com/doc/underscore/)
- [jade/pug](https://github.com/pugjs/pug)

- 安装：`npm i ejs`
- 安装：`npm i underscore`
- 安装：`npm i pug`

```js
// ejs 示例：
var html = ejs.render('<%= name %>喜欢吃：<%= food %>', {
  name: 'rose',
  food: '西红柿'
})
console.log(html)

// underscore 示例：
var compiled = _.template("hello: <%= name %>")
var ret = compiled({ name: 'moe' })
console.log(ret)
```

## node 中的模块化

- 一个js文件就是一个模块
- 每个模块都是一个独立的作用域

```html
模块化：
  网页模式进化到了 Webapp模式，功能复杂 -> 加载更多JS -> 如何更好的JS文件？
  比如：按需加载
```

### 模块分类

- 1 核心模块
  - 由 node 本身提供，不需要单独安装（npm），可直接引入使用
- 2 第三方模块
  - 由社区或个人提供，需要通过npm安装后使用
- 3 自定义模块
  - 由我们自己创建，比如：app.js

### 核心模块

- fs：文件操作模块
- http：网络操作模块
- 基本使用：1 先引入  2 再使用

```js
// 引入模块
var fs = require('fs')
```

### 第三方模块

- 第三方模块是由 社区或个人 提供的
- 比如：mime模块/art-template/jquery...
- 基本使用：1 先通过npm下载 2 再引入 3 最后使用

### 用户自定义模块

- 由开发人员创建的模块（JS文件）
- 基本使用：1 创建模块 2 引入模块
- 注意：自定义模块的路径必须以`./`开头

```js
// 加载模块
require('./a')     // 推荐使用，省略.js后缀！

require('./a.js')
```

### 模块化规范的使用

- 1 加载模块：`require('fs')`
- 2 导出模块：`module.exports` 或 `exports`

### module.exports 和 exports 的关系

- 模块中默认导出：`module.exports`
- `exports` 是 `module.exports` 的引用
- 注意：给 `module.exports` 赋值会切断与 `exports` 之间的联系
  - 1 直接添加属性两者皆可
  - 2 赋值操作时，只能使用 `module.exports`

```js
console.log( module.exports === exports ) // ==> true

// 等价操作
module.exports.num = 123
exports.num = 123

// 赋值操作：不要使用 exports = {}
module.exports = {}
```

### 第三方模块（以mime包为例）

- 先基于当前文件模块所属目录找 node_modules 目录
- 如果找到，则去该目录中找 mime 目录
- 如果找到 mime 目录，则找该目录中的 package.json 文件
- 如果找到 package.json 文件，则找该文件中的 main 属性
- 如果找到 main 属性，则拿到该属性对应的文件路径
- 如果找到 mime 目录之后
  - 发现没有 package.json
  - 或者 有 package.json 没有 main 属性
  - 或者 有 main 属性，但是指向的路径不存在
  - 则 node 会默认去看一下 mime 目录中有没有 index.js index.node index.json 文件
- 如果找不到 index 或者找不到 mime 或者找不到 node_modules
- 则进入上一级目录找 node_moudles 查找规则同上
- 如果上一级还找不到，继续向上，一直到当前文件所属磁盘根目录
- 如果最后到磁盘根目录还找不到，最后报错：`can not find module xxx`

### CommonJS 规范参考文档

- [module (模块)](http://nodejs.cn/api/modules.html)
- [CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html)
- [浅析JS模块规范：AMD，CMD，CommonJS](http://www.jianshu.com/p/09ffac7a3b2c)
