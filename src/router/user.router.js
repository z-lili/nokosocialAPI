const Router = require('koa-router')

const userRouter = new Router({prefix:'/users'})

// 校验的中间件
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middlware.js')

const {
  verifyAuth,
} = require('../middleware/auth.middlware.js')

const {
  avaterHandler
} = require('../middleware/file.middlware')

const {
  register,
  avaterInfo,
  changeUserInfo,
  getUserInfo,
  likeMoment,
  removeFile,
  updateAvater
} = require('../controller/user.controller.js')

// 用户注册
userRouter.post('/',verifyUser,handlePassword,register)
// 获取用户头像信息
userRouter.get('/:userid/avater',avaterInfo)
// 修改用户信息
userRouter.patch('/:usersid',verifyAuth,changeUserInfo)
// 获取用户信息
userRouter.get('/:usersid',getUserInfo)
// 用户点赞动态(双击取消点赞)
userRouter.post('/likeMoment/:mid',verifyAuth,likeMoment)
// 修改用户头像
userRouter.patch('/change/avater',verifyAuth,removeFile,avaterHandler,updateAvater)

module.exports = userRouter
