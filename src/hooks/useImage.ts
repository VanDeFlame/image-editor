import { useCompoundState } from './useCompoundState';
import ImageService from '../services/image.service';
import { FileMetadata, ImageMetadata } from '../types/ImageMetadata';
import { arrayBufferToUrl } from '../utils/arrayBufferToUrl';
import { downloadFile } from '../utils/downloadFile';
import { removeExtension } from '../utils/removeExtension';

interface IUseImageState {
	imageId: string;
	metadata: ImageMetadata | null;
	image: ArrayBuffer | null;
	error: Error | null;
}

const initialState: IUseImageState = {
	imageId: '',
	metadata: null,
	image: null,
	error: null,
};

interface IUseImage {
	state: IUseImageState;
	uploadImage: (
		result: ArrayBuffer,
		fileMetadata: FileMetadata
	) => Promise<void>;
	resetImage: () => Promise<void>;
	clearImage: () => Promise<void>;
	getImageAsUrl: () => string;
	setGrayscaleFilter: () => Promise<void>;
	setNegativeFilter: () => Promise<void>;
	setNormaliseFilter: () => Promise<void>;
	setBlurFilter: (value?: number) => Promise<void>;
	download: (format?: string, options?: object) => Promise<void>;
}

export function useImage(): IUseImage {
	const [state, setState] = useCompoundState<IUseImageState>(initialState);

	/* CHANGE IMAGE */
	const uploadImage = async (
		result: ArrayBuffer,
		fileMetadata: FileMetadata
	): Promise<void> => {
		try {
			clearImage();

			const { id } = await ImageService.upload({ image: result });
			const image = await ImageService.get(id);
			const metadata = await ImageService.getMetadata(id);

			setState({
				imageId: id,
				image,
				metadata: {
					...metadata,
					...fileMetadata,
				},
			});
		} catch (error: any) {
			setState({ error });
		}
	};

	const resetImage = async (): Promise<void> => {
		const image = await ImageService.reset(state.imageId);
		setState({ image });
	};

	const clearImage = async (): Promise<void> => {
		if (state.imageId === '') return;
		await ImageService.destroy(state.imageId);
		setState(initialState);
	};

	/* FILTERS */
	const setGrayscaleFilter = async (): Promise<void> => {
		const image = await ImageService.filter(state.imageId, 'grayscale');
		setState({ image });
	};
	const setNegativeFilter = async (): Promise<void> => {
		const image = await ImageService.filter(state.imageId, 'negative');
		setState({ image });
	};
	const setNormaliseFilter = async (): Promise<void> => {
		const image = await ImageService.filter(state.imageId, 'normalise');
		setState({ image });
	};
	const setBlurFilter = async (value?: number): Promise<void> => {
		const image = await ImageService.filter(state.imageId, 'blur', {
			sigma: value,
		});
		setState({ image });
	};

	/* UTILS */
	const getImageAsUrl = (): string => {
		if (!state.image) return '';
		return arrayBufferToUrl(state.image, state.metadata?.mimetype);
	};

	const generateFilename = (extension: string): string => {
		const name = state.metadata?.filename
			? removeExtension(state.metadata.filename)
			: 'output';

		return `${name}.${extension}`;
	};

	/* DOWNLOADS */
	const download = async (format?: string, options = {}): Promise<void> => {
		const outputFormat: string =
			format ?? state.metadata!.mimetype.split('/')[1];

		const image = await ImageService.toFormat(
			state.imageId,
			outputFormat,
			options
		);
		const imageUrl = arrayBufferToUrl(image, `image/${outputFormat}`);
		const imageName = generateFilename(outputFormat);
		downloadFile(imageUrl, imageName);
	};

	return {
		state,
		uploadImage,
		clearImage,
		resetImage,
		getImageAsUrl,
		setGrayscaleFilter,
		setNegativeFilter,
		setNormaliseFilter,
		setBlurFilter,
		download,
	};
}
