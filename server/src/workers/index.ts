import { AppDataSource } from "../data-source";
import { cloudConfig } from "../libs/Cloudinary";
import * as amqp from "amqplib"
import "dotenv/config"
import ThreadWorker from "./ThreadWorker";
import ReplyWorker from "./ReplyWorker";

class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudConfig()
        const connection = await amqp.connect("amqp://localhost")
        //list upcoming workers here
        ThreadWorker.create("threadQueue", connection)
        ReplyWorker.create("replyQueue", connection)
      })
      .catch((error) => console.log(error))
  }
}

export default new WorkerHub()