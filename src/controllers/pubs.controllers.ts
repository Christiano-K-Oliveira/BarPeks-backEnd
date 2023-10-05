import { Request, Response } from 'express';
import { iPubRequest, iPubResponse } from '../interfaces/pubs.interfaces';
import { createPubService } from '../services/pubs/createPub.service'
import { listPubUniqueService } from '../services/pubs/listPubUnique.service';
import { updatePubService } from '../services/pubs/updatePub.service';
import { deletePubService } from '../services/pubs/deletePub.service';

const createPubController = async (req: Request, res: Response): Promise<Response> => {
    const pubData: iPubRequest = req.body
    const newPub: iPubResponse = await createPubService(pubData)

    return res.status(201).json(newPub)
}

const listPubUniqueController = async (req:Request, res: Response): Promise<Response> => {
	const pubId: number = parseInt(req.params.id);
	const pub = await listPubUniqueService(pubId);

	return res.status(200).json(pub);
}

const updatePubController = async (req: Request, res: Response): Promise<Response> => {
    const pubId: number = parseInt(req.params.id);
    const newPub: iPubResponse = await updatePubService(pubId, req.body)

    return res.status(200).json(newPub)
}  

const deletePubController = async (req: Request, res: Response): Promise<Response> => {
    const pubId: number = parseInt(req.params.id);
	await deletePubService(pubId);

    return res.status(204).send()
}

export {
    createPubController,
    listPubUniqueController,
    updatePubController,
    deletePubController
}