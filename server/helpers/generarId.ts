export function generarId(): string {
	const timeStamp = new Date().getTime();
	const randomValue = Math.floor(Math.random() * 1000);

	return `${timeStamp}${randomValue}`;
}
