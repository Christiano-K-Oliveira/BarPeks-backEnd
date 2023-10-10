import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { v2 as cloudinary } from 'cloudinary'
import { iClientResponse } from "../../interfaces/clients.interfaces";
import { Client } from "../../entities";
import { updateClientService } from "./updateClient.service";
import { unlink } from "node:fs"

export const uploadClientService = async (id: number, photo: Express.Multer.File | undefined): Promise<iClientResponse> => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME!,
        api_key: process.env.API_KEY!,
        api_secret: process.env.API_SECRET!
    })

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
    const client: Client | null = await clientRepository.findOneBy({
        id: id
    });

    if(!client){
        throw new AppError('Cliente não encontrado', 404)
    }

    if(!photo){
        throw new AppError('Foto não enviada', 403)
    }

    const upload = await cloudinary.uploader.upload(
        photo.path, 
        { resource_type: 'image' }, 
        (error, result) => { return result }
    )
    
    const updateClient = await updateClientService(id, { photo_url: upload.secure_url })

    unlink(photo.path, (error) => {
        if(error){
            console.log(error)
        }
    })

    return updateClient
}