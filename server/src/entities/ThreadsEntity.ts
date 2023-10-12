import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./UsersEntity"
import { Reply } from "./RepliesEntity"
import { Like } from "./LikesEntity"

@Entity({ name: "threads" })
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({ nullable: true })
    image: string

    @OneToMany(() => Like, (likes) => likes.thread, {onDelete: "CASCADE", onUpdate: "RESTRICT"})
    likes: Like[]

    @OneToMany(() => Reply, (replies) => replies.thread, {onDelete: "CASCADE", onUpdate: "RESTRICT"})
    replies: Reply[]

    @ManyToOne(() => User, (user) => user.threads, {onDelete: "CASCADE", onUpdate: "RESTRICT"})
    user: User

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}
