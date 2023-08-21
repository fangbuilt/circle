import { Request, Response } from "express"
import { Repository } from "typeorm";
import { Thread } from "../entities/ThreadsEntity";
import { AppDataSource } from "../data-source";
import { User } from "../entities/UsersEntity";
import { CreateThreadSchema, UpdateThreadSchema } from "../libs/validator/ThreadsValidator";

class ThreadsService {
    private readonly threadRepository: Repository<Thread> =
        AppDataSource.getRepository(Thread)

    //get all data
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const limit = parseInt(req.query.limit as string)
            if (limit) {
                const limitFindThreads = await this.threadRepository.find({
                    take: limit,
                    relations: ["user", "replies"],
                    order: {
                        id: "DESC"
                    }
                })
                if (!limitFindThreads) {
                    return res.status(404).json({ error: "No threads available" })
                }
                return res.status(200).json(limitFindThreads)
            } else {
                const findThreads = await this.threadRepository.find({
                    relations: ["user", "replies"],
                    order: {
                        id: "DESC"
                    }
                })
                if (!findThreads) {
                    return res.status(404).json({ error: "No threads available" })
                }
                return res.status(200).json(findThreads)
            }
        } catch (error) {
            return res.status(500).json({ Message: "Error while getting all thread data" })
        }
    }

    //get data by id
    async findByID(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAThread = await this.threadRepository.findOne({
                where: { id: id },
                relations: ["user", "replies"]
            })
            if (!findAThread) {
                return res.status(404).json({ error: "Thread not found" })
            }
            return res.status(200).json(findAThread)
        } catch (error) {

            return res.status(500).json({ Message: `Error while finding the thread with id number ${id}` })
        }
    }

    //create data
    async create(req: Request, res: Response): Promise<Response> {
        const { error, value } = CreateThreadSchema.validate(req.body)
        if (error) {
            return res.status(422).json({ error: error })
        }
        const filename = res.locals.filename

        console.log("1", filename)

        const { content } = value

        console.log("2", value)

        try {
            const loginSession = res.locals.loginSession

            console.log("3", loginSession)

            const newThread = this.threadRepository.create({
                content,
                image : filename,
                user: { id: loginSession.findAccount.id }
            })

            console.log("4", newThread)

            const saveNewthread = await this.threadRepository.save(newThread)

            console.log("5", saveNewthread)

            return res.status(201).json(saveNewthread)
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    //update data
    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        const { error, value } = UpdateThreadSchema.validate(req.body)
        if (error) {
            return res.status(422).json({ Message: error })
        }
        const { content, image } = value
        try {
            const findAThread = await this.threadRepository.findOne({
                where: { id: id },
                relations: ["user"]
            })
            if (!findAThread) {
                return res.status(404).json({ error: "Thread not found" })
            }
            if (content !== undefined && content !== "") {
                findAThread.content = content
            }
            if (image !== undefined && image !== "") {
                findAThread.image = image
            }
            const saveChanges = await this.threadRepository.save(findAThread)
            return res.status(200).json(saveChanges)
        } catch (error) {
            return res.status(500).json({ Message: `Error while updating the thread with id number ${id}` })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAThread = await this.threadRepository.findOne({ where: { id: id } })
            if (!findAThread) {
                return res.status(404).json({ Message: "Thread not found" })
            }
            await this.threadRepository.remove(findAThread)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ Message: `Error while deleting the thread with id number ${id}` })
        }
    }
}

export default new ThreadsService
