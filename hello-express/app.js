let express = require('express')
let app = express()
let indexRouter = require('./route/index')
let userRouter = require('./route/user')
// 使用路由中间件 分配路由
app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(3000)
console.log('listening port 3000');