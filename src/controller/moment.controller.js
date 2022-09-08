
const fs = require('fs')

const {
  moment,
  getMomentByid,
  getMomentList,
  updateMoment,
  removeMoment,
  getPicture,
  likeStuations,
  getMyMoment,
  comentStuations
} = require('../service/moment.service.js')
const {
  findLike
} = require('../service/user.service')

class MomentController {
  // 发表动态
  async moment(ctx,next){
    // 拿到用户id和动态内容 插入数据库
    const id = ctx.user.id
    const content = ctx.request.body.content
    const res = await moment(id,content)
    ctx.body = res[0]
  }
  // 获取用户动态（单条）
  async detail(ctx,next){
    const mid = ctx.params.momentid
    const res = await getMomentByid(mid)
    ctx.body = res[0]
  }
  // 获取用户动态列表
  async list(ctx,next){
    const { offset,size } = ctx.query
    const res = await getMomentList(offset,size)
    ctx.body = res
  }
  // 修改动态
  async update(ctx,next){
    const { content } = ctx.request.body
    const { momentid } = ctx.request.params
    const res = await updateMoment(momentid,content)
    ctx.body = res
  }
  // 删除动态
  async remove(ctx,next){
    const { momentid } = ctx.request.params
    const res = await removeMoment(momentid)
    ctx.body = res
  }
  // 根据filename获取动态配图
  async getMomentPicture(ctx,next){
    let { filename } = ctx.params
    // 查询图片相关信息
    const pictureMessge = await getPicture(filename)
    const { type } = ctx.query
    const types = ['small','middle','larg']
    if(types.some(item=>item === type)){
      filename = filename +'-'+ type
    }
    ctx.response.set('content-type',pictureMessge[0].mimetype)
    ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
  }
  // 根据用户id获取所有动态点赞情况
  async likeStuation(ctx,next){
    const { id } = ctx.user
    const { offset,size } = ctx.query
    const res = await likeStuations(id,offset,size)
    ctx.body = res
  }
  // 根据用户id获取动态
  async myMoment(ctx,next){
    const { uid } = ctx.params
    const res = await getMyMoment(uid)
    ctx.body = res
  }
  // 
  async isFablous(ctx,next){
    const {momentid} = ctx.params
    const { id } = ctx.user
    // 查询有无点赞
    const res = await findLike(momentid,id)
    ctx.body = !res
  }
  // 根据用户id获取所有动态评论情况
  async comentStuation(ctx,next){
    const { id } = ctx.user
    const { offset,size } = ctx.query
    const res = await comentStuations(id,offset,size)
    ctx.body = res
  }
}

module.exports = new MomentController()