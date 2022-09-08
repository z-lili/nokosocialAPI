// 操作数据库 对数据库的操作应该是异步的
const { execute } = require('../app/database.js')
const connection = require('../app/database.js')

class UserService {
  // 用户注册
  async create(uname,password){
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`
    const res = await connection.execute(statement,[uname,password])
    return res[0]
  }
  // 查询用户
  async getUserByName(name){
    const statement = `SELECT * FROM users WHERE name = ?;`
    const res = await connection.execute(statement,[name])
    return res[0]
  }
  // 修改用户信息
  async updateUserInfo(userInfo,uid){
    try{
      const statement = `UPDATE users SET name=?,
      Signature=?,
      sex=?,
      address=?,
      College=?,
      specialized=?
      WHERE id=?;`
      const res = await connection.execute(statement,[userInfo.name,userInfo.signature,userInfo.sex,userInfo.address,userInfo.college,userInfo.speciallize,uid])
      return res[0]
    }catch(err){
      console.log(err)
    }
  }
  // 获取用户信息
  async getUserMessage(userid){
    const statement = `SELECT *FROM users WHERE id=?;`
    const res = await connection.execute(statement,[userid])
    return res[0]
  }
  // 查询点赞
  async findLike(mid,uid){
    const statement = `SELECT *FROM user_like_moment WHERE user_id=? AND moment_id=?;`
    const res = await connection.execute(statement,[uid,mid])
    return res[0].length === 0?true:false
  }
  // 点赞动态
  async userLikeMoment(mid,uid){
    const statement = `INSERT INTO user_like_moment (user_id,moment_id) VALUES (?,?);`
    const res = await connection.execute(statement,[uid,mid])
    return res[0]
  }
  // 删除点赞
  async removeLike(mid,uid){
    const statement = `DELETE FROM user_like_moment WHERE user_id=? AND moment_id=?;`
    const res = await connection.execute(statement,[uid,mid])
    return res[0]
  }
  // 更新avater表数据
  async updateAvater(filename,mimetype,size,uid){
    const statement = `UPDATE avater SET filename=?, mimetype=?,size=? WHERE user_id=?;`
    const res = await connection.execute(statement,[filename,mimetype,size,uid])
    return res
  }
}

module.exports = new UserService()
