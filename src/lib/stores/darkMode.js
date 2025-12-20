import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get initial theme preference
function getInitialTheme() {
	if (!browser) return 'system';
	
	// Check localStorage first
	const stored = localStorage.getItem('theme');
	if (stored === 'dark' || stored === 'light') {
		return stored;
	}
	
	// Fall back to system preference
	return 'system';
}

// Get actual theme value (dark or light) based on preference
function getActualTheme(preference) {
	if (preference === 'system' && browser) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return preference;
}

// Create the store
function createDarkModeStore() {
	const { subscribe, set, update } = writable(getInitialTheme());

	return {
		subscribe,
		set: (value) => {
			if (browser) {
				localStorage.setItem('theme', value);
				applyTheme(value);
			}
			set(value);
		},
		toggle: () => {
			update((current) => {
				let next;
				if (current === 'system') {
					// If system, toggle to opposite of current system preference
					const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					next = systemIsDark ? 'light' : 'dark';
				} else if (current === 'dark') {
					next = 'light';
				} else {
					next = 'dark';
				}
				if (browser) {
					localStorage.setItem('theme', next);
					applyTheme(next);
				}
				return next;
			});
		},
		init: () => {
			if (browser) {
				const preference = getInitialTheme();
				applyTheme(preference);
				
				// Listen for system theme changes
				const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				const handleChange = () => {
					const current = localStorage.getItem('theme');
					if (current === 'system' || !current) {
						applyTheme('system');
					}
				};
				mediaQuery.addEventListener('change', handleChange);
				
				return () => mediaQuery.removeEventListener('change', handleChange);
			}
		}
	};
}

// Apply theme to document
function applyTheme(preference) {
	if (!browser) return;
	
	const actualTheme = getActualTheme(preference);
	const root = document.documentElement;
	
	if (actualTheme === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
}

export const darkMode = createDarkModeStore();

