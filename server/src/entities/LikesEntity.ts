import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./ThreadsEntity";
import { User } from "./UsersEntity";

@Entity({ name: "likes" })
export class Like {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Thread, (thread) => thread.likes, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
  thread: Thread

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE", onUpdate: "RESTRICT" })
  user: User
}