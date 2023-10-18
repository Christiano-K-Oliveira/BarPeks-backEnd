import { Request, Response, Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { pubsSchemaRequest, pubsUpdateSchemaRequest } from "../schemas/pubs.schemas";
import { createPubController, deletePubController, listPubUniqueController, resetPasswordController, sendEmailResetPasswordController, updatePubController, uploadPubController } from "../controllers/pubs.controllers";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { ensurePubAccount } from "../middlewares/ensureAccount.middleware";

const upload = require('../middlewares/uploadPhoto.middleware')
const pubsRoutes: Router = Router();

pubsRoutes.post('', validateData(pubsSchemaRequest), createPubController)
pubsRoutes.get('', ensureAuthIsValidMiddleware, listPubUniqueController)
pubsRoutes.patch('/:id', ensureAuthIsValidMiddleware, ensurePubAccount, validateData(pubsUpdateSchemaRequest), updatePubController)
pubsRoutes.delete('/:id', ensureAuthIsValidMiddleware, ensurePubAccount, deletePubController)
pubsRoutes.post('/recuperar-senha', sendEmailResetPasswordController)
pubsRoutes.patch('/recuperar-senha/:token', resetPasswordController)
pubsRoutes.patch('/upload/:id', (upload.single('file')), uploadPubController)
// pubsRoutes.post('/plan', (req: Request, res: Response) => {
//     const data = req.body

//     console.log(data)
// })

export default pubsRoutes
