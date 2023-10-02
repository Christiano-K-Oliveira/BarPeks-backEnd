import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { clientsSchemaRequest, clientsUpdateSchemaRequest } from "../schemas/clients.schemas";
import { createClientController, deleteClientController, listClientUniqueController, updateClientController } from "../controllers/clients.controllers";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";

const clientsRoutes: Router = Router();

clientsRoutes.post('', validateData(clientsSchemaRequest), createClientController)
clientsRoutes.get('/:id', ensureAuthIsValidMiddleware, listClientUniqueController)
clientsRoutes.patch('/:id', ensureAuthIsValidMiddleware, validateData(clientsUpdateSchemaRequest), updateClientController)
clientsRoutes.delete('/:id', ensureAuthIsValidMiddleware, deleteClientController)

export default clientsRoutes