import { Request, Response } from 'express';
import { iPlanRequest, iPlanResponse } from '../interfaces/plans.interfaces';
import { createPlanService } from '../services/plans/createPlan.service';
import { listPlanUniqueService } from '../services/plans/listPlanUnique.service';

const createPlanController = async (req: Request, res: Response): Promise<Response> => {
    const planData: iPlanRequest = req.body
    const newPlan: iPlanResponse = await createPlanService(planData)

    return res.status(201).json(newPlan)
}

const getOnePlanController = async (req: Request, res: Response): Promise<Response> => {
    const pubId = parseInt(res.locals.usuarioId);
    const plan: iPlanResponse = await listPlanUniqueService(pubId)

    return res.status(200).json(plan)
}


export {
    createPlanController,
    getOnePlanController,
}