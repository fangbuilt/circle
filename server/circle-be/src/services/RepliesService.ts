import { Repository } from "typeorm";
import { Reply } from "../entities/RepliesEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/ThreadsEntity";
import { User } from "../entities/UsersEntity";

class RepliesService {
    private readonly replyRepository: Repository<Reply> =
        AppDataSource.getRepository(Reply)

    //get all data
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const findReplies = await this.replyRepository.find({ relations: ["thread", "user"] })
            if (!findReplies) {
                return res.status(404).json({ error: "No replies available" })
            }
            return res.status(200).json(findReplies)
        } catch (err) {
            return res.status(500).json({ error: "Error while getting all reply data" })
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
                return res.status(404).json({ error: "Can't find this reply" })
            }
            return res.status(200).json(findAReply)
        } catch (error) {
            return res.status(500).json({ error: `Error while getting the reply with id number ${id}` })
        }
    }

    //create data
    async create(req: Request, res: Response): Promise<Response> {
        const {
            thread_id,
            user_id,
            content,
            image
        } = req.body
        try {
            const threadRepository = AppDataSource.getRepository(Thread)
            const checkThreadID = await threadRepository.findOne(thread_id)
            if (!checkThreadID) {
                return res.status(404).json({ error: `Can not find the main thread id of ${thread_id} to this reply` })
            }
            const userRepository = AppDataSource.getRepository(User)
            const checkUserID = await userRepository.findOne(user_id)
            if (!checkUserID) {
                return res.status(404).json({ error: `User with id number ${user_id} is not available"` })
            }
            const newReply = this.replyRepository.create({
                content,
                image
            })
            const saveNewReply = await this.replyRepository.save(newReply)
            return res.status(201).json(saveNewReply)
        } catch (error) {
            return res.status(500).json({ error: "Error while creating this new thread" })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        const {
            content,
            image
        } = req.body
        try {
            const findAReply = await this.replyRepository.findOne({
                where: { id: id },
                relations: ["thread", "user"]
            })
            if (!findAReply) {
                return res.status(404).json({ error: "Can't find this reply" })
            }
            if (content !== undefined && content !== 0) {
                findAReply.content = content
            }
            if (image !== undefined && image !== 0) {
                findAReply.image = image
            }
            const saveChanges = await this.replyRepository.save(findAReply)
            return res.status(200).json(saveChanges)
        } catch (error) {
            return res.status(500).json({ error: `Error while updating the reply with id number ${id}` })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAReply = await this.replyRepository.findOne({ where: { id: id } })
            if (!findAReply) {
                return res.status(404).json({ error: "Can't find this reply" })
            }
            await this.replyRepository.remove(findAReply)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: `Error while deleting the reply with id number ${id}` })
        }
    }
}

export default new RepliesService