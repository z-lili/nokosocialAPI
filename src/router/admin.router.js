const Router = require('koa-router')


const adminRouter = new Router({prefix:'/administrater'})

const {
  verifyAuth
} = require('../middleware/auth.middlware.js')

const {
  verifyAdmin
} = require('../middleware/admin.middlware.js')


const {
  sendMessage,
  getAllUsers,
  removeUser,
  removeMoment,
  adminMessage,
  getInfoByName
} = require('../controller/admin.controller.js')

// 发布通知 必须要登录 要是管理员
adminRouter.post('/',verifyAuth,verifyAdmin,sendMessage)
// 获取所有用户
adminRouter.get('/allUsers',verifyAuth,verifyAdmin,getAllUsers)
// 根据id删除用户
adminRouter.delete('/removeUser/:uid',verifyAuth,verifyAdmin,removeUser)
// 根据id删除用户动态
adminRouter.delete('/removeMoment/:mid',verifyAuth,verifyAdmin,removeMoment)
// 获取管理员通知
adminRouter.get('/message',verifyAuth,adminMessage)
// 根据用户名查询用户
adminRouter.get('/:name',verifyAuth,verifyAdmin,getInfoByName)

module.exports = adminRouter