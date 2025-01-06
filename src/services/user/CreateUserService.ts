import { hash } from "bcryptjs";
import { prisma } from "../../lib/prisma";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    async execute({ email, name, password }: UserRequest) {

        //Verifica se o email foi enviado
        if (!email) {
            throw new Error("E-mail Obrigatório!")
        }

        //Verifica se o email está cadastrado
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email,
            }
        })
        if (userAlreadyExists) {
            throw new Error("E-mail já existe!")
        }

        //Encriptar a senha
        const passwordHash = await hash(password, 8)

        //Cadastrar usuário no Banco
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })


        return user;
    }
};