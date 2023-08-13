import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, AfterLoad } from "typeorm"
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

    @OneToMany(() => Reply, (replies) => replies.thread)
    replies: Reply[]

    //Temporary. Omit after I understand how to automatically get the number of related array
    @Column({ nullable: true })
    number_of_replies: number

    @ManyToOne(() => User, (user) => user.threads)
    user: User

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}
