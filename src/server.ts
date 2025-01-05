import express, { NextFunction, Request, Response, urlencoded } from "express";
import 'express-async-errors';
import cors from "cors";
import { router } from "./routes";


const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message
        })
    }

    res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor!'
    })
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});