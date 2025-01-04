import { Request, Response, Router } from "express";
import * as pingController from "./controllers/ping";

export const router = Router();

router.get('/ping', pingController.ping);

router.get('/teste', (req: Request, res: Response) => {
    res.json({ ok: true })
});