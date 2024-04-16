import { ThemeEnum } from '../types/ThemeEnum';

export function getDarkModePreference(): boolean {
	const userPreference = localStorage.getItem('theme');

	if (!userPreference) {
		const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
		return systemPreference.matches;
	}

	return userPreference === ThemeEnum.DARK;
}

export function setThemePreference(darkMode: boolean): void {
	const theme = darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT;
	document.documentElement.classList.toggle(ThemeEnum.DARK, darkMode);
	document.documentElement.style.colorScheme = theme;
	localStorage.setItem('theme', theme);
}
