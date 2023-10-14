import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { iProductResponse } from '../../interfaces/products.interfaces';
import { Product } from '../../entities';
import { listProductsSchema, productsSchemaResponse } from '../../schemas/products.schemas';

export const listProductUniqueService = async (pubId: number): Promise<iProductResponse[]> => {
    const productRepository: Repository<Product> = AppDataSource.getRepository(Product);

	const findProducts: Product[] | null = await productRepository.find({
		where: {
			pub: {
				id: pubId
			},
		},
		relations: {
			pub: true
		}
    });

    if (!findProducts) {
		throw new AppError('Produto não encontrado', 404);
	}
	const products = listProductsSchema.parse(findProducts);
    
	return products;
}