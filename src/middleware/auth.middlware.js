// 登录相关的校验中间件

const errType = require('../constants/error-type.js')
const md5Password = require('../utils/password.handle.js')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config.js')
const {
  getUserByName
} = require('../service/user.service.js')

const {
  check
} = require('../service/auth.service.js')

class AuthMiddleware {
  // 登录验证
  async verifyLogin(ctx,next){
    const { name,password } = ctx.request.body
    // 判断用户名密码是否为空
    if(!name||!password||name===''||password===''){
      const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
      return ctx.app.emit('error',error,ctx)
    }
    // 判断用户是否存在
    const res = await getUserByName(name)
    const user = res[0]
    if(!user){
      const error = new Error(errType.USER_NOT_EXISTS)
      return ctx.app.emit('error',error,ctx)
    }
    // 判断输入密码是否正确
     if(md5Password(password) !== user.password){
      const error = new Error(errType.PASSWORD_IS_INCORRECT)
      return ctx.app.emit('error',error,ctx)
     }
    //  校验通过，保存用户信息
    ctx.user = user
    await next()
  }

  // 验证该用户是否有登录（token）
  async verifyAuth(ctx,next){
    // 1,获取token,看用户是否有token
    const authorization = ctx.headers.authorization
    if(!authorization){
    //没有token就不会有这个字段 
    const error = new Error(errType.VERIFICATION_FAIlED)
    return ctx.app.emit('error',error,ctx)
    }
    const token = authorization.replace('Bearer ','')
    // 2,验证token
    try{
      const res = jwt.verify(token,PUBLIC_KEY,{
        algorithms:['RS256']
      })
      ctx.user = res
      await next()
    }catch(err){
      const error = new Error(errType.VERIFICATION_FAIlED)
      ctx.app.emit('error',error,ctx)
    }
  }
  // 校验用户是否有某一权限（如修改，删除动态，只能操作自己的动态）
  async verifyPermission(ctx,next){
    // 获取参数 用户id，表名,对应动态、评论···的id
    const userid = ctx.user.id
    // 获取表名 "commentid": "4" 数组解构
    const [resorceName] = Object.keys(ctx.params)
    const tableName = resorceName.replace('id','')
    const id = ctx.params[resorceName]
    const res = await check(tableName,userid,id)
    // 根据用户id和动态id没有查询到对应动态（无权限）
    if(!res){
    const error = new Error(errType.IS_NOT_PERMISSION)
    return ctx.app.emit('error',error,ctx) 
    }
    await next()
  }
}

module.exports = new AuthMiddleware()

