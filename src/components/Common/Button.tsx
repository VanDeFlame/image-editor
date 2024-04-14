interface IButtonProps extends React.ComponentProps<'button'> {
	children: React.ReactNode;
}

export const buttonStyles =
	'rounded-lg border border-cyan-600 dark:border-cyan-500 dark:text-cyan-500 text-cyan-600 dark:hover:bg-cyan-950 hover:bg-cyan-200 hover:bg-opacity-50 hover:disabled:bg-inherit dark:hover:disabled:bg-inherit  disabled:line-through';

export function Button({
	children,
	className,
	...props
}: IButtonProps): React.ReactNode {
	const buttonClasses = [buttonStyles, 'py-2 px-4', className].join(' ');

	return (
		<button className={buttonClasses} {...props}>
			{children}
		</button>
	);
}
