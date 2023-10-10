import multer from 'multer'
import path from 'path'
import { AppError } from '../errors'

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve('./src/tmp'))
        },
        filename: (_, file, callback) => {
            const time = new Date().getTime()

            callback(null, `${time}_${file.originalname}`)
        }
    }),
    fileFilter:  (_, file, callback) => {
        // const extendsTypes = ['image/jpeg', 'image/jpg', 'image/png'].find(format => format == file.mimetype)

        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
            callback(null, true)
        }
        else {
            throw new AppError('Somente nos formatos jpeg e png são permitidos', 400)
            // callback(null, false)
        }
    }
}))