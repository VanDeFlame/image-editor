import { useEffect, useState } from 'react';
import MoonIcon from './Icons/MoonIcon';
import SunIcon from './Icons/SunIcon';
import { ThemeEnum } from '../types/ThemeEnum';
import {
	getDarkModePreference,
	setThemePreference,
} from '../utils/themePreference';

export function ToggleDarkMode(): JSX.Element {
	const [darkMode, setDarkMode] = useState(getDarkModePreference());

	const toggleDarkMode = (): void => {
		setDarkMode(!darkMode);
	};

	const getTitle = (): string => {
		return `Change to ${darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK} mode`;
	};

	useEffect(() => {
		setThemePreference(darkMode);
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
