import React, { useCallback, useEffect, useState } from 'react';
import { areValidParamsRangeSlider } from '../../utils/areValidParams';

interface IRangeSliderProps extends React.ComponentProps<'div'> {
	onSetValue: (value: number) => void;
	initialValue?: number;
	min?: number;
	max?: number;
	step?: number;
}

const inputStyle =
	'appearance-none rounded-xl border-2 border-cyan-600 bg-neutral-300 hover:bg-cyan-100 focus-visible:bg-cyan-100 focus-visible:outline-none hover:disabled:bg-neutral-300 dark:border-cyan-500 dark:bg-zinc-800 dark:hover:bg-cyan-950 dark:focus-visible:bg-cyan-950 dark:hover:disabled:bg-zinc-800';

export function RangeSlider({
	onSetValue,
	title,
	className,
	initialValue,
	'aria-label': ariaLabel,
	min = 0,
	max = 100,
	step = 1,
	...props
}: IRangeSliderProps): React.ReactNode {
	const [value, setValue] = useState(initialValue ?? max);
	const rangeSliderClasses = ['flex flex-col items-start', className].join(' ');
	const timeoutRef = React.useRef<number | null>(null);

	useEffect(() => {
		areValidParamsRangeSlider({ max, min, step, initialValue });
	}, [max, min, step, initialValue]);

	const handleResetTimeout = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = window.setTimeout(async () => {
			await onSetValue(value);
		}, 1000);
	}, [onSetValue, value]);

	const handleChange = useCallback(
		(newValue: number): void => {
			setValue(Math.min(max, Math.max(min, newValue)));
			handleResetTimeout();
		},
		[handleResetTimeout, max, min]
	);
	const handleIncrement = useCallback(
		() => handleChange(value + step),
		[handleChange, value, step]
	);
	const handleDecrement = useCallback(
		() => handleChange(value - step),
		[handleChange, value, step]
	);
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>): void => {
			if (e.code === 'ArrowUp') {
				handleIncrement();
				e.preventDefault();
			} else if (e.code === 'ArrowDown') {
				handleDecrement();
				e.preventDefault();
			}
		},
		[handleIncrement, handleDecrement]
	);
	const handleWheelScroll = useCallback(
		(e: React.WheelEvent<HTMLInputElement>): void => {
			if (e.deltaY < 0) {
				handleIncrement();
			} else if (e.deltaY > 0) {
				handleDecrement();
			}
		},
		[handleIncrement, handleDecrement]
	);

	return (
		<div className={rangeSliderClasses} {...props}>
			<small className='px-1'>{title}</small>
			<label className='flex gap-2' aria-label={ariaLabel}>
				<input
					className={`${inputStyle} cursor-pointer px-1 text-cyan-600 accent-cyan-600 disabled:cursor-default dark:text-cyan-500 dark:accent-cyan-500`}
					type='range'
					max={max}
					min={min}
					step={step}
					value={value}
					onChange={(e) => handleChange(Number(e.target.value))}
					onWheel={handleWheelScroll}
				/>
				<input
					className={`${inputStyle} min-w-12 max-w-20 px-2 text-center`}
					type='text'
					pattern='[0-9]*'
					value={value}
					onChange={(e) => handleChange(Number(e.target.value))}
					onKeyDown={handleKeyDown}
					onWheel={handleWheelScroll}
				/>
			</label>
		</div>
	);
}
