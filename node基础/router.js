let fs = require('fs')
let path = require('path')
function route(pathname, handle, res, params) {
  if(typeof handle[pathname] === 'function') {
    handle[pathname](res, params)
  }else {
    // 如果没有对应的路由  就去404页面
       res.writeHeader(200, {
         'content-type': 'text/html;charset=utf-8'
       })
       fs.createReadStream(path.join(__dirname, './404.html')).pipe(res)
  }
}

module.exports = {
  route
}