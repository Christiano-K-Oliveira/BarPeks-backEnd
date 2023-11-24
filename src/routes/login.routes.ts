import { Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { loginSchema } from "../schemas/login.schemas";
import { loginClientController, loginPubController } from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post('/login-pub', validateData(loginSchema), loginPubController)
loginRoutes.post('/login-client', validateData(loginSchema), loginClientController)


export default loginRoutes