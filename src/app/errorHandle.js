// 错误处理函数

const errType = require('../constants/error-type')

const errorHandler = (error,ctx)=>{
  let status,message
  switch (error.message) {
    case errType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或者密码不能为空~'
      break;
    case errType.NAME_HAS_EXISTS:
      status = 409
      message = '用户名重复啦，换一个试试~'
      break;
    case errType.USER_NOT_EXISTS:
      status = 400
      message = '用户不存在~'
      break;
    case errType.PASSWORD_IS_INCORRECT:
      status = 400
      message = '密码错误，请重新输入~'
      break;
    case errType.VERIFICATION_FAIlED:
      status = 401
      message = '校验未通过，请登录后再试~'
      break;
    case errType.IS_NOT_PERMISSION:
      status = 402
      message = '您没有权限做此操作~'
      break;

    default:
      status = 404
      message = 'NOT FOUND'
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler