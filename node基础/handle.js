let fs = require('fs')
let path = require('path')

function home(res) {
  res.writeHeader(200, {
    'content-type': 'text/html;charset=utf-8'
  })
  fs.createReadStream(path.join(__dirname, './test.html')).pipe(res)
}

function review(res) {
  res.writeHeader(200, {
    'content-type': 'text/html;charset=utf-8'
  })
  fs.createReadStream(path.join(__dirname, './review.html')).pipe(res)
}

function apiRecords(res, params) {
  let obj = {
    name: 'zhangsan',
    age: 18
  }
  res.end(JSON.stringify(params))
}

module.exports = {
  home,
  review,
  apiRecords
}