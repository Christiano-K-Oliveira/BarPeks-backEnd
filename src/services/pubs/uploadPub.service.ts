import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { v2 as cloudinary } from 'cloudinary'
import { iPubResponse } from "../../interfaces/pubs.interfaces";
import { Pub } from "../../entities";
import { updatePubService } from "./updatePub.service";
import { unlink } from "node:fs"

export const uploadPubService = async (id: number, photo: Express.Multer.File | undefined): Promise<iPubResponse> => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME!,
        api_key: process.env.API_KEY!,
        api_secret: process.env.API_SECRET!
    })

    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);
    const pub: Pub | null = await pubRepository.findOneBy({
        id: id
    });

    if(!pub){
        throw new AppError('Bar não encontrado', 404)
    }

    if(!photo){
        throw new AppError('Foto não enviada', 403)
    }

    const upload = await cloudinary.uploader.upload(
        photo.path, 
        { resource_type: 'image' }, 
        (error, result) => { return error }
    )
    
    const updateProduct = await updatePubService(id, { photo_url: upload.secure_url })
    
    unlink(photo.path, (error) => {
        if(error){
            console.log(error)
        }
    })

    return updateProduct
}