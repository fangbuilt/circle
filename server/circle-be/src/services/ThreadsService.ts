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
            const findThreads = await this.threadRepository.find({
                relations: ["user"]
            })
            if (!findThreads) {
                return res.status(404).json({ error: "No threads available" })
            }
            return res.status(200).json(findThreads)
        } catch (err) {
            return res.status(500).json({ error: "Error while getting all thread data" })
        }
    }

    //get data by id
    async findByID(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAThread = await this.threadRepository.findOne({
                where: { id: id },
                relations: ["user"]
            })
            if (!findAThread) {
                return res.status(404).json({ error: "Thread not found" })
            }
            return res.status(200).json(findAThread)
        } catch (err) {

            return res.status(500).json({ err })
        }
    }

    //create data
    async create(req: Request, res: Response): Promise<Response> {
        const { error, value } = CreateThreadSchema.validate(req.body)
        if (error) {
            return res.status(422).json({ error: error })
        }
        const { content, image, user } = value
        try {
            const userRepository = AppDataSource.getRepository(User)
            const checkUserID = await userRepository.findOne({ where: { id: user.id } })
            if (!checkUserID) {
                return res.status(404).json({ err: `User with id number ${user.id} is not available` })
            }
            const newThread = this.threadRepository.create({
                content,
                image,
                user: { id: user.id }
            })
            const saveNewthread = await this.threadRepository.save(newThread)
            return res.status(201).json(saveNewthread)
        } catch (err) {
            return res.status(500).json({ err })
        }
    }

    //update data
    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        const { error, value } = UpdateThreadSchema.validate(req.body)
        if (error) {
            return res.status(422).json({ error: error })
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
        } catch (err) {
            return res.status(500).json({ error: `Error while updating the thread with id number ${id}` })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAThread = await this.threadRepository.findOne({ where: { id: id } })
            if (!findAThread) {
                return res.status(404).json({ error: "Thread not found" })
            }
            await this.threadRepository.remove(findAThread)
            return res.status(204).send()
        } catch (err) {
            return res.status(500).json({ error: `Error while deleting the thread with id number ${id}` })
        }
    }
}

export default new ThreadsService
