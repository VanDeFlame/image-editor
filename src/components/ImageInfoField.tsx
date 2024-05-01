interface IImageInfoField {
	label: string;
	value: string | number;
	title?: string;
}

export function ImageInfoField({
	label,
	value,
	title,
}: IImageInfoField): React.ReactNode {
	return (
		<div className='flex flex-1 flex-col overflow-hidden'>
			<h6>{label}</h6>
			<small className='truncate' title={title ?? `${label}: ${value}`}>
				{value}
			</small>
		</div>
	);
}
