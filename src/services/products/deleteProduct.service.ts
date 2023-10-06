import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Product } from '../../entities';
import { AppError } from '../../errors';

export const deleteProductService = async (id: number, pubId: number): Promise<void> => {
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
    
    await productRepository.remove(findProduct);
}