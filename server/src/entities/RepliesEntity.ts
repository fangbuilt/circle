import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Thread } from "./ThreadsEntity"
import { User } from "./UsersEntity"
import { ReplyLike } from "./ReplyLikesEntity"

@Entity({ name: "replies" })
export class Reply {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Thread, (thread) => thread.replies, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    thread: Thread

    @ManyToOne(() => User, (user) => user.replies, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    user: User

    @Column()
    content: string

    @Column({ nullable: true })
    image: string

    @OneToMany(() => ReplyLike,
        (reply_likes) => reply_likes.reply,
        { onDelete: "CASCADE", onUpdate: "RESTRICT" }
    )
    reply_likes: ReplyLike[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}