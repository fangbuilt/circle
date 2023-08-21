import { Request, Response } from "express";
import ThreadsService from "../services/ThreadsService";

class ThreadsController {
    findAll(req: Request, res: Response) {
        ThreadsService.findAll(req, res)
    }
    findByID(req: Request, res: Response) {
        ThreadsService.findByID(req, res)
    }
    create(req: Request, res: Response) {
        ThreadsService.create(req, res)
    }
    update(req: Request, res: Response) {
        ThreadsService.update(req, res)
    }
    delete(req: Request, res: Response) {
        ThreadsService.delete(req, res)
    }
}

export default new ThreadsController