import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { productsSchemaRequest, productsUpdateSchemaRequest } from "../schemas/products.schemas";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { createProductController, deleteProductController, listProductUniqueController, listProductsController, listProductsForClientController, updateProductController, uploadProductController } from "../controllers/products.controllers";

const upload = require('../middlewares/uploadPhoto.middleware')
const productsRoutes: Router = Router();

productsRoutes.post('', ensureAuthIsValidMiddleware, validateData(productsSchemaRequest), createProductController)
productsRoutes.get('', ensureAuthIsValidMiddleware, listProductsController)
productsRoutes.get('/:id', ensureAuthIsValidMiddleware, listProductUniqueController)
productsRoutes.patch('/:id', ensureAuthIsValidMiddleware, validateData(productsUpdateSchemaRequest), updateProductController)
productsRoutes.delete('/:id', ensureAuthIsValidMiddleware, deleteProductController)
productsRoutes.patch('/upload/:id', ensureAuthIsValidMiddleware, (upload.single('file')), uploadProductController)

productsRoutes.get('/client/:id', listProductsForClientController)

export default productsRoutes