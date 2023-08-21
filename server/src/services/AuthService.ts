import { Repository } from "typeorm"
import { User } from "../entities/UsersEntity"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { LoginSchema, RegisterSchema } from "../libs/validator/AuthValidator"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

class AuthService {
    private readonly authRepository: Repository<User> =
        AppDataSource.getRepository(User)

    async register(req: Request, res: Response): Promise<Response> {
        const { error, value } = RegisterSchema.validate(req.body)
        if (error) {
            return res.status(422).json({ Message: error })
        }
        const {
            username,
            full_name,
            email,
            password
        } = value
        try {
            const compareEmail = await this.authRepository.count({
                where: {
                    email: email
                }
            })

            if (compareEmail > 0) {
                return res.status(400).json({ Message: "Registered email" })
            }
            const compareUsername = await this.authRepository.count({
                where: {
                    username: username
                }
            })
            if (compareUsername > 0) {
                return res.status(400).json({ Message: "Occupied username" })
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const register = this.authRepository.create({
                username,
                full_name,
                email,
                password: hashedPassword
            })
            const storeRegisteredData = await this.authRepository.save(register)
            return res.status(201).json(storeRegisteredData)
        } catch (err) {
            return res.status(500).json({ Message: "Registration error" })
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { error, value } = LoginSchema.validate(req.body)
        if (error) {
            return res.status(422).json({ Message: error })
        }
        const {
            email,
            password
        } = value
        try {

            const findAccount = await this.authRepository.findOne({
                where: { email },
                select: ["id", "username", "full_name", "email", "password", "avatar", "bio"],
                relations: ["thread"]
            })
            if (!findAccount) {
                return res.status(404).json({ Message: "Wrong credentials" })
            }
            const isPasswordValid = await bcrypt.compare(password, findAccount.password)
            if (!isPasswordValid) {
                return res.status(404).json({ Message: "Wrong credentials" })
            }
            const token = jwt.sign({ findAccount }, "secret_key", { expiresIn: "24h" })
            const loginResponse = {
                account_id: findAccount.id,
                username: findAccount.username,
                full_name: findAccount.full_name,
                email: findAccount.email,
                avatar: findAccount.avatar,
                bio: findAccount.bio,
                token: token
            }
            return res.status(200).json({ ...loginResponse })
        } catch (error) {
            return res.status(500).json({ Message: "Login error" })
        }
    }

    async checkAuth(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession
            const user = await this.authRepository.findOne({ where: { id: loginSession.findAccount.id } })
            if (!user) {
                return res.status(401).json({ Message: "User not found" })
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ Message: "Auth error" })
        }
    }
}

export default new AuthService