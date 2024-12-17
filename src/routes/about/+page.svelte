<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'About';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="bg-baby_powder text-blackie p-2">
	<h1 class="text-3xl font-bold">Our Heritage</h1>
	<p class="font-sans">Coming from the flashback.</p>
	Check <a 
	  href="https://www.jsae.or.jp/files_publish/page/827/no_29.pdf" 
	  target="_blank" 
	  rel="noopener noreferrer"
	  class="text-blue-600 hover:underline"
	>
	  FSAE Japan 2014 report
	</a> here.
</div>
