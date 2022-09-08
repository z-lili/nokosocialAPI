
const connection = require('../app/database.js')

class AdminService {
  // 发布消息
  async sendMessage(content,title,uid){
    const statement = `INSERT INTO administrater (content,title,user_id) VALUES (?,?,?);`
    const res = await connection.execute(statement,[content,title,uid])
    return res[0]
  }
  // 获取所有用户
  async allUsers(offset,size){
    const statement = `SELECT *FROM users LIMIT ?,?;`
    const res = await connection.execute(statement,[offset,size])
    return res[0]
  }
  // 删除用户
  async deleteUser(uid){
    const statement = `DELETE FROM users WHERE id=?;`
    const res = await connection.execute(statement,[uid])
    return res[0]
  }
  // 删除动态
  async deleteMoment(mid){
    const statement = `DELETE FROM moment WHERE id=?;`
    const res = await connection.execute(statement,[mid])
    return res[0]
  }
  // 获取管理员通知
  async adminMessage(){
    const statement = `SELECT *FROM administrater ORDER BY id DESC;`
    const res = await connection.execute(statement)
    return res[0]
  }
  // 根据用户名查询用户
  async getUserByNames(name){
    const statement = `SELECT *FROM users WHERE name=?;`
    const res = await connection.execute(statement,[name])
    return res[0]
  }
}

module.exports = new AdminService()