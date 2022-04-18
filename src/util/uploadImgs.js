import pkg from 'cloudinary'
import multerStorageCloudinary from 'multer-storage-cloudinary'
const { v2: cloudinary } = pkg
const { CloudinaryStorage } = multerStorageCloudinary

const savePostImage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'rafa_blog/blog/images'
    }
})

export default savePostImage
