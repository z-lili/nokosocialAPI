const Router = require('koa-router')


const authRouter = new Router({prefix:'/login'})

const {
  verifyLogin
} = require('../middleware/auth.middlware.js')

const {
  login
} = require('../controller/auth.controller.js')

// 用户登录
authRouter.post('/',verifyLogin,login)

module.exports = authRouter