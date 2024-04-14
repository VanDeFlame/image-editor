interface IDropdownSection {
	title: string;
	children: React.ReactNode;
}

export function DropdownSection({
	title,
	children,
}: IDropdownSection): React.ReactNode {
	return (
		<section>
			<h4 className='mb-2 text-2xl'>{title}</h4>
			<div className='flex flex-wrap justify-center gap-2'>{children} </div>
		</section>
	);
}
