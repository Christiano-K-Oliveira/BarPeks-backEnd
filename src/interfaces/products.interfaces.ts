import { DeepPartial } from 'typeorm';
import { z } from 'zod';
import { listProductsSchema, productsSchemaRequest, productsSchemaResponse } from '../schemas/products.schemas';

export type iProductRequest = z.infer<typeof productsSchemaRequest>
export type iProductResponse = z.infer<typeof productsSchemaResponse>
export type iUpdateProduct = DeepPartial<z.infer<typeof productsSchemaResponse>>
export type iListProducts = z.infer<typeof listProductsSchema>
