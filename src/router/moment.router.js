const Router = require('koa-router')

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middlware.js')

const {
  moment,
  detail,
  list,
  update,
  remove,
  getMomentPicture,
  likeStuation,
  myMoment,
  isFablous,
  comentStuation
} = require('../controller/moment.controller.js')

const momentRouter = new Router({prefix:'/moment'})

// 用户需要登录后才能发表动态，所以有个verifyAuth校验token的中间件
momentRouter.post('/',verifyAuth,moment)
// 获取用户动态（单条）
momentRouter.get('/:momentid',detail)
// 获取用户动态列表
momentRouter.get('/',list)
// 修改动态(需要登录，并且只能修改自己的动态)
momentRouter.patch('/:momentid',verifyAuth,verifyPermission,update)
// 删除动态
momentRouter.delete('/:momentid',verifyAuth,verifyPermission,remove)
// 获取动态配图(根据filename获取，在查询到的moment表中图片url格式为 "http://localhost:8888/images/3089584c24e8ac4c7a7f2d778105c930)
momentRouter.get('/images/:filename',getMomentPicture)
// 根据用户id获取所有动态点赞情况
momentRouter.get('/like/situation',verifyAuth,likeStuation)
// 根据用户id获取动态
momentRouter.get('/mymoment/:uid',myMoment)
// 根据动态id获取是否点赞了该条动态
momentRouter.get('/likes/:momentid',verifyAuth,isFablous)
// 根据用户id获取所有动态评论情况
momentRouter.get('/coment/situation',verifyAuth,comentStuation)

module.exports = momentRouter
