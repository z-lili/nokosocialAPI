const {
  sendMessage,
  allUsers,
  deleteUser,
  deleteMoment,
  adminMessage,
  getUserByNames
} = require('../service/admin.service.js')

class AdminController {
  // 发布消息
  async sendMessage(ctx,next){
    const { id } = ctx.user
    const { content,title } = ctx.request.body
    const res = await sendMessage(content,title,id)
    ctx.body = res
  }
  // 获取所有用户
  async getAllUsers(ctx,next){
    const { offset,size } = ctx.query
    const res = await allUsers(offset,size)
    ctx.body = res
  }
  // 根据id删除用户
  async removeUser(ctx,next){
    const {uid} = ctx.params
    const res = await deleteUser(uid)
    ctx.body = res
  }
  // 根据id删除用户动态
  async removeMoment(ctx,necx){
    const {mid} = ctx.params
    const res = await deleteMoment(mid)
    ctx.body = res
  }
  // 获取管理员通知
  async adminMessage(ctx,next){
    const res = await adminMessage()
    ctx.body = res
  }
  // 根据用户名查询用户
  async getInfoByName(ctx,next){
    const { name } = ctx.params
    const res = await getUserByNames(name)
    ctx.body = res[0]
  }
}

module.exports = new AdminController()