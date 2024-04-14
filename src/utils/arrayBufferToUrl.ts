export function arrayBufferToUrl(
	buffer: ArrayBuffer,
	mimetype?: string
): string {
	const byteArray = new Uint8Array(buffer);
	const blob = new Blob([byteArray], { type: mimetype ?? 'image/jpeg' });
	const url = URL.createObjectURL(blob);
	return url;
}
