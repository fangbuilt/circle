import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"

export function cloudConfig() {
  cloudinary.config({
    cloud_name: "dd2zrkpqp",
    api_key: "569285868482956",
    api_secret: "oPFpyA6fwAJaXKd_gDPqh-TiZ64"
  })
  console.log(cloudConfig)
}