// 项目的入口文件
const app = require('./app/index.js')

const config = require('./app/config.js')

// 加载database里的代码
require('./app/database')


app.listen(config.APP_PORT,()=>{
  console.log(`服务器在${config.APP_PORT}端口启动成功~`)
})



