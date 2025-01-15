import { prisma } from "../../lib/prisma"

interface ProductRequest {
    name: string,
    price: string,
    description: string,
    banner: string,
    category_id: string,
};

export class CreateProductService {
    async execute({ name, banner, category_id, description, price }: ProductRequest) {

        const product = await prisma.product.create({
            data: {
                name,
                banner,
                category_id,
                description,
                price,
            }

        });


        return product;
    }
};