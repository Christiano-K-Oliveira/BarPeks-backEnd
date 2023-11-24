import { Request, Response } from 'express';
import { iProductRequest, iProductResponse } from '../interfaces/products.interfaces';
import { createProductService } from '../services/products/createProduct.service';
import { listProductUniqueService } from '../services/products/listProductUnique.service';
import { listProductsService } from '../services/products/listProducts.service';
import { updateProductService } from '../services/products/updateProduct.service';
import { deleteProductService } from '../services/products/deleteProduct.service';
import { uploadProductService } from '../services/products/uploadProduct.service';

const createProductController = async (req: Request, res: Response): Promise<Response> => {
    const pubId = parseInt(res.locals.usuarioId);
    const productData: iProductRequest = req.body
    const newProduct: iProductResponse = await createProductService(productData, pubId)

    return res.status(201).json(newProduct)
}

const listProductsController = async (req: Request, res: Response): Promise<Response> => {
    const pubId = parseInt(res.locals.usuarioId);
	const products = await listProductsService(pubId);

	return res.status(200).json(products);
}

const listProductsForClientController = async (req: Request, res: Response): Promise<Response> => {
    const pubId = parseInt(req.params.id);
	const products = await listProductsService(pubId);

	return res.status(200).json(products);
}

const listProductUniqueController = async (req: Request, res: Response): Promise<Response> => {
	const pubId: number = parseInt(req.params.id);
	const products = await listProductUniqueService(pubId);

	return res.status(200).json(products);
}

const updateProductController = async (req: Request, res: Response): Promise<Response> => {
    const pubId = parseInt(res.locals.usuarioId);
    const productId: number = parseInt(req.params.id);
    const newProduct: iProductResponse = await updateProductService(productId, req.body, pubId)

    return res.status(200).json(newProduct)
}  

const deleteProductController = async (req: Request, res: Response): Promise<Response> => {
    const pubId = parseInt(res.locals.usuarioId);
    const productId: number = parseInt(req.params.id);
	await deleteProductService(productId, pubId);

    return res.status(204).send()
}

const uploadProductController = async (req: Request, res: Response): Promise<Response> => {
    const productId: number = parseInt(req.params.id)
    const pubId = parseInt(res.locals.usuarioId)
    const photo: Express.Multer.File | undefined = req.file

    const product = await uploadProductService(productId, photo, pubId)

    return res.status(200).json(product)
}

export {
    createProductController,
    listProductsController,
    listProductUniqueController,
    updateProductController,
    deleteProductController,
    uploadProductController,
    listProductsForClientController
}