import { environment } from '../config/environment';

async function upload(data: { image: ArrayBuffer }): Promise<{
	id: string;
}> {
	try {
		const api = `${environment.API}/image/upload`;

		const formData = new FormData();
		formData.append('image', new Blob([data.image]));

		const response = await fetch(api, {
			method: 'POST',
			body: formData,
		});

		return response.json();
	} catch (e: any) {
		console.error(e);
		throw e;
	}
}

async function destroy(id: string): Promise<void> {
	try {
		const api = `${environment.API}/image/${id}`;
		await fetch(api, {
			method: 'delete',
		});
	} catch (e: any) {
		console.error(e);
		throw e;
	}
}

async function get(id: string): Promise<ArrayBuffer> {
	try {
		const api = `${environment.API}/image/${id}`;
		const response = await fetch(api);
		const buffer = await response.arrayBuffer();

		return buffer;
	} catch (e: any) {
		console.error(e);
		throw e;
	}
}

async function reset(id: string): Promise<ArrayBuffer> {
	try {
		const api = `${environment.API}/image/${id}/reset`;
		const response = await fetch(api);
		const buffer = await response.arrayBuffer();

		return buffer;
	} catch (e: any) {
		console.error(e);
		throw e;
	}
}

async function filter(id: string, filter: string): Promise<ArrayBuffer> {
	try {
		const api = `${environment.API}/image/${id}/filter/${filter}`;
		const response = await fetch(api);
		const buffer = await response.arrayBuffer();

		return buffer;
	} catch (e: any) {
		console.error(e);
		throw e;
	}
}

async function toFormat(
	id: string,
	format: string,
	options = {}
): Promise<ArrayBuffer> {
	try {
		const api = `${environment.API}/image/${id}/format`;
		const response = await fetch(api, {
			method: 'post',
			body: JSON.stringify({
				format,
				options,
			}),
		});
		const buffer = await response.arrayBuffer();

		return buffer;
	} catch (e: any) {
		console.error(e);
		throw e;
	}
}

export default {
	upload,
	reset,
	destroy,
	get,
	filter,
	toFormat,
};
