// 评论相关

const Router = require('koa-router')

const commentRouter = new Router({prefix:'/comment'})

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middlware.js')

const {
  create,
  replay,
  change,
  remove,
  list
} = require('../controller/comment.controller.js')

// 发表评论
commentRouter.post('/',verifyAuth,create)
// 回复评论
commentRouter.post('/:commentid/replay',verifyAuth,replay)
// 修改评论
commentRouter.patch('/:commentid',verifyAuth,verifyPermission,change)
// 删除评论
commentRouter.delete('/:commentid',verifyAuth,verifyPermission,remove)
// 根据动态id获取评论
commentRouter.get('/',list)

module.exports = commentRouter
