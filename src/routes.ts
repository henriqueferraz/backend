import { Request, Response, Router } from "express";

import * as pingController from "./controllers/ping";
import * as userController from "./controllers/createUser";

import { isAuthenticated } from "./middlewares/isAuthenticated";

//---- ROTAS DE USUÁRIOS
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

//---- ROTAS DE CATEGORIA
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

export const router = Router();

/*
//---- ROTAS DE TESTE ----//
router.get('/ping', pingController.ping);

router.get('/teste', (req: Request, res: Response) => {
    throw new Error('Erro ao fazer a requisição!')
});
*/

//---- ROTAS DE TESTE PROTEGIDAS ----//
router.get('/me', isAuthenticated as any, new DetailUserController().handle);

//---- ROTAS NÃO PROTEGIDAS ----//
//----ROTAS USER ----// 
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

//---- ROTAS PROTEGIDAS ----//
//----
//---- ROTAS CATEGORY ----//
router.post('/category', isAuthenticated as any, new CreateCategoryController().handle);
router.get('/category', isAuthenticated as any, new ListCategoryController().handle);

//---- ROTAS PRODUCT ----//
router.post('/product', isAuthenticated as any, new CreateProductController().handle);

//---- ROTAS ATUALIZADAS USUARIOS ----//
router.post('/user', userController.createUser);
