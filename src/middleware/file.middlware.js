const { AUTO } = require('jimp')
const jimp = require('jimp')
const path = require('path')
const Multer = require('koa-multer')



// 头像文件上传处理
var avaterStorage = Multer.diskStorage({
  //头像文件保存路径
  destination: function(req, file, cb) {
  //存储目录是手动建的 好像没办法自动建立二级目录
      cb(null, './uploads/avater')
  },
  //修改文件名称
  // filename: function(req, file, cb) {
  //     var fileFormat = (file.originalname).split(".")
  //     cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
  // }
})

//加载配置
var avaterUpload = Multer({ storage: avaterStorage })

// 单个头像文件
const avaterHandler = avaterUpload.single('file')


// 动态配图上传处理
var momentStorage = Multer.diskStorage({
  //头像文件保存路径
  destination: function(req, file, cb) {
  //存储目录是手动建的 好像没办法自动建立二级目录
      cb(null, './uploads/picture')
  },
  //修改文件名称
  // filename: function(req, file, cb) {
  //     var fileFormat = (file.originalname).split(".")
  //     cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
  // }
})

//加载配置
var momentUpload = Multer({ storage: momentStorage })

// 多个动态配图文件
const pictureHandler = momentUpload.array('picture',4)

// 对上传的图片做处理（变化为3张尺寸不同的图片）
const pictureResize = async(ctx,next)=>{
  console.log(ctx.req.files)
  const files = ctx.req.files
  for(let file of files){
    const destination = path.join(file.destination,file.filename)
    // 读取到图片，得到一个image对象,写入对应文件夹
    jimp.read(file.path).then(image=>{
      // 高度自适应
      image.resize(1280,jimp.AUTO).write(`${destination}-larg`)
      image.resize(720,jimp.AUTO).write(`${destination}-middle`)
      image.resize(320,jimp.AUTO).write(`${destination}-small`)
    })
  }
  await next()
}

module.exports = {
  avaterHandler,
  pictureHandler,
  pictureResize
}