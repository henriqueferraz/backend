import { Request, Response, Router } from "express";

import * as pingController from "./controllers/ping";
import * as userController from "./controllers/createUser";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

export const router = Router();

/*
//---- ROTAS DE TESTE ----//
router.get('/ping', pingController.ping);

router.get('/teste', (req: Request, res: Response) => {
    throw new Error('Erro ao fazer a requisição!')
});

//---- ROTAS DE TESTE PROTEGIDAS ----//
router.get('/me', isAuthenticated as any, new DetailUserController().handle);
*/

//----ROTAS USER ----// 
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

//---- ROTAS PROTEGIDAS ----//
router.get('/me', isAuthenticated as any, new DetailUserController().handle);

//---- ROTAS ATUALIZADAS USUARIOS ----//
router.post('/user', userController.createUser);
