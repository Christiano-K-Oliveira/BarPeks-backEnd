import { z } from 'zod'

const productsSchemaRequest = z.object({
    name: z.string().max(150),
    value: z.string().max(8),
    code: z.string().max(10),
})

const productsUpdateSchemaRequest = z.object({
    name: z.string().max(150).optional(),
    value: z.string().max(8).optional(),
    code: z.string().max(10).optional(),
})

const productsSchemaResponse = z.object({
    id: z.number(),
    name: z.string().max(150),
    value: z.string().max(8),
    code: z.string().max(10),
    photo_url: z.string().nullish()
})

const listProductsSchema = z.array(productsSchemaResponse)


export { productsSchemaRequest, productsSchemaResponse, productsUpdateSchemaRequest, listProductsSchema }