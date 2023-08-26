import { Repository } from "typeorm";
import { Reply } from "../entities/RepliesEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/ThreadsEntity";
import { User } from "../entities/UsersEntity";
import { CreateReplySchema, UpdateReplySchema } from "../validator/RepliesValidator";

class RepliesService {
    private readonly replyRepository: Repository<Reply> =
        AppDataSource.getRepository(Reply)

    //get all data
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const thread_id = parseInt(req.query.thread_id as string)
            if (thread_id) {
                const findAllRepliesByThread = await this.replyRepository.find({
                    where: { thread: { id: thread_id } },
                    relations: ["thread", "user"],
                    order: {
                        id: "DESC"
                    }
                })
                if (!findAllRepliesByThread) {
                    return res.status(404).json({ Message: `No replies available for thread id ${thread_id}` })
                }
                return res.status(200).json(findAllRepliesByThread)
            } else {
                const findReplies = await this.replyRepository.find({ relations: ["thread", "user"] })
                if (!findReplies.length) {
                    return res.status(404).json({ Message: "No replies available" })
                }
                return res.status(200).json(findReplies)
            }
        } catch (error) {
            return res.status(500).json({ Message: "Error while getting replies" })
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
                return res.status(404).json({ Message: "Can't find this reply" })
            }
            return res.status(200).json(findAReply)
        } catch (error) {
            return res.status(500).json({ Message: `Error while getting the reply with id number ${id}` })
        }
    }

    //create data
    async create(req: Request, res: Response): Promise<Response> {
        const { error, value } = CreateReplySchema.validate(req.body)
        if (error) {
            return res.status(422).json({ Message: error })
        }
        const { thread, user, content, image } = value
        try {
            const threadRepository = AppDataSource.getRepository(Thread)
            const checkThreadID = await threadRepository.findOne({ where: { id: thread.id } })
            if (!checkThreadID) {
                return res.status(404).json({ Message: `Can not find the main thread id of ${thread.id} to this reply` })
            }
            const userRepository = AppDataSource.getRepository(User)
            const checkUserID = await userRepository.findOne({ where: { id: user.id } })
            if (!checkUserID) {
                return res.status(404).json({ Message: `User with id number ${user.id} is not available"` })
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
            return res.status(500).json({ Message: "Error while creating this new reply" })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        const { error, value } = UpdateReplySchema.validate(req.body)
        if (error) {
            return res.status(422).json({ Message: error })
        }
        const { content, image } = value
        try {
            const findAReply = await this.replyRepository.findOne({
                where: { id: id },
                relations: ["thread", "user"]
            })
            if (!findAReply) {
                return res.status(404).json({ Message: "Can't find this reply" })
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
            return res.status(500).json({ Message: `Error while updating the reply with id number ${id}` })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAReply = await this.replyRepository.findOne({ where: { id: id } })
            if (!findAReply) {
                return res.status(404).json({ Message: "Can't find this reply" })
            }
            await this.replyRepository.remove(findAReply)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ Message: `Error while deleting the reply with id number ${id}` })
        }
    }
}

export default new RepliesService