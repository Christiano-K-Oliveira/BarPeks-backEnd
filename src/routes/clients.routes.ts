import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { clientsSchemaRequest, clientsUpdateSchemaRequest } from "../schemas/clients.schemas";
import { createClientController, deleteClientController, listClientUniqueController, resetPasswordController, sendEmailResetPasswordController, updateClientController, uploadClientController } from "../controllers/clients.controllers";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { ensureClientAccount } from "../middlewares/ensureAccount.middleware";

const clientsRoutes: Router = Router();

clientsRoutes.post('', validateData(clientsSchemaRequest), createClientController)
clientsRoutes.get('/:id', ensureAuthIsValidMiddleware, ensureClientAccount, listClientUniqueController)
clientsRoutes.patch('/:id', ensureAuthIsValidMiddleware, ensureClientAccount, validateData(clientsUpdateSchemaRequest), updateClientController)
clientsRoutes.delete('/:id', ensureAuthIsValidMiddleware, ensureClientAccount, deleteClientController)
clientsRoutes.post('/recuperar-senha', sendEmailResetPasswordController)
clientsRoutes.patch('/recuperar-senha/:token', resetPasswordController)
clientsRoutes.patch('/upload/:id', ensureAuthIsValidMiddleware, uploadClientController)

export default clientsRoutes