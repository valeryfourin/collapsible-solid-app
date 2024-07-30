export const generateUniqueId = (): string => {
	return Math.random().toString(16).slice(2);
}