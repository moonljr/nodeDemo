let http = require('http')
let url = require('url')
let server = http.createServer()
let queryString = require('querystring')
let startServer = function (route, handle) {
  server.on('request', function (req, res) {
    let pathname = url.parse(req.url).pathname
    let data = ''
    req.on('error', function (err) {
      console.error(err);
    }).on('data', function (chunk) {
      data += chunk
    }).on('end', function () {
      if(req.method === 'POST') {
        route(pathname, handle, res, queryString.parse(data))
      } else {
            if (pathname !== '/favicon.ico') {
              let params = url.parse(req.url, true).query
              route(pathname, handle, res, params)
            }
      }
    })
  })
}
server.listen(3000)
module.exports = {
  startServer
}