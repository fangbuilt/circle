import { Repository } from "typeorm";
import { ReplyLike } from "../entities/ReplyLikesEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class ReplyLikesService {
  private readonly replyLikeRepository: Repository<ReplyLike> =
    AppDataSource.getRepository(ReplyLike)

  //give like to a reply
  async create(req: Request, res: Response): Promise<Response> {
    const loginSession = res.locals.loginSession
    const payload = {
      reply_id: req.body.reply_id,
      user_id: loginSession.findAccount.id
    }
    try {
      const replyLikeCount = await this.replyLikeRepository.count({
        where: {
          reply: { id: payload.reply_id },
          user: { id: payload.user_id }
        }
      })
      if (replyLikeCount > 0) {
        return res.status(400).json({ Message: "This account has already liked this reply" })
      }
      const commitReplyLike = this.replyLikeRepository.create({
        reply: { id: payload.reply_id },
        user: { id: payload.user_id }
      })
      const storeReplyLike = await this.replyLikeRepository.save(commitReplyLike)
      return res.status(201).json(storeReplyLike)
    } catch (error) {
      return res.status(500).json({ Message: error })
    }
  }

  //unlike a reply
  async delete(req: Request, res: Response): Promise<Response> {
    const reply_id = parseInt(req.params.reply_id)
    if (isNaN(reply_id)) {
      return res.status(400).json({ Message: "Invalid reply ID" })
    }
    const loginSession = res.locals.loginSession
    try {
      const existingReplyLike = await this.replyLikeRepository.findOne({
        where: {
          reply: { id: reply_id },
          user: { id: loginSession.findAccount.id }
        }
      })
      if (!existingReplyLike) {
        return res.status(404).json({Message: "This reply was never liked by this account"})
      }
      await this.replyLikeRepository.remove(existingReplyLike)
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ Message: error })
    }
  }
}

export default new ReplyLikesService