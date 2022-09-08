// 评论相关

const {
  createComment,
  replayComment,
  changeComment,
  removeComment,
  getCommentByid
} = require('../service/comment.service.js')

class CommentController {
  // 发表评论
  async create(ctx,next){
    // 拿到评论的内容，要评论的动态id，用户id
    const { content,momentId } = ctx.request.body
    const uid = ctx.user.id
    const res = await createComment(content,momentId,uid)
    ctx.body = res
  }
  // 回复评论
  async replay(ctx,next){
    // 拿到用户id，评论内容，要评论的id，所在动态的id
    const uid = ctx.user.id
    const { content,momentId } = ctx.request.body
    const { commentid } = ctx.params
    const res = await replayComment(uid,content,momentId,commentid)
    ctx.body = res
  }
  // 修改评论
  async change(ctx,next){
    // 修改的内容 评论的id
    const { commentid } = ctx.params
    const { content } = ctx.request.body
    const res = await changeComment(commentid,content)
    ctx.body = res
  }
  // 删除评论
  async remove(ctx,next){
    const { commentid } = ctx.params
    const res = await removeComment(commentid)
    ctx.body = res
  }
  // 根据动态id获取评论
  async list(ctx,next){
    const { momentid } = ctx.query
    const res = await getCommentByid(momentid)
    ctx.body = res
  }
}

module.exports = new CommentController()