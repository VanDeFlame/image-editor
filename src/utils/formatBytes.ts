export function formatBytes(bytes: number, decimalPlaces: number = 2): string {
	if (bytes === 0) return '0 Bytes';

	const kilobyte = 1024;
	const sizeLabels = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const maxDecimalPlaces = decimalPlaces < 0 ? 0 : decimalPlaces;

	const exponent = Math.floor(Math.log(bytes) / Math.log(kilobyte));
	const formattedSize = parseFloat(
		(bytes / Math.pow(kilobyte, exponent)).toFixed(maxDecimalPlaces)
	);

	return `${formattedSize} ${sizeLabels[exponent]}`;
}
