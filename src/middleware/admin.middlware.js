const errorType = require('../constants/error-type.js')

class AdminMidllware {
  // 校验是否有权限使用管理员接口 1表示管理员 0表示普通用户
  async verifyAdmin(ctx,next){
    const isAdministrator = ctx.user.isAdministrator
    try{
      if(isAdministrator == 0){
        const error = new Error(errorType.IS_NOT_PERMISSION)
        return ctx.app.emit('error',error,ctx)
      }else {
        await next()
      }
    }catch(err){
      console.log(err)
    }
  }
}

module.exports = new AdminMidllware()