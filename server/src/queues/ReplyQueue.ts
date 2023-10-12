import { Request, Response } from "express";
import { CreateReplySchema } from "../validator/RepliesValidator";
import { enqueue } from "../libs/RabbitMQ";

class ReplyQueue {
  async create(req: Request, res: Response) {
    try {
      const queueName = "replyQueue"

      const filename = res.locals.filename

      const data = {
        thread_id: req.body.thread_id,
        content: req.body.content,
        image: filename
      }

      const { error } = CreateReplySchema.validate(data)
      if (error) {
        return res.status(422).json({ error: error })
      }

      const loginSession = res.locals.loginSession

      const payload = {
        thread_id: data.thread_id,
        content: data.content,
        image: data.image,
        user_id: loginSession.findAccount.id
      }

      const queueError = await enqueue(queueName, payload)
      if (queueError) {
        return res.status(500).json({ error: queueError })
      }

      return res.status(201).json({ Message: "New reply is queued: ", data: payload })
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}

export default new ReplyQueue()