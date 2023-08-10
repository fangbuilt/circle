import * as express from "express"
import { Request, Response } from "express"
import ThreadsController from "../controllers/ThreadsController"
import UsersController from "../controllers/UsersController"
import RepliesController from "../controllers/RepliesController"

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Hello from api/v1 !")
})

router.get("/threads-test", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello, this is threads!"
    })
})

//threads routes
router.get("/threads", ThreadsController.findAll)
router.get("/thread/:id", ThreadsController.findByID)
router.post("/thread", ThreadsController.create)
router.patch("/thread/:id", ThreadsController.update)
router.delete("/thread/:id", ThreadsController.delete)

//likes routes

//replies routes
router.get("/replies", RepliesController.findAll)
router.get("/reply/:id", RepliesController.findByID)
router.post("/reply", RepliesController.create)
router.patch("/reply/:id", RepliesController.update)
router.delete("/reply/:id", RepliesController.delete)

//users routes
router.get("/users", UsersController.findAll)
router.get("/user/:id", UsersController.findByID)
router.post("/user", UsersController.create)
router.patch("/user/:id", UsersController.update)
router.delete("/user/:id", UsersController.delete)

//follow routes

export default router