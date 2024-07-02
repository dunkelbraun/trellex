export function delay<T>(milliseconds: number, fn: () => T): Promise<T> {
	return new Promise<T>((resolve) => {
		setTimeout(() => {
			resolve(fn());
		}, milliseconds);
	});
}
