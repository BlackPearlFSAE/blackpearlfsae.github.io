<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'About';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="bg-baby_powder dark:bg-gray-900 p-2 text-blackie dark:text-gray-100 transition-colors duration-200">
	<p class="p-2 font-extrabold italic text-gray-600 dark:text-gray-400">Coming soon...</p>
	<img src="/cars/BP16.png" alt="BP16" class="w-full" />
</div>
