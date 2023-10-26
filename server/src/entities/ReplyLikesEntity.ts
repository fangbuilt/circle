import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reply } from "./RepliesEntity";
import { User } from "./UsersEntity";

@Entity({ name: "reply_likes" })
export class ReplyLike {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Reply,
    (reply) => reply.reply_likes,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  reply: Reply

  @ManyToOne(() => User,
    (user) => user.reply_likes,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  user: User
}