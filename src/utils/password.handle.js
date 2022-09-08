// 对密码进行MD5加密 node自带的库crypto
const crypto = require('crypto')
const md5Password = (password)=>{
  const md5 = crypto.createHash('md5')
  const res = md5.update(password).digest('hex') //digest('hex')将结果转成16进制
  return res
}

module.exports = md5Password