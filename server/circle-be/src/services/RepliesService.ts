import { Repository } from "typeorm";
import { Reply } from "../entities/RepliesEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/ThreadsEntity";
import { User } from "../entities/UsersEntity";
import { CreateReplySchema, UpdateReplySchema } from "../libs/validator/RepliesValidator";

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

    async findByThread(req: Request, res: Response): Promise<Response> {
        const thread_id = parseInt(req.params.thread_id)
        try {
            const findAllRepliesByThread = await this.replyRepository.find({
                where: { thread: { id: thread_id } },
                relations: ["thread", "user"]
            })
            if (!findAllRepliesByThread) {
                return res.status(404).json({ error: `No replies available for thread id ${thread_id}` })
            }
            return res.status(200).json(findAllRepliesByThread)
        } catch (error) {
            return res.status(500).json({ error: `Error while getting replies for thread id ${thread_id}` })
        }
    }

    //create data
    async create(req: Request, res: Response): Promise<Response> {
        const { error, value } = CreateReplySchema.validate(req.body)
        if (error) {
            return res.status(422).json({ error: error })
        }
        const { thread, user, content, image } = value
        try {
            const threadRepository = AppDataSource.getRepository(Thread)
            const checkThreadID = await threadRepository.findOne({ where: { id: thread.id } })
            if (!checkThreadID) {
                return res.status(404).json({ error: `Can not find the main thread id of ${thread.id} to this reply` })
            }
            const userRepository = AppDataSource.getRepository(User)
            const checkUserID = await userRepository.findOne({ where: { id: user.id } })
            if (!checkUserID) {
                return res.status(404).json({ error: `User with id number ${user.id} is not available"` })
            }
            const newReply = this.replyRepository.create({
                thread: { id: thread.id },
                user: { id: user.id },
                content,
                image
            })
            const saveNewReply = await this.replyRepository.save(newReply)
            return res.status(201).json(saveNewReply)
        } catch (error) {
            return res.status(500).json({ error: "Error while creating this new reply" })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        const { error, value } = UpdateReplySchema.validate(req.body)
        if (error) {
            return res.status(422).json({ error: error })
        }
        const { content, image } = value
        try {
            const findAReply = await this.replyRepository.findOne({
                where: { id: id },
                relations: ["thread", "user"]
            })
            if (!findAReply) {
                return res.status(404).json({ error: "Can't find this reply" })
            }
            if (content !== undefined && content !== "") {
                findAReply.content = content
            }
            if (image !== undefined && image !== "") {
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