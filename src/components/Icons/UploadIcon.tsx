import { ISvgIconProps } from '../../types/ISvgIconProps';

export default function UploadIcon(props: ISvgIconProps): React.ReactNode {
	return (
		<svg
			fill='none'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M11 14.986a1 1 0 102 0V7.828l3.243 3.243 1.414-1.414L12 4 6.343 9.657l1.414 1.414L11 7.83v7.157z'
				fill='currentColor'
			/>
			<path
				d='M4 14h2v4h12v-4h2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z'
				fill='currentColor'
			/>
		</svg>
	);
}
