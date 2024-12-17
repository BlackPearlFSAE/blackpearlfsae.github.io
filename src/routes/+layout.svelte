<script>
	// import { i18n } from '$lib/i18n';
	// import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { link } from '$app/navigation';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
	let { children } = $props();

	let baseTitle = 'Black Pearl Racing Team - KMUTT';
</script>

<svelte:head>
	<title>{baseTitle}</title>
</svelte:head>

<nav class="p-2">
	<ul class="flex space-x-2">
		<li>
			<a href="/" class="group relative text-black" use:link>
				Home
				<span
					class="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-400 transition-all group-hover:w-full"
				></span>
			</a>
		</li>
		<li>
			<a href="/about" class="group relative text-black" use:link>
				About
				<span
					class="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-400 transition-all group-hover:w-full"
				></span>
			</a>
		</li>
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
