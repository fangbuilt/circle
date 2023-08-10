import { Request, Response } from "express"
import UsersService from "../services/UsersService"

class UsersController {
    findAll(req: Request, res: Response) {
        UsersService.findAll(req, res)
    }
    findByID(req: Request, res: Response) {
        UsersService.findByID(req, res)
    }
    create(req: Request, res: Response) {
        UsersService.create(req, res)
    }
    update(req: Request, res: Response) {
        UsersService.update(req, res)
    }
    delete(req: Request, res: Response) {
        UsersService.delete(req, res)
    }
}

export default new UsersController