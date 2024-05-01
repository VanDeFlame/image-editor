import { Request, Response } from 'express';
import { FormatEnum } from 'sharp';
import { ImageService } from '../service/ImageService';
import { FilterEnum } from '../types/FilterEnum';

function upload(req: any, res: Response): void {
	try {
		const image = req.file.buffer;
		const result = new ImageService(image);

		res.status(200).json({ id: result.getId() });
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
}

async function get(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;

		const instance = ImageService.getInstance(id);

		res.status(200).send(instance.image);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
}
async function getMetadata(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;

		const instance = ImageService.getInstance(id);
		const metadata = await instance.getMetadata();

		res.status(200).json(metadata);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
}

async function reset(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;

		const instance = ImageService.getInstance(id);
		const result = await instance.reset();

		res.status(200).send(result.image);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
}

async function destroy(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;

		ImageService.destroyInstance(id);

		res.sendStatus(204);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
}

async function setFilter(req: Request, res: Response): Promise<void> {
	try {
		const { id, filter } = req.params;
		const options = req.body;

		const instance = ImageService.getInstance(id);

		switch (filter) {
			case FilterEnum.GRAYSCALE:
				await instance.grayscale();
				break;
			case FilterEnum.NEGATIVE:
				await instance.negative();
				break;
			case FilterEnum.NORMALISE:
				await instance.normalise();
				break;
			case FilterEnum.BLUR:
				await instance.blur(options);
				break;
			default:
				res.status(400).json({ message: 'Filtro inválido' });
				return;
		}

		res.status(200).send(instance.image);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
}

async function toFormat(req: Request, res: Response): Promise<void> {
	try {
		const { id } = req.params;
		const { format, options } = req.body as {
			format: keyof FormatEnum;
			options: object;
		};

		const instance = ImageService.getInstance(id);
		const result = await instance.toFormat(format, options);

		res.status(200).send(result.image);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
}

export const ImageController = {
	upload,
	get,
	getMetadata,
	reset,
	destroy,
	setFilter,
	toFormat,
};
