import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Thread } from "./ThreadsEntity"
import { User } from "./UsersEntity"

@Entity({ name: "replies" })
export class Reply {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    thread_id: number

    @Column()
    user_id: number

    @ManyToOne(() => Thread, (thread) => thread.replies)
    @JoinColumn({ name: "thread_id"})
    thread: Thread

    @ManyToOne(() => User, (user) => user.replies)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column()
    content: string

    @Column({ nullable: true })
    image: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}