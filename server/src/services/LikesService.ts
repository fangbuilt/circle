import { Repository } from "typeorm";
import { Like } from "../entities/LikesEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class LikesService {
  private readonly likeRepository: Repository<Like> =
    AppDataSource.getRepository(Like)

  //give like to a thread
  async create(req: Request, res: Response): Promise<Response> {
    const loginSession = res.locals.loginSession
    const payload = {
      thread_id: req.body.thread_id,
      user_id: loginSession.findAccount.id
    }
    try {
      const likeCount = await this.likeRepository.count({
        where: {
          thread: { id: payload.thread_id },
          user: { id: payload.user_id }
        }
      })
      if (likeCount > 0) {
        return res.status(400).json({ Message: "This account has already liked this thread" })
      }
      const commitLike = this.likeRepository.create({
        thread: { id: payload.thread_id },
        user: { id: payload.user_id }
      })
      const storeLike = await this.likeRepository.save(commitLike)
      return res.status(201).json(storeLike)
    } catch (error) {
      return res.status(500).json({ Message: error })
    }
  }

  //unlike a thread
  async delete(req: Request, res: Response): Promise<Response> {
    const thread_id = parseInt(req.params.thread_id)
    if (isNaN(thread_id)) {
      return res.status(400).json({Message: "Invalid thread ID"})
    }
    const loginSession = res.locals.loginSession
    try {
      const existingLike = await this.likeRepository.findOne({
        where: {
          thread: { id: thread_id },
          user: { id: loginSession.findAccount.id }
        }
      })
      if (!existingLike) {
        return res.status(404).json({ Message: "This thread was never liked by this account" })
      }
      await this.likeRepository.remove(existingLike)
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ Message: error })
    }
  }
}

export default new LikesService