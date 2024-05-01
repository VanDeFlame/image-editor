import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import { multipartHandler } from '../middlewares/multipartHandler';

export const routes = Router();

routes.post(
	'/image/upload',
	multipartHandler.single('image'),
	ImageController.upload
);
routes.get('/image/:id', ImageController.get);
routes.get('/image/:id/metadata', ImageController.getMetadata);
routes.get('/image/:id/reset', ImageController.reset);
routes.delete('/image/:id', ImageController.destroy);
routes.post('/image/:id/filter/:filter', ImageController.setFilter);
routes.post('/image/:id/format', ImageController.toFormat);
