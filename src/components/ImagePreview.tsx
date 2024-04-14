import ImageIcon from './Icons/ImageIcon';

interface IImagePreview {
	image: string | null;
}

export function ImagePreview({ image }: IImagePreview): React.ReactNode {
	return (
		<figure className='flex h-full justify-center overflow-hidden'>
			{image ? (
				<img
					src={image}
					alt='Image Preview'
					className='rounded-lg border-2 border-dashed border-cyan-600 object-contain dark:border-cyan-500'
				/>
			) : (
				<div className='flex h-full flex-col items-center justify-center gap-8 p-8'>
					<ImageIcon className='aspect-square max-h-24' />
					<p className='flex-1'>Try uploading an image!</p>
				</div>
			)}
		</figure>
	);
}
