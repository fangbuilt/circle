import { Request, Response } from "express";
import LikesService from "../services/LikesService";

class LikesController {
  create(req: Request, res: Response) {
    LikesService.create(req, res)
  }
  delete(req: Request, res: Response) {
    LikesService.delete(req, res)
  }
}

export default new LikesController