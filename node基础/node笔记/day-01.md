# NodeJS - day01

## 为什么要学NodeJS

- NodeJS是前端的基础设施
- 作为前端开发工程师（FE）需要具备一定的服务端开发能力
- 降低多编程语言切换的成本
- 全栈工程师
- [全栈式JavaScript](http://blog.jobbole.com/52745/)
- [为什么要用 Node.js](http://blog.jobbole.com/100058/)

## 官方介绍

- [NodeJS官网](https://nodejs.org/en/)
- [NodeJS中文网](http://nodejs.cn/)

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

```html
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。
Node.js 的包管理器 npm，是全球最大的开源库生态系统。

runtime 运行时（运行环境）
PHP代码要想运行需要借助于Apache这个服务器（运行时，运行环境）
JavaScript代码想要运行：需要有一个JavaScript的运行时即可
  在web端，浏览器就可以看作JS的运行时
  在Node端，Node就是JS的运行时
```

### 理解Node

- Node.js 是一个开发平台，就像PHP开发平台、Java开发平台、.Net开发平台、Apple开发平台一样。
  - 开发平台：有对应的编程语言、有语言运行时、有能实现特定功能的API

- 编程语言：JavaScript
- 运行时：Chrome V8 JavaScript引擎
- 特定功能API：文件操作、网络操作 等

- 问题：在Node中能够操作DOM、BOM吗？？？ 不能！！！
- 浏览器和Node中公共的部分是：ECMAScript

### 特点

- 非阻塞 异步I/O（input/output）
- 事件驱动
- 单线程
  - `一切都在并行执行 —— 除了你的代码（Evetything runs in parallel — except your code.）`
- 跨平台

```html
Node 适合做：
  I/O密集型操作，比如：文件操作
  高并发处理

Node 不适合做：
  CPU密集型操作：大量长时间的计算
```

### 能做什么

- 提供服务端编程能力
- 开发 Web应用程序（网站）、控制台程序（命令行程序、CLI程序）、桌面应用程序（GUI）（借助 node-webkit、electron 等框架实现）
  - 1 操作数据库
  - 2 网站后台开发，为前台提供接口

### 其他参考资料

- [JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/)
- [Node.js背后的V8引擎优化技术](http://geek.csdn.net/news/detail/52208)
- [CNODE社区](http://cnodejs.org)

## Web开发本质

- 1 请求，客户端发起请求
- 2 处理，服务器处理请求
- 3 响应，服务器将处理结果发送给客户端

---

## 安装Node

- [下载地址](https://nodejs.org/en/download/)
- 官网术语解释
  - LTS 版本：Long-term Support 版本，长期支持版，即稳定版。
  - Current 版本：Latest Features 版本，最新版本，新特性会在该版本中最先加入。
- 验证是否安装成功：在终端输入 `node -v`，如果打印出版本号，即安装成功

## nodejs 初体验

- 1 helloworld.js 第一个node程序
- 2 文件操作 - 读文件
- 3 文件操作 - 写文件
- 4 http操作 - 开启服务

## NodeJS 你好

- 1 创建js文件 `helloworld.js`
- 2 写入：`console.log('hello nodejs')`
- 3 打开命令窗口 `cmd`
- 4 执行命令：`node helloworld.js`

```html
说明：
  node命令 实际上调用的是 node.exe 这个可执行文件
  通过 node.exe 读取执行 helloworld.js 文件中的代码，并执行

通过node运行js代码的过程，类似于：浏览器加载 html页面，并执行script标签中的js代码
```

- 练习：打印三角形

```js
// process.stdout 标准输出，将内容输出到终端中显示
// 特点：不换行

for (var i = 0; i < 10; i++) {
  for (var j = 0; j <= i; j++) {
    process.stdout.write('* ')
  }
  process.stdout.write('\n')
}
```

## NodeJS 文件操作

- 两种文件操作：1 异步 2 同步
- 说明：推荐使用异步操作
- 说明：Node中采用错误优先的处理方式
- [支持的文件编码](https://stackoverflow.com/questions/14551608/list-of-encodings-that-node-js-supports)

- 异步文件读取：

```js
// 引包
var fs = require('fs')
// readFile() 读取文件API
// 第一个参数：文件路径
// 第二个参数：回调函数
fs.readFile('./data/test.txt', function (err, data) {
  // err    错误信息
  // data   文件内容（Buffer 二进制数据流，数组每一项为：16进制数据）
  // data.toString() 将读取到的文件内容，转化为：uft8编码格式
  console.log(data.toString())
})
```

- 异步文件写入：

```js
var fs = require('fs')
// 第一个参数：文件路径
// 第二个参数：写入文件的数据
// 第三个参数：回调函数
fs.writeFile('./data/foo.txt', '写入文件的数据', function (err) {
  // 错误处理
  if(err) {
    return console.log('写入文件失败')
  }

  console.log('写入文件成功')
})
```

- 同步文件读取和同步文件写入：

```js
// 同步读取文件内容：
// var data = fs.readFileSync('./data/test.txt', 'utf8')
var data = fs.readFileSync('./data/test.txt').toString()
console.log(data)

// 同步写入文件内容：
fs.writeFileSync('./data/bar.txt', '写入内容')
```

## 路径说明

- `__dirname`：正在执行的js文件所在的目录路径
- `__filename`：正在执行的js文件的路径

### path 模块

- 说明：强大的路径操作模块

```js
var path = require('path')

// 获取文件绝对路径
path.join(__dirname, 'app.js')

// 当前目录下的 src目录下的 app.js
path.join(__dirname, 'src', 'app.js')

// 当前目录下的 上一级目录的 abc目录
path.join(__dirname, '..', 'abc')
```

## NodeJS 与 错误处理

- 说明：通过`try-catch`语句可以用来捕获代码中的错误，使得程序不会蹦掉

```js
try {
  console.log(a)
} catch (err) {
  console.log('捕获到异常：', err)
}
```

```js
// 无法捕获异步代码异常：

try {
  fs.readFile('./data/test.txt1', function(err, data) {
    // 代码出现异常，外面的 try-catch 是无法捕获到的！
  });
} catch (e) {

}
```

### 异步API错误处理

- 注意：`try-catch`无法捕获异步操作中的错误
- 正确处理方式：
  - 1 先处理错误，再进行其他操作（错误优先）
  - 2 封装异步代码报错，应该逐级向上暴露错误给调用者，由调用者处理错误

```js
// 封装读文件操作，并进行错误处理
function getFiles(path, callback) {
  fs.readFile(path, function(err, data) {
    if(err) {
      // 将错误抛出，由使用者决定错误如何处理
      return callback(err);
    }

    // 没有错误的处理方式（模拟内置API）
    callback(null, data);
  });
}

// 调用
getFiles('./a.txt', function (err, data) {
  if (err) {
    // 进行错误处理
  }

  console.log(data)
})
```

## 构建HTTP服务 - 请求处理响应

- 目标：构建一个基础服务器

### 基本服务器

```js
// 1 导入 http 模块
var http = require('http')

// 2 创建服务器
var server = http.createServer()

// 3 添加request事件，当有请求到达服务器后，执行回调函数中的代码
server.on('request', function(req, res) {
  res.end('有请求到达服务器')
})

// 4 启动服务器，让服务器监听3000端口
server.listen(3000, function() {
  console.log('服务器已启动')
})
```

### 创建HTTP服务器说明

- 1 服务器监听某个端口号
- 2 `request`事件：每次接收到一个请求时触发
- 3 `req`表示：请求对象，`res`表示：响应对象
- 4 必须调用`res.end()`结束响应，浏览器才会收到服务器返回的数据

### response对象API

- [response](http://nodejs.cn/api/http.html#http_class_http_serverresponse)

- `res.write(chunk)`：用于给浏览器发送响应数据，可以调用多次
  - chunk：数据块
- `res.end([data])`：结束响应，即：所有响应头和响应主体都已被发送，只能调用一次
  - 如果指定了 data，则相当于调用`res.write(data)` 之后再调用`res.end()`
- `res.setHeader(name, value)`：设置一个响应头
- `res.writeHead()`：设置HTTP状态码和响应头
- 注意：1 先设置响应头，再返回（`write()`）数据
- 注意：2 `setHeader()` 必须在 `writeHead()` 之前调用

```js
// 设置HTTP状态码
res.statusCode = 200
// 设置http响应状态消息
res.statusMessage = 'OK'

res.setHeader('Content-Type', 'text/html')
res.writeHead(200, {
  // 中文编码
  'Content-Type': 'text/plain; charset=utf-8',
  'LiangLiang': 'cute'
})
```

---

## 环境变量

- 应用场景：通过命令打开任意可执行文件

- 默认情况下，如果想要通过命令来启动 可执行文件（.exe） ，只在程序所属目录起作用
- 通过配置 环境变量，可以使得这个命令在任何目录中都有效

```html
找到环境变量：计算机 --右键--> 属性 --> 高级系统设置 --> 高级 --> 环境变量
```

### 环境变量添加的两种方式

- [MAC 环境变量](http://elf8848.iteye.com/blog/1582137)
- 1 直接将可执行程序所在目录配置到PATH中
  - `F:\devFiles\Git`
- 2 新建（用户）环境变量 `FEIQ_HOME`，使用 `%FEIQ_HOME%` 配置到PATH中
  - 变量名：`FEIQ_HOME` 变量值：`F:\devFiles\Git`（不带分号）

### 输入命令执行过程

- 1 首先在当前路径目录中查找和改字符串匹配的可执行文件
- 2 进入用户 path 环境变量查找
- 3 进入系统 path 环境变量查找

---

## REPL介绍

- REPL 全称: Read-Eval-Print-Loop（交互式解释器）
  - R 读取 - 读取用户输入，解析输入的 Javascript数据结构并存储在内存中
  - E 执行 - 执行输入的数据结构
  - P 打印 - 输出结果
  - L 循环 - 循环操作以上步骤直到用户两次按下 `ctrl + C` 退出

- 在REPL中编写程序（类似于浏览器开发人员工具中的控制台功能）
- 进入：直接在控制台输入 `node` 命令进入 REPL 环境
- 退出：按两次 `ctrl + C` 退出REPL界面 或者 输入 `.exit` 退出
- 注意：**进入Node的REPL后，只能写JavaScript代码**

---

### Buffer和字符编码

Node.js 目前支持的字符编码包括：

- `ascii` 仅支持 7位 ASCII 数据。如果设置去掉高位的话，这种编码方法是非常快的。
- `utf8` 多字节编码的Unicode字符。许多网页和其他文档格式使用 UTF-8 。
- `utf16le` 2或4个字节，小端编码的Unicode字符。支持代理对（U+10000 to U+10FFFF）。
- `ucs2` 是 `utf16le` 的别名。
- `base64` Base64 字符串编码。当从一个字符串创建一个 buffer 时，按照 RFC 4648, Section 5 里的规定，这种编码也将接受正确的“URL和文件名安全字母”。
- `binary` 一种把 buffer 编码成一字节（latin-1）编码字符串的方式。目前不支持 `latin-1` 字符串。通过 `binary` 来代替 `latin-1` 使用 `latin-1` 编码。
- `hex` 将每个字节编码为两个十六进制字符。

```js
// 使用:
var buf = Buffer.from('hello world', 'ascii')
console.log(buf.toString('hex'))

// 默认情况: buf.toString() 相当于
buf.toString('utf8')
```