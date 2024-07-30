export type CollapsibleApi = {
	isOpened: () => boolean;
	setIsOpened: (newValue: boolean) => boolean;
	toggle: () => void;
};