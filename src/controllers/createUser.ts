import { RequestHandler } from "express";
import * as UserService from "../services/createUser";
import { prisma } from "../lib/prisma";

export const createUser: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;

    //Verifica se o email foi enviado
    if (!email) {
        res.status(400).json({ error: 'E-mail Obrigatório!' })
    }

    //Verifica se o email está cadastrado
    const userAlreadyExists = await prisma.user.findFirst({
        where: {
            email,
        }
    })
    if (userAlreadyExists) {
        res.status(400).json({ error: 'E-mail já existe!' })
    }

    const newUser = await UserService.CreateUser({
        name,
        email,
        password,
    })

    res.status(201).json({ user: newUser })
};
