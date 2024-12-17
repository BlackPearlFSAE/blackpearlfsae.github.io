<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'About';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="p-2">
	<h1 class="text-3xl font-bold">Our Heritage</h1>
	<p class="font-sans font-medium">Coming from the flashback.</p>
</div>
