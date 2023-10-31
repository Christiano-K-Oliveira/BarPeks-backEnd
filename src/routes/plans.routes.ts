import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { plansSchemaRequest } from "../schemas/plans.schemas";
import { createPlanController, getOnePlanController } from "../controllers/plans.controllers";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";

const plansRoutes: Router = Router();

plansRoutes.post("", validateData(plansSchemaRequest), createPlanController)
plansRoutes.get("", ensureAuthIsValidMiddleware, getOnePlanController)

export default plansRoutes
