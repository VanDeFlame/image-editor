import { useState } from 'react';

type UseCompoundState<T> = [T, (newState: Partial<T>) => void];

const useCompoundState = <T>(initialState: T): UseCompoundState<T> => {
	const [_state, _setState] = useState(initialState);

	const setState = (newState: Partial<T>): void => {
		_setState((prevState) => ({ ...prevState, ...newState }));
	};

	return [_state, setState];
};

export { useCompoundState };
