// 校验的中间件

const errType = require('../constants/error-type.js')

const md5Password = require('../utils/password.handle.js')

const {
  getUserByName
} = require('../service/user.service.js')

// 对于用户注册 传入数据的校验
const verifyUser = async (ctx,next)=>{
  // 获取用户名，密码
  const { name,password } = ctx.request.body
  // 判断是否为空
  if(!name||!password||name===''||password===''){
    const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error',error,ctx)
  }
  // 判断是否重名
  const res = await getUserByName(name)
  if(res.length){
    const error = new Error(errType.NAME_HAS_EXISTS)
    return ctx.app.emit('error',error,ctx)
  }
  await next()
}

// 密码加密的中间件
const handlePassword = async (ctx,next)=>{
  let { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
