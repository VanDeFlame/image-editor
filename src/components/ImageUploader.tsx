import React, { useMemo } from 'react';
import { buttonStyles } from './Common/Button';
import UploadIcon from './Icons/UploadIcon';

function ImageUploader({ handleImageUpload }: any): React.ReactNode {
	const inputRef: React.Ref<HTMLInputElement> | null = React.useRef(null);
	const reader = useMemo(() => new FileReader(), []);

	const handleFileLoad = (file: File): void => {
		reader.onload = (): void => {
			if (reader.result instanceof ArrayBuffer) {
				const fileMetadata = {
					mimetype: file.type,
					filename: file.name,
				};

				handleImageUpload(reader.result, fileMetadata);
			}
		};

		reader.readAsArrayBuffer(file);
	};

	const handleFileChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const file = event.target.files?.[0];
		if (!file) return;

		handleFileLoad(file);
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
		event.preventDefault();

		const file = event.dataTransfer.files?.[0];
		if (!file) return;

		handleFileLoad(file);
	};

	const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>): void => {
		const items = event.clipboardData?.items;
		if (!items) return;

		for (const item of items) {
			if (item.kind !== 'file') return;

			const file = item.getAsFile();
			if (!file) return;

			handleFileLoad(file);
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
		event.preventDefault();
	};

	const handleLabel = (e: React.KeyboardEvent<HTMLLabelElement>): void => {
		if ((e.key !== 'Enter' && e.code !== 'Space') || inputRef.current === null)
			return;
		inputRef.current.click();
	};

	return (
		<div
			role='form'
			className='flex max-w-sm flex-col items-center justify-evenly gap-4 rounded-xl border-2 border-dashed border-cyan-600 p-4 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500'
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onPaste={handlePaste}
		>
			<div className='flex gap-2 lg:flex-col'>
				<UploadIcon className='aspect-square max-h-24' />
				<p>Drag and drop an image here or paste one from the clipboard</p>
			</div>
			<hr className='w-full border-t-2 border-dashed border-cyan-600 dark:border-cyan-500' />
			<div className='flex flex-col gap-2'>
				<label
					tabIndex={1}
					onKeyUp={handleLabel}
					htmlFor='fileInput'
					aria-label='Upload an image from your files'
					title='Upload an image from your files'
					className={`${buttonStyles} cursor-pointer px-8 py-2`}
				>
					Choose a file
					<input
						ref={inputRef}
						id='fileInput'
						type='file'
						accept='image/*'
						name='image'
						className='hidden'
						onChange={handleFileChange}
					/>
				</label>
				<small>SVG, PNG, JPG, WEBP</small>
			</div>
		</div>
	);
}

export default ImageUploader;
