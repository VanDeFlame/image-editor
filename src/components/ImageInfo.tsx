import { useMemo } from 'react';
import { ImageInfoField } from './ImageInfoField';
import { ImageMetadata } from '../types/ImageMetadata';
import { calculateAspectRatio } from '../utils/calculateAspectRatio';
import { formatBytes } from '../utils/formatBytes';

interface IImageInfo {
	data: ImageMetadata;
}

export function ImageInfo({ data }: IImageInfo): React.ReactNode {
	const resolution = useMemo(
		() => `${data.width} x ${data.height}`,
		[data.width, data.height]
	);
	const aspectRatio = useMemo(
		() => calculateAspectRatio(data.width, data.height),
		[data.width, data.height]
	);
	const size = useMemo(() => formatBytes(data.size), [data.size]);

	return (
		<section className='flex w-full max-w-sm flex-col items-center justify-evenly gap-2 rounded-xl border-2 border-dashed border-cyan-600 p-4 text-start text-cyan-600 dark:border-cyan-500 dark:text-cyan-500'>
			<h5 className='flex gap-2 lg:flex-col'>Image Data</h5>
			<hr className='my-2 w-full border-t-2 border-dashed border-cyan-600 dark:border-cyan-500' />

			<div className='flex w-full justify-between gap-2'>
				<ImageInfoField label='filename' value={data.filename} />
			</div>

			<div className='flex w-full justify-between gap-2'>
				<ImageInfoField label='size' value={size} />
				<ImageInfoField label='type' value={data.format} />
			</div>

			<div className='flex w-full justify-between gap-2'>
				<ImageInfoField label='resolution' value={resolution} />
				<ImageInfoField label='aspect ratio' value={aspectRatio} />
			</div>
		</section>
	);
}
