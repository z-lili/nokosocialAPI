
const Koa = require('koa')
// bodyparser解析客户端传来的数据
const bodyparser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyparser())

// 导入错误处理函数
const errorHandler = require('./errorHandle.js')

// 导入各个路由
const userRouter = require('../router/user.router.js')
const authRouter = require('../router/auth.router.js')
const momentRouter = require('../router/moment.router.js')
const commentRouter = require('../router/comment.router.js')
const fileRouter = require('../router/file.router.js')
const adminRouter = require('../router/admin.router.js')

// 使用各个路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())
app.use(momentRouter.routes())
app.use(momentRouter.allowedMethods())
app.use(commentRouter.routes())
app.use(commentRouter.allowedMethods())
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())
app.use(adminRouter.routes())
app.use(adminRouter.allowedMethods())

// 监听发生的错误
app.on('error',errorHandler)

// 导出koa实例app
module.exports = app