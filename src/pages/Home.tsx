import { useEffect } from 'react';
import { getTest } from '../services/test';

export function Home(): JSX.Element {
	useEffect(() => {
		getTest().then(console.log).catch(console.error);
	}, []);

	return (
		<>
			<main className='bg-blue-300'>
				<h2 className='text-4xl text-violet-700'>Welcome to the Home</h2>
				<h4>VanDeFlame</h4>
			</main>
			<aside className='right top bg-green-300'>Aside Right Top</aside>
			<aside className='left bottom bg-pink-300'>Aside Left Bottom</aside>
		</>
	);
}
