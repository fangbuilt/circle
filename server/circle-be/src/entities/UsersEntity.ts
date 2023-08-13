import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Thread } from "./ThreadsEntity"
import { Reply } from "./RepliesEntity"

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    full_name: string

    @Column()
    email: string

    @Column({ select: false })
    password: string

    @Column({ nullable: true })
    avatar: string

    @Column({ nullable: true })
    bio: string

    @OneToMany(() => Thread, (threads) => threads.user)
    threads: Thread[]

    @OneToMany(() => Reply, (replies) => replies.user)
    replies: Reply[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date
}
