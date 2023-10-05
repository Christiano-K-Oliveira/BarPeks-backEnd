import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { pubsSchemaRequest, pubsUpdateSchemaRequest } from "../schemas/pubs.schemas";
import { createPubController, deletePubController, listPubUniqueController, updatePubController } from "../controllers/pubs.controllers";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { ensurePubAccount } from "../middlewares/ensureAccount.middleware";

const pubsRoutes: Router = Router();

pubsRoutes.post('', validateData(pubsSchemaRequest), createPubController)
pubsRoutes.get('/:id', ensureAuthIsValidMiddleware, ensurePubAccount, listPubUniqueController)
pubsRoutes.patch('/:id', ensureAuthIsValidMiddleware, ensurePubAccount, validateData(pubsUpdateSchemaRequest), updatePubController)
pubsRoutes.delete('/:id', ensureAuthIsValidMiddleware, ensurePubAccount, deletePubController)

export default pubsRoutes
