import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
	getDarkModePreference,
	setThemePreference,
} from './utils/themePreference.ts';

setThemePreference(getDarkModePreference());
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
