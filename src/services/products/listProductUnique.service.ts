import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { iProductResponse } from '../../interfaces/products.interfaces';
import { Product } from '../../entities';
import { productsSchemaResponse } from '../../schemas/products.schemas';

export const listProductUniqueService = async (id: number, pubId: number): Promise<iProductResponse> => {
    const productRepository: Repository<Product> = AppDataSource.getRepository(Product);

	const findProduct: Product | null = await productRepository.findOneBy({
        id: id,
		pub: {
			id: pubId
		}
    });

    if (!findProduct) {
		throw new AppError('Produto não encontrado', 404);
	}
	const product = productsSchemaResponse.parse(findProduct);
    
	return product;
}