import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { iProductResponse, iUpdateProduct } from '../../interfaces/products.interfaces';
import { Product } from '../../entities';
import { productsSchemaResponse } from '../../schemas/products.schemas';

export const updateProductService = async (id: number, data: iUpdateProduct, pubId: number): Promise<iProductResponse> => {
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

    const newDataProduct = {
		...findProduct,
		...data,
	};

	await productRepository.save(newDataProduct);
    
	const pub = productsSchemaResponse.parse(newDataProduct);
    
	return pub;
}