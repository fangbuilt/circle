import { Repository } from "typeorm";
import { Reply } from "../entities/RepliesEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/ThreadsEntity";
import { User } from "../entities/UsersEntity";
import { CreateReplySchema, UpdateReplySchema } from "../validator/RepliesValidator";

class RepliesService {
  private readonly replyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply)

  //get all data
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const thread_id = parseInt(req.query.thread_id as string)
      const loginSession = res.locals.loginSession
      const user_id = parseInt(loginSession.findAccount.id as string)
      if (thread_id) {
        const findAllRepliesByThread = await this.replyRepository.find({
          where: { thread: { id: thread_id } },
          relations: ["thread", "user"],
          order: {
            id: "DESC"
          }
        })
        if (!findAllRepliesByThread) {
          return res.status(404).json({ Message: `No replies available for thread id ${thread_id}` })
        }
        return res.status(200).json(findAllRepliesByThread)
      } else if (user_id) {
        const findRepliesByUser = await this.replyRepository.find({
          where: {user: {id: user_id}},
          relations: ["thread", "user"],
          order: {created_at: "DESC"}
        })
        findRepliesByUser.forEach((Reply) => {
          Reply.image = Reply.image && `${Reply.image}`
        })
        if (!findRepliesByUser) {
          return res.status(404).json({error: "No replies available from this user"})
        }
        return res.status(200).json(findRepliesByUser)
      } else {
        const findReplies = await this.replyRepository.find({ relations: ["thread", "user"] })
        if (!findReplies.length) {
          return res.status(404).json({ Message: "No replies available" })
        }
        return res.status(200).json(findReplies)
      }
    } catch (error) {
      return res.status(500).json({ Message: "Error while getting replies" })
    }
  }

  //get data by id
  async findByID(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id)
    try {
      const findAReply = await this.replyRepository.findOne({
        where: { id: id },
        relations: ["thread", "user"]
      })
      if (!findAReply) {
        return res.status(404).json({ Message: "Can't find this reply" })
      }
      return res.status(200).json(findAReply)
    } catch (error) {
      return res.status(500).json({ Message: `Error while getting the reply with id number ${id}` })
    }
  }

  //create data now handled by queue and worker

  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id)
    const { error, value } = UpdateReplySchema.validate(req.body)
    if (error) {
      return res.status(422).json({ Message: error })
    }
    const { content, image } = value
    try {
      const findAReply = await this.replyRepository.findOne({
        where: { id: id },
        relations: ["thread", "user"]
      })
      if (!findAReply) {
        return res.status(404).json({ Message: "Can't find this reply" })
      }
      if (content !== undefined && content !== "") {
        findAReply.content = content
      }
      if (image !== undefined && image !== "") {
        findAReply.image = image
      }
      const saveChanges = await this.replyRepository.save(findAReply)
      return res.status(200).json(saveChanges)
    } catch (error) {
      return res.status(500).json({ Message: `Error while updating the reply with id number ${id}` })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id)
    try {
      const findAReply = await this.replyRepository.findOne({ where: { id: id } })
      if (!findAReply) {
        return res.status(404).json({ Message: "Can't find this reply" })
      }
      await this.replyRepository.remove(findAReply)
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ Message: `Error while deleting the reply with id number ${id}` })
    }
  }
}

export default new RepliesService