import { Request, Response } from "express";

class FollowsController {
  findAll(req: Request, res: Response) {
    FollowsService.findAll(req, res)
  }

  create(req: Request, res: Response) {
    FollowsService.create(req, res)
  }

  delete(req: Request, res: Response) {
    FollowsService.delete(req, res)
  }
}

export default new FollowsController