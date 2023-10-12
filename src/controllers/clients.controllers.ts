import { Request, Response } from 'express';
import { iClientRequest, iClientResponse } from "../interfaces/clients.interfaces"
import { createClientService } from "../services/clients/createClient.service"
import { listClientUniqueService } from '../services/clients/listClientUnique.service';
import { updateClientService } from '../services/clients/updateClient.service';
import { deleteClientService } from '../services/clients/deleteClient.service';
import { resetPasswordService } from '../services/clients/resetPassword.service';
import { uploadClientService } from '../services/clients/uploadClient.service';
import { sendEmailResetPasswordClientService } from '../services/clients/sendEmailResetPassword.service';

const createClientController = async (req: Request, res: Response): Promise<Response> => {
    const clientData: iClientRequest = req.body
    const newClient: iClientResponse = await createClientService(clientData)

    return res.status(201).json(newClient)
}

const listClientUniqueController = async (req: Request, res: Response): Promise<Response> => {
	const clientId: number = parseInt(res.locals.usuarioId);
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

    await sendEmailResetPasswordClientService(email)

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

const uploadClientController = async (req: Request, res: Response): Promise<Response> => {
    const clientId: number = parseInt(req.params.id)
    const photo: Express.Multer.File | undefined = req.file

    const client = await uploadClientService(clientId, photo)

    return res.status(200).json(client)
}

export {
    createClientController,
    listClientUniqueController,
    updateClientController,
    deleteClientController,
    sendEmailResetPasswordController,
    resetPasswordController,
    uploadClientController
}