import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { registeredClientsSchemaRequest, registeredClientsUpdateSchemaRequest } from "../schemas/registeredClients.schemas";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { createRegisterClientController, deleteRegisterClientController, listRegisterClientController, listRegisterClientUniqueController, listRegisterClientUniqueForClientController, updateRegisterClientController, updateRegisterClientForClientController } from "../controllers/registeredClients.controllers";

const pubRegisteredClientsRoutes: Router = Router();
const clientRegisteredClientsRoutes: Router = Router();

pubRegisteredClientsRoutes.post('', ensureAuthIsValidMiddleware, validateData(registeredClientsSchemaRequest), createRegisterClientController)
pubRegisteredClientsRoutes.get('', ensureAuthIsValidMiddleware, listRegisterClientController)
pubRegisteredClientsRoutes.get('/:name/:cpf', ensureAuthIsValidMiddleware, listRegisterClientUniqueController)
pubRegisteredClientsRoutes.patch('/:id', ensureAuthIsValidMiddleware, validateData(registeredClientsUpdateSchemaRequest), updateRegisterClientController)
pubRegisteredClientsRoutes.delete('/:id', ensureAuthIsValidMiddleware, deleteRegisterClientController)

clientRegisteredClientsRoutes.get('/search', ensureAuthIsValidMiddleware, listRegisterClientUniqueForClientController)
clientRegisteredClientsRoutes.patch('/:id', ensureAuthIsValidMiddleware, validateData(registeredClientsUpdateSchemaRequest), updateRegisterClientForClientController)

export { pubRegisteredClientsRoutes, clientRegisteredClientsRoutes }