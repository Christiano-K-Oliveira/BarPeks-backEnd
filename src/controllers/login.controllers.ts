import { Request, Response } from "express";
import { loginPubService } from "../services/login/loginPub.service";
import { loginClientService } from "../services/login/loginClient.service";

const loginPubController = async (req: Request, res: Response): Promise<Response> => {
    const loginPub: string = await loginPubService(req.body)

    return res.status(200).json({
        token: loginPub
    })
}

const loginClientController = async (req: Request, res: Response): Promise<Response> => {
    const loginClient: string = await loginClientService(req.body)

    return res.status(200).json({
        token: loginClient
    })
}

export { loginPubController, loginClientController }