import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { clientsSchemaRequest, clientsUpdateSchemaRequest } from "../schemas/clients.schemas";
import { createClientController, deleteClientController, listClientUniqueController, updateClientController } from "../controllers/clients.controllers";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { ensureClientAccount } from "../middlewares/ensureAccount.middleware";

const clientsRoutes: Router = Router();

clientsRoutes.post('', validateData(clientsSchemaRequest), createClientController)
clientsRoutes.get('/:id', ensureAuthIsValidMiddleware, ensureClientAccount, listClientUniqueController)
clientsRoutes.patch('/:id', ensureAuthIsValidMiddleware, ensureClientAccount, validateData(clientsUpdateSchemaRequest), updateClientController)
clientsRoutes.delete('/:id', ensureAuthIsValidMiddleware, ensureClientAccount, deleteClientController)

export default clientsRoutes