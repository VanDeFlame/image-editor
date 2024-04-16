import { Logo } from './Logo';
import { Navbar } from './Navbar';

interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<div className='gridLayout min-h-full bg-neutral-200 text-cyan-600 transition-colors dark:bg-zinc-900 dark:text-gray-50'>
			<header className='sticky top-0 border-b-2 border-b-cyan-600 bg-neutral-200 px-0 transition-colors dark:border-b-cyan-500 dark:bg-zinc-900'>
				<div className='flex h-full items-center justify-between px-4'>
					<Logo />
					<Navbar />
				</div>
			</header>
			{children}
		</div>
	);
}
