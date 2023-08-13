import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Thread } from "./ThreadsEntity"
import { User } from "./UsersEntity"

@Entity({ name: "replies" })
export class Reply {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Thread, (thread) => thread.replies)
    thread: Thread

    @ManyToOne(() => User, (user) => user.replies)
    user: User

    @Column()
    content: string

    @Column({ nullable: true })
    image: string

    //Temporary. Omit after like shenanigans are understandable
    @Column({ nullable: true })
    is_liked: boolean

    //Temporary. Omit after like shenanigans are understandable
    @Column({ nullable: true })
    number_of_likes: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}