import { Request, Response } from "express";
import RepliesService from "../services/RepliesService";

class RepliesController {
    findAll(req: Request, res: Response) {
        RepliesService.findAll(req, res)
    }

    findByID(req: Request, res: Response) {
        RepliesService.findByID(req, res)
    }

    findByThread(req: Request, res: Response) {
        RepliesService.findByThread(req, res)
    }

    create(req: Request, res: Response) {
        RepliesService.create(req, res)
    }

    update(req: Request, res: Response) {
        RepliesService.update(req, res)
    }

    delete(req: Request, res: Response) {
        RepliesService.delete(req, res)
    }
}

export default new RepliesController