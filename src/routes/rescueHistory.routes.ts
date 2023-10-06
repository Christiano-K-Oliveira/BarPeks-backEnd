import { Router } from "express";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { createRescueHistoryForClientController, deleteRescueHistoryForClientController, listRescueHistoryForClientController, listRescueHistoryForPubController, updateRescueHistoryForPubController } from "../controllers/rescueHistory.controllers";

const pubRescueHistoryRoutes: Router = Router();
const clientRescueHistoryRoutes: Router = Router();

pubRescueHistoryRoutes.get('/search', ensureAuthIsValidMiddleware, listRescueHistoryForPubController)
pubRescueHistoryRoutes.patch('/:id', ensureAuthIsValidMiddleware, updateRescueHistoryForPubController)

clientRescueHistoryRoutes.post('/:id', ensureAuthIsValidMiddleware, createRescueHistoryForClientController)
clientRescueHistoryRoutes.get('', ensureAuthIsValidMiddleware, listRescueHistoryForClientController)
clientRescueHistoryRoutes.delete('/:id', ensureAuthIsValidMiddleware, deleteRescueHistoryForClientController)

export { pubRescueHistoryRoutes, clientRescueHistoryRoutes }