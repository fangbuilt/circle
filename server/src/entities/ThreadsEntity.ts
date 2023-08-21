import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, AfterLoad } from "typeorm"
import { User } from "./UsersEntity"
import { Reply } from "./RepliesEntity"

@Entity({ name: "threads" })
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

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

    @OneToMany(() => Reply, (replies) => replies.thread, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    replies: Reply[]

    @ManyToOne(() => User, (user) => user.threads, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    user: User

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}
