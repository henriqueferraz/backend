import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"

type Props = {
    email: string,
    name: string,
    password: string,
}

export const CreateUser = async ({ name, email, password }: Props) => {

    //Encriptar a senha
    const passwordHash = await hash(password, 8)

    const newUser = await prisma.user.create({
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
    });

    return newUser;
}
