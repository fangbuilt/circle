import { Repository } from "typeorm";
import { Follow } from "../entities/FollowEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class FollowService {
  private readonly followRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow)

  async findAll(req: Request, res: Response): Promise<Response> {

  }

  async create(req: Request, res: Response): Promise<Response> {
    const loginSession = 
  }

  async delete(req: Request, res: Response): Promise<Response> {
    
  }
}