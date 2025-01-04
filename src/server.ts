import express, { urlencoded } from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});