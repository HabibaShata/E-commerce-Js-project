//general method
export function updateLocalStorage(key, value)
{
	localStorage.setItem(key, JSON.stringify(value));
}