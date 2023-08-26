import { Request, Response } from "express";
import { enqueue } from "../libs/RabbitMQ";
import { CreateThreadSchema } from "../validator/ThreadsValidator";

class ThreadQueue {
  async create(req: Request, res: Response) {
    try {
      const queueName = "threadQueue" 

      const filename = res.locals.filename

      const data = {
        content: req.body.content,
        image: filename
      }

      const { error } = CreateThreadSchema.validate(data)
      if (error) {
        return res.status(422).json({ error: error })
      }
      const loginSession = res.locals.loginSession

      const payload = {
        content: data.content,
        image: data.image,
        user_id: loginSession.findAccount.id
      }

      const queueError = await enqueue(queueName, payload)
      if (queueError) {
        return res.status(500).json({error: queueError})
      }

      return res.status(201).json({Message: "New thread is queued: ", data: payload})
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}

export default new ThreadQueue()