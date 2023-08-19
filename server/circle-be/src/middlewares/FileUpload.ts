import { NextFunction, Request, Response } from "express"
import * as multer from "multer"
import { v2 as cloudinary } from "cloudinary"

export const upload = (fieldname: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads")
    },
    filename: function (req, file, callback) {
      const suffix = Date.now()
      callback(null, file.fieldname + "-" + suffix + ".png")
    }
  })

  const uploadFile = multer({ storage: storage })

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldname)(req, res, function (error: string) {
      if (error) {
        return res.status(400).json({ error: "Upload file failed" })
      }
      res.locals.filename = req.file.filename
      next()
    })
  }
}