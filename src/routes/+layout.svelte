<script>
	// import { i18n } from '$lib/i18n';
	// import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	// import { link } from '$app/navigation';
	import Footer from '$lib/Footer.svelte';
	// import { onMount } from 'svelte';
	import '../app.css';
	let { children } = $props();

	let baseTitle = 'Black Pearl Racing Team - KMUTT';

	// Array of navigation items
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/team', label: 'Team' },
		{ href: '/sponsor', label: 'Sponsors' },
		{ href: '/merch', label: 'Merch' },
		{ href: '/tools', label: 'Tools' },
		{ href: '/archives', label: 'Archives' }
	];

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<svelte:head>
	<title>{baseTitle}</title>
</svelte:head>

<!-- Fix: for fixed/sticky footer on the bottom -->
<!-- https://stackoverflow.com/questions/59812003/tailwindcss-fixed-sticky-footer-on-the-bottom -->
<div class="flex h-screen flex-col">
	<nav class="hidden p-2 md:flex lg:flex xl:flex">
		<ul class="flex space-x-4">
			{#each navItems as { href, label }}
				<li>
					<a {href} class="group relative text-black">
						{label}
						<span
							class="absolute bottom-0 left-0 h-0.5 w-0 bg-amber_SAE_ECE transition-all group-hover:w-full"
						></span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<nav class="bg-white p-4 shadow-md md:hidden">
		<div class="flex items-center justify-between">
			<!-- Logo or Brand Name -->
			<a href="/" class="text-xl font-bold text-black">Black Pearl Racing</a>

			<!-- Hamburger Button (Visible on Mobile) -->
			<button
				class="text-black focus:outline-none md:hidden"
				onclick={toggleMenu}
				aria-label="Toggle nav menu"
			>
				<!-- Hamburger Icon -->
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>

		<!-- Navigation Links (mobile) -->
		<ul
			class={`overflow-hidden transition-all duration-500 ease-in-out ${
				isMenuOpen ? 'max-h-96' : 'max-h-0'
			} md:flex md:max-h-full md:space-x-6`}
		>
			{#each navItems as { href, label }}
				<li>
					<a {href} class="block px-0 py-2 text-black hover:text-blue-700">
						{label}
						<span
							class="absolute bottom-0 left-0 h-0.5 w-0 bg-amber_SAE_ECE transition-all group-hover:w-full"
						></span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- old main setup -->
	<!-- <main class="flex min-h-screen grow flex-col"> -->
	<main class="flex-grow">
		<!-- <ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS> -->

		{@render children()}
	</main>

	<Footer />
</div>

<style>
	* {
		font-family: 'Bricolage Grotesque Variable', monospace;
	}
</style>
