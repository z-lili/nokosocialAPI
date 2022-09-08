// 连接数据库
const mysql = require('mysql2')
const config = require('../app/config.js')

const connection = mysql.createPool({
  host:config.MYSQL_HOST,
  port:config.MYSQL_PORT,
  database:config.MYSQL_DATABASE,
  user:config.MYSQL_USER,
  password:config.MYSQL_PASSWORD
})

// 测试是否连接成功
connection.getConnection((err,conn)=>{
  conn.connect((err)=>{
    if(err){
      console.log('连接数据库失败')
    }else {
      console.log('连接数据库成功')
    }
  })
})

// 导出连接
module.exports = connection.promise()