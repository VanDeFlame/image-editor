import { Request, Response, Router } from 'express';

export const routes = Router();

routes.get('/', (_: Request, res: Response) => {
	res.sendStatus(200);
});
