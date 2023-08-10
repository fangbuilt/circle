import { Request, Response } from "express"
import { Repository } from "typeorm";
import { Thread } from "../entities/ThreadsEntity";
import { AppDataSource } from "../data-source";
import { User } from "../entities/UsersEntity";

class ThreadsService {
    private readonly threadRepository: Repository<Thread> =
        AppDataSource.getRepository(Thread)

    //get all data
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const findThreads = await this.threadRepository.find({ relations: ["user"] })
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
            return res.status(500).json({ error: `Error while getting the thread with id number ${id}` })
        }
    }

    //create data
    async create(req: Request, res: Response): Promise<Response> {
        const {
            content,
            image,
            user_id
        } = req.body
        try {
            const userRepository = AppDataSource.getRepository(User)
            const checkUserID = await userRepository.findOne(user_id)
            if (!checkUserID) {
                return res.status(404).json({ error: `User with id number ${user_id} is not available"` })
            }
            const newThread = this.threadRepository.create({
                content,
                image,
            })
            const saveNewthread = await this.threadRepository.save(newThread)
            return res.status(201).json(saveNewthread)
        } catch (err) {
            return res.status(500).json({ error: "Error while creating this new thread" })
        }
    }

    //update data
    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        const { 
            content, 
            image 
        } = req.body
        try {
            const findAThread = await this.threadRepository.findOne({ where: { id: id } })
            if (!findAThread) {
                return res.status(404).json({ error: "Thread not found" })
            }
            if (content !== undefined && content !== "") {
                findAThread.content = content
            }
            if (image !== undefined && content !== "") {
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
