import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Thread } from "./ThreadsEntity"
import { Reply } from "./RepliesEntity"
import { Like } from "./LikesEntity"
import { ReplyLike } from "./ReplyLikesEntity"
import { Follow } from "./FollowEntity"

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

    @Column({ nullable: true })
    banner: string

    @OneToMany(() => Thread, (threads) => threads.user, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    threads: Thread[]

    @OneToMany(() => Reply, (replies) => replies.user, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    replies: Reply[]

    @OneToMany(() => Like, (likes) => likes.user, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    likes: Like[]

    @OneToMany(() => ReplyLike, (reply_likes) => reply_likes.user, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    reply_likes: ReplyLike[]

    @OneToMany(() => Follow, (follows) => follows.follower, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    followings: Follow[]

    @OneToMany(() => Follow, (follows) => follows.following, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
    followers: Follow[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date
}
