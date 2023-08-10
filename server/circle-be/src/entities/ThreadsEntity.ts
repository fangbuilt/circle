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

    @OneToMany(() => Reply, (replies) => replies.thread)
    replies: Reply[]

    @AfterLoad()
    calculateReplyLength() {
        this.number_of_replies = this.replies.length
    }

    @Column({ select: false, nullable: true })
    number_of_replies: number

    @Column()
    user_id: number

    @ManyToOne(() => User, (user) => user.threads)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}
