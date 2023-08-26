import { AppDataSource } from "../data-source";
import { cloudConfig } from "../libs/Cloudinary";
import * as amqp from "amqplib"
import "dotenv/config"
import ThreadWorker from "./ThreadWorker";

class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudConfig()
        const connection = await amqp.connect("amqp://localhost")
        //list upcoming workers here
        ThreadWorker.create("threadQueue", connection)
      })
      .catch((error) => console.log(error))
  }
}

export default new WorkerHub()