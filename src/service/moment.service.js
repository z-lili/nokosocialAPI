const connection = require('../app/database.js')

class MomentService {
  // 用户发表动态
  async moment(userid,content){
    const statement = `INSERT INTO moment (content,user_id) VALUES(?,?);`
    const res = await connection.execute(statement,[content,userid])
    return res
  }
  // 获取用户动态（单条）
  async getMomentByid(mid){
    // 多表连接查询，并且查询到用户表里的信息格式为对象
    const statement = `SELECT 
    m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name,'avaterUrl',u.avater_url) author,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.id = ?;`
    const res = await connection.execute(statement,[mid])
    return res[0]
  }
  // 获取动态列表
  async getMomentList(offset,size){
    const statement = `SELECT 
    m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name,'avaterUrl',u.avater_url) author,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images,
		(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
    (SELECT COUNT(*) FROM user_like_moment WHERE user_like_moment.moment_id = m.id) likeCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    ORDER BY id DESC
    LIMIT ?,?;`
    const res = await connection.execute(statement,[offset,size])
    return res[0]
  }
  // 修改动态
  async updateMoment(mid,content){
    const statement = `UPDATE moment SET content=? WHERE id=?;`
    const res = await connection.execute(statement,[content,mid])
    return res[0]
  }
  // 删除动态
  async removeMoment(mid){
    const statement = `DELETE FROM moment WHERE id=?;`
    const res = await connection.execute(statement,[mid])
    return res[0]
  }
  // 根据动态filename获取动态配图
  async getPicture(filename){
    const statement = `SELECT *FROM file WHERE filename=?;`
    const res = await connection.execute(statement,[filename])
    return res[0]
  }
  // 根据uid获取所有动态点赞情况
  async likeStuations(uid,offset,size){
    const statement = `SELECT 
    m.id id,m.content content,u.name,u.avater_url,ulm.createAt,u.name uname,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images
    FROM moment m
		LEFT JOIN user_like_moment ulm ON m.id=ulm.moment_id
		LEFT JOIN users u ON u.id=ulm.user_id
    WHERE m.user_id = ?
    ORDER BY id DESC
    LIMIT ?,?;`
    const res = await connection.execute(statement,[uid,offset,size])
    return res[0]
  }
  // 根据用户id获取动态
  async getMyMoment(uid){
    const statement = `SELECT 
    m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name,'avaterUrl',u.avater_url) author,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.user_id = ?;`
    const res = await connection.execute(statement,[uid])
    return res[0]
  }
  // 根据用户id获取所有动态评论情况
  async comentStuations(uid,offset,size){
    const statement = `SELECT 
    c.content content,m.content mcontent,u.name,u.avater_url,c.creatAt,m.id,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images
    FROM moment m
		LEFT JOIN comment c ON c.moment_id=m.id
		LEFT JOIN users u ON u.id=c.user_id
    WHERE m.user_id = ?
    ORDER BY id DESC
    LIMIT ?,?;`
    const res = await connection.execute(statement,[uid,offset,size])
    return res[0]
  }
}

module.exports = new MomentService()