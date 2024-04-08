import { environment } from '../config/environment';

export async function getTest(): Promise<string> {
	try {
		const api = `${environment.API}/`;
		const response = await fetch(api);
		return response.status === 200 ? 'ok' : 'no ok';
	} catch (e: any) {
		console.error(e);
		return 'error';
	}
}
