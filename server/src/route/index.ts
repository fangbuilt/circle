import * as express from "express"
import { Request, Response } from "express"
import ThreadsController from "../controllers/ThreadsController"
import UsersController from "../controllers/UsersController"
import RepliesController from "../controllers/RepliesController"
import AuthController from "../controllers/AuthController"
import authenticate from "../middlewares/Auth"
import { upload } from "../middlewares/FileUpload"
import QueueController from "../queues/ThreadQueue"
import ThreadQueue from "../queues/ThreadQueue"

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Hello from api/v1 !")
})

router.get("/threads-test", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello, this is threads!"
    })
})

//users routes
router.get("/users", UsersController.findAll)
router.get("/user/:id", UsersController.findByID)
router.post("/user", UsersController.create)
router.patch("/user/:id", UsersController.update)
router.delete("/user/:id", UsersController.delete)

//auth routes
router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)
router.get("/auth/check", authenticate, AuthController.checkAuth)

//threads routes
router.get("/threads", authenticate, ThreadsController.findAll)
router.get("/thread/:id", authenticate, ThreadsController.findByID)
router.post("/thread", authenticate, upload("image"), ThreadQueue.create)
router.patch("/thread/:id", authenticate, ThreadsController.update)
router.delete("/thread/:id", authenticate, ThreadsController.delete)

//likes routes

//replies routes
router.get("/replies", authenticate, RepliesController.findAll)
router.get("/reply/:id", authenticate, RepliesController.findByID)
router.post("/reply", authenticate, RepliesController.create)
router.patch("/reply/:id", authenticate, RepliesController.update)
router.delete("/reply/:id", authenticate, RepliesController.delete)

//follow routes

export default router