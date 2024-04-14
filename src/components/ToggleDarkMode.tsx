import { useEffect, useState } from 'react';
import MoonIcon from './Icons/MoonIcon';
import SunIcon from './Icons/SunIcon';

export function ToggleDarkMode(): JSX.Element {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = (): void => {
		setDarkMode(!darkMode);
	};

	const getTitle = (): string => {
		return `Change to ${darkMode ? 'light' : 'dark'} mode`;
	};

	// useEffect(() => {
	// 	const userPreference = window.matchMedia('prefers-color-scheme: light')
	// 	document.documentElement.classList.toggle('dark');
	// 	document.documentElement.style.colorScheme = darkMode ? 'light' : 'dark';

	// })

	useEffect(() => {
		const userPreference = window.matchMedia('(prefers-color-scheme: dark)');
		setDarkMode(userPreference.matches);
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode);
		document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
	}, [darkMode]);

	return (
		<button onClick={toggleDarkMode} className='h-6 w-6' title={getTitle()}>
			{darkMode ? (
				<MoonIcon className='text-white' />
			) : (
				<SunIcon className='text-black' />
			)}
		</button>
	);
}
