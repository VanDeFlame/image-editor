function calculateGreatestCommonDivisor(a: number, b: number): number {
	return b === 0 ? a : calculateGreatestCommonDivisor(b, a % b);
}

export function calculateAspectRatio(width: number, height: number): string {
	const divisor = calculateGreatestCommonDivisor(width, height);
	return `${width / divisor} / ${height / divisor}`;
}
