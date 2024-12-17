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
		{ href: '/sponsor', label: 'Sponsor' }
	];
</script>

<svelte:head>
	<title>{baseTitle}</title>
</svelte:head>

<nav class="p-2">
	<ul class="flex space-x-2">
		{#each navItems as { href, label }}
			<li>
				<a {href} class="group relative text-black">
					{label}
					<span
						class="bg-amber_SAE_ECE absolute bottom-0 left-0 h-0.5 w-0 transition-all group-hover:w-full"
					></span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<main class="flex min-h-screen flex-col">
	<!-- <ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS> -->

	{@render children()}

	<Footer />
</main>

<style>
	* {
		font-family: 'Bricolage Grotesque Variable', monospace;
	}
</style>
