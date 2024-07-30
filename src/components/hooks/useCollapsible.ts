import { createSignal } from 'solid-js';
import { CollapsibleApi } from '../types';

interface UseControlledProps {
	value?: boolean;
	onToggle?: (value: boolean) => void;
}

export function useCollapsible({ value, onToggle }: UseControlledProps): CollapsibleApi {
	const defaultValue = value ?? false;
	const [internalIsOpened, setInternalIsOpened] = createSignal(defaultValue);

	const isOpened = () => internalIsOpened();
	const setIsOpened = (newValue: boolean) => {
		if (onToggle) {
			onToggle(newValue);
		}	

		setInternalIsOpened(newValue);

		return newValue;
	};
	
	const toggle = () => setIsOpened(!internalIsOpened());

  	return {isOpened, setIsOpened, toggle} as const;
}