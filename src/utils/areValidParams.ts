export function areValidParamsRangeSlider({
	initialValue,
	min,
	max,
	step,
}: {
	initialValue?: number;
	min: number;
	max: number;
	step: number;
}): void {
	if (step <= 0) {
		throw new Error('Step must be a positive number');
	}

	if (max < min) {
		throw new Error('Max value cannot be less than Min value');
	}

	if ((max - min) % step !== 0) {
		throw new Error(
			'The range difference between Max and Min must be divisible by the step'
		);
	}

	if (initialValue !== undefined) {
		if (initialValue < min || initialValue > max) {
			throw new Error('Initial value must be within the range of Min and Max');
		}

		const distanceFromMin = initialValue - min;
		const distanceFromMax = max - initialValue;
		if (distanceFromMin % step !== 0 || distanceFromMax % step !== 0) {
			throw new Error(
				'The initialValue must be a multiple of the step within the range'
			);
		}
	}
}
