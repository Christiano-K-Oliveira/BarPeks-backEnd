import { Request, Response } from 'express';
import { iPubRequest, iPubResponse } from '../interfaces/pubs.interfaces';
import { createPubService } from '../services/pubs/createPub.service'
import { listPubUniqueService } from '../services/pubs/listPubUnique.service';
import { updatePubService } from '../services/pubs/updatePub.service';
import { deletePubService } from '../services/pubs/deletePub.service';
import { resetPasswordService } from '../services/pubs/resetPassword.service';
import { uploadPubService } from '../services/pubs/uploadPub.service';
import { sendEmailResetPasswordPubService } from '../services/pubs/senEmailResetPassword.service';

const createPubController = async (req: Request, res: Response): Promise<Response> => {
    const pubData: iPubRequest = req.body
    const newPub: iPubResponse = await createPubService(pubData)

    return res.status(201).json(newPub)
}

const listPubUniqueController = async (req: Request, res: Response): Promise<Response> => {
	const pubId: number = parseInt(res.locals.usuarioId);
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

const sendEmailResetPasswordController = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    await sendEmailResetPasswordPubService(email)

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

const uploadPubController = async (req: Request, res: Response): Promise<Response> => {
    const pubId: number = parseInt(req.params.id)
    const photo: Express.Multer.File | undefined = req.file

    const pub = await uploadPubService(pubId, photo)

    return res.status(200).json(pub)
}

export {
    createPubController,
    listPubUniqueController,
    updatePubController,
    deletePubController,
    sendEmailResetPasswordController,
    resetPasswordController,
    uploadPubController
}