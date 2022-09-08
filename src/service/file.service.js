// 文件相关

const connection = require('../app/database.js')

class FileService {
  // 保存头像信息
  async create(id,filename,mimetype,size){
    const statement = `INSERT INTO avater (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
    const res = await connection.execute(statement,[filename,mimetype,size,id])
    return res[0]
  }
  // 根据用户id获取用户头像信息
  async getAvaterInfo(id){
    const statement = `SELECT *FROM avater WHERE user_id=?;`
    const res = await connection.execute(statement,[id])
    return res[0]
  }
  // 保存头像url到用户表
  async saveAvaterUrl(id,url){
    const statement = `UPDATE users SET avater_url=? WHERE id=?;`
    const res = await connection.execute(statement,[url,id])
    return res[0]
  }
  // 保存动态配图信息faile表
  async savePicture(filename,mimetype,size,user_id,moment_id){
    const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?);`
    const [result] = await connection.execute(statement,[filename,mimetype,size,user_id,moment_id])
    return result
   }
}

module.exports = new FileService()
