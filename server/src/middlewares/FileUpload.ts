import { NextFunction, Request, Response } from "express"
import * as multer from "multer"

export const upload = (fieldname: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads")
    },
    filename: function (req, file, callback) {
      const suffix = Date.now()
      const extension = file.originalname.split(".")[1]
      callback(null, file.fieldname + "-" + suffix + "." + extension)
    }
  })
  const uploadFile = multer({ storage: storage })
  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldname)(req, res, function (error: any) {
      if (req.file) {
        res.locals.filename = req.file.filename
        next()
      } else if (error) {
        return res.status(400).json({ error })
      } else {
        next()
      }
    })
  }
}