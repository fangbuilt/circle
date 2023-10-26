import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UsersEntity";

@Entity({ name: "follows" })
export class Follow {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.followings, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT"
  })
  follower: User

  @ManyToOne(() => User, (user) => user.followers, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT"
  })
  following: User
}