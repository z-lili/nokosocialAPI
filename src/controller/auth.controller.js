const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config.js')

class AuthController {
  // 登录
  async login(ctx,next){
    const { id,name,isAdministrator } = ctx.user
    // 生成token
    const token = jwt.sign({id,name,isAdministrator},PRIVATE_KEY,{
      expiresIn:24*60*60*60,
      algorithm:"RS256"
    })
    // 响应用户信息以及token
    ctx.body = {
      id,
      name,
      token
    }
  }
}

module.exports = new AuthController()