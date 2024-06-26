import { ISvgIconProps } from '../../types/ISvgIconProps';

export default function ImageIcon(props: ISvgIconProps): React.ReactNode {
	return (
		<svg
			fill='none'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M7 7a3 3 0 100 6 3 3 0 000-6zm-1 3a1 1 0 112 0 1 1 0 01-2 0z'
				fill='currentColor'
				fillRule='evenodd'
			/>
			<path
				d='M3 3a3 3 0 00-3 3v12a3 3 0 003 3h18a3 3 0 003-3V6a3 3 0 00-3-3H3zm18 2H3a1 1 0 00-1 1v12a1 1 0 001 1h4.314l6.878-6.879a3 3 0 014.243 0L22 15.686V6a1 1 0 00-1-1zm0 14H10.142l5.465-5.464a1 1 0 011.414 0l4.886 4.886A1 1 0 0121 19z'
				fill='currentColor'
				fillRule='evenodd'
			/>
		</svg>
	);
}
