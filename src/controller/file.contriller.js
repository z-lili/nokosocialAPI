// 文件相关

const config = require('../app/config.js')

const {
  create,
  saveAvaterUrl,
  savePicture
} = require('../service/file.service.js')

class FileController {
  // 将头像信息保存到数据库（头像表）
  async saveAvater(ctx,next){
    try{
      const { mimetype,filename,size } = ctx.req.file
      const { id } = ctx.user
      const res = await create(id,filename,mimetype,size)
      // // 将头像url保存到用户表
      const avater_url = `${config.APP_HOST}:${config.APP_PORT}/users/${id}/avater`
      const result = await saveAvaterUrl(id,avater_url)
      ctx.body = ctx.req.file
    }catch(err){
      console.log(err)
    }
  }
  // 保存动态配图到file表
  async savePicture(ctx,next){
    // 获取动态id，图片相关信息,用户id
    const { id } = ctx.user
    const { momentid } = ctx.query
    const fileMessage = ctx.req.files
    for(let item of fileMessage){
      const { mimetype,filename,size } = item
      await savePicture(filename,mimetype,size,id,momentid)
    }
    ctx.body = '动态配图上传完成~'
  }
}

module.exports = new FileController()