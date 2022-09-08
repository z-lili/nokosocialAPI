// 评论相关

const connection = require('../app/database.js')

class CommentService {
  // 发表评论
  async createComment(content,momentId,uid){
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);`
    const res = await connection.execute(statement,[content,momentId,uid])
    return res[0]
  }
  // 回复评论
  async replayComment(uid,content,momentId,commentid){
    const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?);`
    const res = await connection.execute(statement,[content,momentId,uid,commentid])
    return res[0]
  }
  // 修改评论
  async changeComment(commentid,content){
    const statement = `UPDATE comment SET content=? WHERE id=?;`
    const res = await connection.execute(statement,[content,commentid])
    return res[0]
  }
  // 删除评论
  async removeComment(cid){
    const statement = `DELETE FROM comment WHERE id=?;`
    const res = await connection.execute(statement,[cid])
    return res[0]
  }
  // 获取评论
  async getCommentByid(mid){
    const statement =  `SELECT
    c.id,c.content,c.moment_id,c.comment_id,c.creatAt,c.updateAt,
    JSON_OBJECT('id',u.id,'name',u.name,'avaterUrl',u.avater_url) author
    FROM comment c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE moment_id=?;`
    const res = await connection.execute(statement,[mid])
    return res[0]
  }
}

module.exports = new CommentService()