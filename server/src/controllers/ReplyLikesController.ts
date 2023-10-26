import { Request, Response } from "express";
import ReplyLikesService from "../services/ReplyLikesService";

class ReplyLikesController {
  create(req: Request, res: Response) {
    ReplyLikesService.create(req, res)
  }
  delete(req: Request, res: Response) {
    ReplyLikesService.delete(req, res)
  }
}

export default new ReplyLikesController