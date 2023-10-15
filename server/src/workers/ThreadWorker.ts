import { Thread } from "../entities/ThreadsEntity";
import * as amqp from "amqplib"
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { AppDataSource } from "../data-source";
import "dotenv/config"

class ThreadWorker {
  async create(queueName: string, connection: amqp.Connection) {
    try {
      const channel = await connection.createChannel()
      await channel.assertQueue(queueName)
      await channel.consume(queueName, async (message) => {
        if (message !== null) {
          try {
            const payload = JSON.parse(message.content.toString())
            console.log("Received message: ", payload)
            let cloudRes: UploadApiResponse | null = null
            if (payload.image) {
              cloudRes = await cloudinary.uploader.upload(`../../uploads/${payload.image}`)
            }
            const thread = AppDataSource.getRepository(Thread).create({
              content: payload.content,
              image: cloudRes?.secure_url || null,
              user: { id: payload.user_id }
            })
            await AppDataSource.getRepository(Thread).save(thread)
            console.log("New thread posted")
            channel.ack(message)
          } catch (error) {
            console.log({ error: error })
          }
        }
      })
    } catch (error) {
      console.log({ error: error })
    }
  }
}

export default new ThreadWorker()