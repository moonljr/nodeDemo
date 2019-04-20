# NodeJS

## 根据不同请求输出不同响应数据

- [request.url](http://nodejs.cn/api/http.html#http_message_url)
- `req.url`：获取请求路径
  - 例如：请求`http://127.0.0.1:3000/index` 获取到的是：`/index`
  - 例如：请求`http://127.0.0.1:3000/` 获取到的是：`/`
  - 例如：请求`http://127.0.0.1:3000` 获取到的是：`/`

## 服务器响应文件

- 注意：浏览器中输入的URL地址，仅仅是一个标识，不与服务器中的目录一致。也就是说：返回什么内容是由服务端的逻辑决定

```js
server.on('request', function(req, res) {
  var url = req.url
  if(url === '/') {
    fs.readFile('./index.html', function(err, data) {
      if(err) {
        return res.end('您访问的资源不存在~')
      }

      res.end(data)
    })
  }
})
```

## 模拟Apache服务器

- 根据 `req.url` 读取不同的页面内容，返回给浏览器

## MIME类型

- MIME(Multipurpose Internet Mail Extensions)多用途Internet邮件扩展类型 是一种表示文档性质和格式的标准化方式
- 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档；因此服务器将正确的MIME类型附加到响应对象的头部是非常重要的
- [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types)

### mime模块

- 作用：获取文件的MIME类型
- 安装：`npm i mime`

```js
var mime = require('mime')

// 获取路径对应的MIME类型
mime.getType('txt')                    // ⇨ 'text/plain'
// 根据MIME获取到文件后缀名
mime.getExtension('text/plain')        // ⇨ 'txt'
```

## npm - Node包管理工具

- node package manager
- [npm官网](https://npmjs.com)

> npm is the package manager for JavaScript and the world’s largest software registry. Discover packages of reusable code — and assemble them in powerful new ways.

```html
npm 是JavaScript的包管理工具，并且是全球最大的软件登记处
发现可重用代码的包 - 并以强有力的新方式进行组装。
```

- 理解：通过`npm`来快速安装开发中使用的包
- 只要安装了node.exe，那么就可以使用npm了

### npm的基本使用

- 1 初始化package.json文件：`npm init -y`
- 2 安装项目中用到的包：`npm install 包名称 --save`

### package.json

- 概述：包（项目）描述文件，用来管理组织一个包（项目），它是一个纯JSON格式的
  - 包描述文件：描述自己、描述自己对别人的依赖关系
- 初始化npm配置文件：`npm init` 或 `npm init -y`快速生成
- 作用：不用拷贝项目依赖项，只需要使用`package.json`，通过`npm i`就可以安装项目所有依赖项

- 命令：`npm i`安装项目所有的依赖项（包括开发依赖）
- 命令：`npm i --production`安装项目依赖项（不包括开发依赖）

### 常用命令

- 安装包：`npm install 包名称`，简写：`npm i 包名称`
- 安装指定版本的包：`npm install 包名称@版本号`
- 全局安装：`npm i -g nodemon` （-g 是 --global的简写）
- 项目依赖安装：`npm i -S jquery` （-S 是 --save的简写）
  - `--save`或`-S`的作用: 往 package.json 中的dependencies里面添加包,但是现在已经不需要了, 只要安装包, 就会自动往 dependencies 写配置项
  - `npm i jquery` 相当于: `npm i -S jquery` 相当于: `npm install jquery --save`
- 项目开发依赖安装：`npm i -D less`（仅在开发期间使用，上线的项目中不会用到）
  - `-D`是：`--save-dev`的简写

### 其他操作

- 查看版本：`npm -v`
- 删除包：`npm uni 包名称 -S`

```html
解决包下载错误问题的方式：

1 将 C:\Users\当前登录用户\AppData\Roaming 目录中的 npm-cache 文件夹删除，然后，再重新下载包，一般就不会有问题了
2 npm cache clean --force
```

### 本地安装和全局安装

- 全局安装的意义：只是为了可以当做命令行使用而已，即：在任意目录中都可以使用某个命令

### npm的常用命令

```html
1 全局安装( 只要安装一次 )
  npm i -g nodemon / npm i nodemon -g

2 本地安装( 随着项目走, 一个项目安装一次 )
  npm i jquery    表示作为项目依赖安装, 不管开发期间还是线上代码, 都要用到这个包
  npm i -D less   -D 表示这个包只在开发期间使用, 线上的代码是不会用到这个包的
```

## npm下载加速

### 淘宝镜像和cnpm

- [淘宝镜像](http://npm.taobao.org/)
- 安装：`npm i cnpm -g --registry=https://registry.npm.taobao.org`

```shell
# 设置淘宝镜像
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

### nrm

- nrm：npm registry manager（npm仓库地址管理工具）
- 安装：`npm i -g nrm`

```shell
# 带*表示当前正在使用的地址

# 查看仓库地址列表
nrm ls

# 切换仓库地址
nrm use taobao
```

## nodemon 自动重启

- 作用：监视到js文件修改后，自动重启node程序
- 安装：`npm i -g nodemon`
- 使用：`nodemon app.js` 运行node程序

## hacknews案例

- [Hacker News 示例](https://news.ycombinator.com/)
- [HTTP 响应码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- 路由（route）：就是一套映射规则（一对一的对应规则），根据url分配到对应的处理程序

### 功能划分

- 1 新闻列表页 - /index    get
- 2 新闻详情页 - /details  get
- 3 新闻添加页 - /submit   get
- 4 新闻添加请求 - /add    post
  - 1 跳转到添加页面
  - 2 完成新闻的添加
  - 3 添加完成后，跳转会首页，并且在首页第一条展示刚添加的新闻
- 帐号密码：fangfang fangfangdage

- 模块化（render/router/handler）

## 前端渲染和后端渲染

- 前端渲染：前台页面ajax请求，获取后端数据，通过拼接字符串或者模板引擎将数据组装为HTML，并展示给用户
- 后端渲染：也叫后端直出，由后台拿到数据并且渲染页面，然后，将拼接好的html结构返回给浏览器

### 前后端合作开发模式

- 1 前后端混合开发
  - 套模板：前端写好静态页面，后端将静态页面修改为后端可以使用的模板页面，并渲染页面
  - 劣势：后端等前端把页面写好（后端依赖于前端）
- 2 前后端半混合开发
  - 前端写好页面，一部分由后端渲染，一部分由前端渲染
  - 哪部分适合后端渲染？首页（ 首屏加载时间，衡量网站性能的重要标准，网络请求尽可能少 ）
  - 哪部分适合前端渲染？首页下面的列表页，当滚动到某个位置的时候，才会加载这块内容，所以，这些内容是适合做前端渲染的
- 3 前后端分离（职责的分离）
  - 前端写好页面，并渲染数据，后端只提供数据接口
  - 也可以使用后端渲染
  - mock 假数据
