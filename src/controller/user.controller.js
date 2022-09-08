const fs = require('fs')
const errType = require('../constants/error-type.js')

const config = require('../app/config.js')

const {
  getAvaterInfo
} = require('../service/file.service.js')

const {
  create,
  updateUserInfo,
  getUserMessage,
  userLikeMoment,
  findLike,
  removeLike,
  updateAvater,
  updateMomentPic
} = require('../service/user.service.js')


class UserController {
  // 用户注册
  async register(ctx,next){
    const { name,password } = ctx.request.body
    const result = await create(name,password)
    ctx.body = result
  }
  // 获取用户头像信息
  async avaterInfo(ctx,next){
    const { userid } = ctx.params
    const avaterMessage = await getAvaterInfo(userid)
    // 设置响应的类型为图片，浏览器可以解析，否则浏览器会直接下载文件
    ctx.response.set('content-type',avaterMessage[0].mimetype)
    ctx.body = fs.createReadStream(`./uploads/avater/${avaterMessage[0].filename}`)
  }
  // 修改用户信息
  async changeUserInfo(ctx,next){
    const userMessage = ctx.user
    const userid = userMessage.id
    const userid2 = ctx.params.usersid
    const userInfo = ctx.request.body
    // 根据本人的id以及想要修改的用户id 比较 看是否有权限
    if(userid != userid2){
      const error = new Error(errType.IS_NOT_PERMISSION)
      return ctx.app.emit('error',error,ctx) 
    }else{
      const res = await updateUserInfo(userInfo,userid2)
      ctx.body = res
    }
  }
  // 获取用户信息
  async getUserInfo(ctx,next){
    const userid = ctx.params.usersid
    const res = await getUserMessage(userid)
    ctx.body = res[0]
  }
  // 点赞动态（双击取消点赞）
  async likeMoment(ctx,next){
    const { mid } = ctx.params
    const { id } = ctx.user
    // 查询有无点赞
    const res = await findLike(mid,id)
    if(res){
      // 未点赞，点赞
      const result = await userLikeMoment(mid,id)
      ctx.body = 'fablous'
    }else{
      // 已经点赞，删除
      const result2 = await removeLike(mid,id)
      ctx.body = 'cancelFablous'
    }
  }
  // 删除文件夹中的头像
  async removeFile(ctx,next){
    const { id } = ctx.user
    const fileInfo = await getAvaterInfo(id)
    if(fileInfo){
      // 用户已经有头像了 删除文件夹中的头像
      const filename = fileInfo[0].filename
      fs.unlink(`./uploads/avater/${filename}`,function(error){
        if(error){
            console.log(error)
            return false
        }
        console.log('删除文件成功')
    })
    }
    await next()
  }
  // 用户更改头像后更新avater表以及用户表中的avater信息
  async updateAvater(ctx,next){
    try{
      const { mimetype,filename,size } = ctx.req.file
      const { id } = ctx.user
      await updateAvater(filename,mimetype,size,id)
      ctx.body = '更新头像成功'
    }catch(err){
      console.log(err)
    }
  }
}


module.exports = new UserController()