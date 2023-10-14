import { Router } from "express";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { createRescueHistoryForClientController, deleteRescueHistoryForClientController, listRescueHistoryForClientController, listRescueHistoryForPubController, updateRescueHistoryForPubController } from "../controllers/rescueHistory.controllers";
import validateData from "../middlewares/validateData.middleware";
import { rescueHistorySchemaRequest } from "../schemas/rescueHistory.schemas";

const pubRescueHistoryRoutes: Router = Router();
const clientRescueHistoryRoutes: Router = Router();

pubRescueHistoryRoutes.get('/search', ensureAuthIsValidMiddleware, listRescueHistoryForPubController)
pubRescueHistoryRoutes.patch('/:id', ensureAuthIsValidMiddleware, updateRescueHistoryForPubController)

clientRescueHistoryRoutes.post('/:id', ensureAuthIsValidMiddleware, validateData(rescueHistorySchemaRequest), createRescueHistoryForClientController)
clientRescueHistoryRoutes.get('', ensureAuthIsValidMiddleware, listRescueHistoryForClientController)
clientRescueHistoryRoutes.delete('/:id', ensureAuthIsValidMiddleware, deleteRescueHistoryForClientController)

export { pubRescueHistoryRoutes, clientRescueHistoryRoutes }