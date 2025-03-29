import * as dotenv from 'dotenv'
import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from 'multer-storage-cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req,file)=>{
        return{
            folder:"uploads",
            format:"png",
            public_id:file.originalname.split('.')[0]
        }
    }
})