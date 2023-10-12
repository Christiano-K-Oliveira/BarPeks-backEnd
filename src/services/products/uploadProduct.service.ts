import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities";
import { iProductResponse } from "../../interfaces/products.interfaces"
import { AppError } from "../../errors";
import { v2 as cloudinary } from 'cloudinary'
import { updateProductPhotoService } from "./updateProduct.service";
import { unlink } from "node:fs"

export const uploadProductService = async (id: number, photo: Express.Multer.File | undefined, pubId: number): Promise<iProductResponse> => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME!,
        api_key: process.env.API_KEY!,
        api_secret: process.env.API_SECRET!
    })

    const productRepository: Repository<Product> = AppDataSource.getRepository(Product);
    const product: Product | null = await productRepository.findOneBy({
        id: id
    });

    if(!product){
        throw new AppError('Produto não encontrado', 404)
    }

    if(!photo){
        throw new AppError('Foto não enviada', 403)
    }

    const upload = await cloudinary.uploader.upload(
        photo.path, 
        { resource_type: 'image' }, 
        (error, result) => { return result }
    )
    
    const updateProduct = await updateProductPhotoService(product.id, { photo_url: upload.secure_url }, pubId)

    unlink(photo.path, (error) => {
        if(error){
            console.log(error)
        }
    })

    return updateProduct
}