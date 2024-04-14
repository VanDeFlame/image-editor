import { ToggleDarkMode } from '../ToggleDarkMode';

export function Navbar(): JSX.Element {
	return (
		<nav className='text-black dark:text-white'>
			<ul>
				<li className='flex items-center justify-center'>
					<ToggleDarkMode />
				</li>
			</ul>
		</nav>
	);
}
