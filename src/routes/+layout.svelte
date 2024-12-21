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
</script>

<svelte:head>
	<title>{baseTitle}</title>
</svelte:head>

<!-- Fix: for fixed/sticky footer on the bottom -->
<!-- https://stackoverflow.com/questions/59812003/tailwindcss-fixed-sticky-footer-on-the-bottom -->
<div class="flex h-screen flex-col">
	<nav class="p-2">
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
