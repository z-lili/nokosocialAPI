// 文件相关
const Router = require('koa-router')

const fileRouter = new Router({prefix:'/upload'})

const {
  verifyAuth
} = require('../middleware/auth.middlware.js')

const {
  // 使用koa-multer处理文件上传
  avaterHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middlware.js')

const {
  saveAvater,
  savePicture
} = require('../controller/file.contriller.js')

// 头像上传，保存头像信息到数据库
fileRouter.post('/avater',verifyAuth,avaterHandler,saveAvater)
// 动态配图上传
fileRouter.post('/picture',verifyAuth,pictureHandler,pictureResize,savePicture)
module.exports = fileRouter