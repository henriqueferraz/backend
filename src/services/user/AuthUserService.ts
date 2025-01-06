import { compare } from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { sign } from "jsonwebtoken";

interface UserRequest {
    email: string;
    password: string;
}

export class AuthUserService {
    async execute({ email, password }: UserRequest) {

        // VERIFICAR SE O EMAIL EXISTE
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new Error("Usuário ou email Inválido!")
        }

        // VERIFICAR SE A SENHA ESTÁ CORRETA
        const passwordMatch = await compare(password, user.password as string);

        if (!passwordMatch) {
            throw new Error("Usuário ou email Inválido!")
        }

        // GERAR JWT
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '24h'
            }
        );

        return ({
            id: user.id,
            email: user.email,
            name: user.name,
            token
        });
    }
};