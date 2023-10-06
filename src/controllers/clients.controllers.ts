import { Request, Response } from 'express';
import { iClientRequest, iClientResponse } from "../interfaces/clients.interfaces"
import { createClientService } from "../services/clients/createClient.service"
import { listClientUniqueService } from '../services/clients/listClientUnique.service';
import { updateClientService } from '../services/clients/updateClient.service';
import { deleteClientService } from '../services/clients/deleteClient.service';
import { sendEmailResetPasswordService } from '../services/clients/sendEmailResetPassword.service'
import { resetPasswordService } from '../services/clients/resetPassword.service';

const createClientController = async (req: Request, res: Response): Promise<Response> => {
    const clientData: iClientRequest = req.body
    const newClient: iClientResponse = await createClientService(clientData)

    return res.status(201).json(newClient)
}

const listClientUniqueController = async (req:Request, res: Response): Promise<Response> => {
	const clientId: number = parseInt(req.params.id);
	const client = await listClientUniqueService(clientId);

	return res.status(200).json(client);
}

const updateClientController = async (req: Request, res: Response): Promise<Response> => {
    const clientId: number = parseInt(req.params.id);
    const newClient: iClientResponse = await updateClientService(clientId, req.body)

    return res.status(200).json(newClient)
}  

const deleteClientController = async (req: Request, res: Response): Promise<Response> => {
    const clientId: number = parseInt(req.params.id);
	await deleteClientService(clientId);

    return res.status(204).send()
}


const sendEmailResetPasswordController = async (req: Request, res: Response) : Promise<Response> => {
    const { email } = req.body;

    await sendEmailResetPasswordService(email)

    return res.status(200).json({
        message: 'Token enviado'
    })
}

const resetPasswordController = async (req: Request, res: Response): Promise<Response> => {
    const { password } = req.body
    const { token } = req.params

    await resetPasswordService(password, token)

    return res.status(200).json({
        message: 'Senha atualizada com sucesso'
    })
}

export {
    createClientController,
    listClientUniqueController,
    updateClientController,
    deleteClientController,
    sendEmailResetPasswordController,
    resetPasswordController
}