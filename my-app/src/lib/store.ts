import { writable } from 'svelte/store';

export const selections = writable({
	first: '',
	second: ''
});
