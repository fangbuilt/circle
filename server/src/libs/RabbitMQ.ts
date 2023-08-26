import * as amqp from "amqplib"

export async function enqueue(queueName: string, payload: any): Promise<Boolean> {
  try {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName)
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))
    await channel.close()
    await connection.close()
    return null
  } catch (error) {
    console.log({ error })
    return error
  }
}