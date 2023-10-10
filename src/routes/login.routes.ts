import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { loginEmailSchema, loginSchema } from "../schemas/login.schemas";
import { loginClientController, loginPubController, loginSocialMediaClientController, loginSocialMediaPubController } from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post('/login-pub', validateData(loginSchema), loginPubController)
loginRoutes.post('/login-google-pub', validateData(loginEmailSchema), loginSocialMediaPubController)
loginRoutes.post('/login-facebook-pub', validateData(loginEmailSchema), loginSocialMediaPubController)


loginRoutes.post('/login-client', validateData(loginSchema), loginClientController)
loginRoutes.post('/login-google-client', validateData(loginEmailSchema), loginSocialMediaClientController)
loginRoutes.post('/login-facebook-client', validateData(loginEmailSchema), loginSocialMediaClientController)


export default loginRoutes