
const connection = require('../app/database.js')

class AuthService {
  // 根据传入的表名
  // 验证用户是否具备某一权限,根据用户id和动态id查询对应的动态，或评论
  async check(tableName,userid,id){
    const statement = `SELECT *FROM ${tableName} WHERE id=? AND user_id=?;`
    const res = await connection.execute(statement,[id,userid])
    return res[0].length === 0?false:true
  }
}

module.exports = new AuthService()