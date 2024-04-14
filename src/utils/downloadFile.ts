export function downloadFile(fileUrl: string, filename: string): void {
	const link = document.createElement('a');
	link.href = fileUrl;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
