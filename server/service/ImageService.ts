import sharp, { FormatEnum } from 'sharp';
import { generarId } from '../helpers/generarId';

interface IImageService {
	toJson(): {
		id: string;
		image: Buffer;
	};
}

export class ImageService implements IImageService {
	private static instances = new Map<string, ImageService>();
	private id: string;
	private baseImage: Buffer;
	private currentImage: Buffer;

	constructor(original: ArrayBuffer) {
		this.id = generarId();
		this.baseImage = Buffer.from(original);
		ImageService.instances.set(this.id, this);
	}

	/* STATIC */
	public static getInstance(id: string): ImageService {
		const instance = ImageService.instances.get(id);
		if (!instance) throw new Error('Not Found');
		return instance;
	}

	public static destroyInstance(id: string): void {
		const deleted = ImageService.instances.delete(id);
		if (!deleted) throw new Error('Not Found');
	}

	/* GETTERS */
	getId(): string {
		return this.id;
	}

	get original(): Buffer {
		return this.baseImage;
	}

	get image(): Buffer {
		return this.currentImage ?? this.original;
	}

	/* SETTERS */
	set image(buffer: Buffer) {
		this.currentImage = buffer;
	}

	/* OVERRIDES */
	public toJson(): { id: string; image: Buffer } {
		return {
			id: this.id,
			image: this.image,
		};
	}

	/* FEATURES */
	public async grayscale(): Promise<ImageService> {
		const result = await sharp(this.image).greyscale().toBuffer();
		this.image = result;
		return this;
	}

	public async negative(): Promise<ImageService> {
		const result = await sharp(this.image).negate({ alpha: false }).toBuffer();
		this.image = result;
		return this;
	}

	public async normalise(): Promise<ImageService> {
		const result = await sharp(this.image).normalise().toBuffer();
		this.image = result;
		return this;
	}

	public async blur({ sigma }: { sigma?: number }): Promise<ImageService> {
		const result = await sharp(this.image).blur(sigma).toBuffer();
		this.image = result;
		return this;
	}

	public async toFormat(
		format: keyof FormatEnum,
		options = {}
	): Promise<ImageService> {
		const result = await sharp(this.image).toFormat(format, options).toBuffer();
		this.image = result;
		return this;
	}

	public async reset(): Promise<ImageService> {
		this.image = this.baseImage;
		return this;
	}
}
