import { useEffect, useState } from 'react';
import { Button } from '../components/Common/Button';
import { DropdownSection } from '../components/DropdownSection';
import { ImagePreview } from '../components/ImagePreview';
import ImageUploader from '../components/ImageUploader';
import { useImage } from '../hooks/useImage';

export function Home(): JSX.Element {
	const {
		state,
		uploadImage,
		resetImage,
		clearImage,
		getImageAsUrl,
		setGrayscaleFilter,
		setNormaliseFilter,
		setNegativeFilter,
		download,
	} = useImage();

	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		if (state.image) {
			setImageUrl(getImageAsUrl());
		} else {
			setImageUrl(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.image]);

	return (
		<>
			<main className='flex flex-col items-center gap-4 py-4 text-cyan-600 dark:text-cyan-500'>
				<section className='h-100 flex w-full flex-wrap justify-center gap-4 overflow-hidden'>
					<ImagePreview image={imageUrl} />
				</section>
			</main>
			<aside className='top right flex flex-col items-center gap-4 py-4'>
				<ImageUploader handleFileLoad={uploadImage} />
			</aside>
			{state.image && (
				<aside className='bottom left flex flex-col gap-4 py-4'>
					<DropdownSection title='History'>
						<Button onClick={resetImage}>Reset</Button>
						<Button onClick={clearImage}>Clear</Button>
					</DropdownSection>
					<DropdownSection title='Filters'>
						<Button onClick={setGrayscaleFilter}>Grayscale</Button>
						<Button onClick={setNormaliseFilter}>Normalise</Button>
						<Button onClick={setNegativeFilter}>Negative</Button>
					</DropdownSection>
					<DropdownSection title='Download'>
						<Button onClick={(): Promise<void> => download('png')}>PNG</Button>
						<Button onClick={(): Promise<void> => download('webp')}>
							WEBP
						</Button>
						<Button onClick={(): Promise<void> => download('jpg')}>JPG</Button>
					</DropdownSection>
				</aside>
			)}
		</>
	);
}
