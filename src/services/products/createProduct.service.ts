import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { iProductRequest, iProductResponse } from '../../interfaces/products.interfaces';
import { Product, Pub } from '../../entities';
import { productsSchemaResponse } from '../../schemas/products.schemas';
import { AppError } from '../../errors';

export const createProductService = async (productData: iProductRequest, pubId: number): Promise<iProductResponse> => {
    const productRepository: Repository<Product> = AppDataSource.getRepository(Product);
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const pub: Pub | null = await pubRepository.findOneBy({
        id: pubId
    });


    if (!pub) {
		throw new AppError('Bar não encontrado', 404);
	}

    const data = {
        ...productData,
        pub: pub
    }

    const product: iProductRequest = productRepository.create(data)
    await productRepository.save(product)

    const productResponse = productsSchemaResponse.parse(product)

    return productResponse
}