
interface ProductRequest {
    name: string,
    price: string,
    description: string,
    banner: string,
    category_id: string,
};

export class CreateProductService {
    async execute({ name, banner, category_id, description, price }: ProductRequest) {
        return { ok: true }
    }
};