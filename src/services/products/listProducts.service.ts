import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { iListProducts } from '../../interfaces/products.interfaces';
import { Product } from '../../entities';
import { listProductsSchema } from '../../schemas/products.schemas';

export const listProductsService = async (pubId: number): Promise<iListProducts> => {
    const productRepository: Repository<Product> = AppDataSource.getRepository(Product);

	const findProducts: Product[] = await productRepository.find({
        where: {
            pub: {
                id: pubId
            }
        },
        relations: {
            pub: true
        }
    });

	const products = listProductsSchema.parse(findProducts);
    
	return products;
}