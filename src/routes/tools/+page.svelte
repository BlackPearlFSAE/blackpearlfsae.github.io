<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'Tools';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="bg-baby_powder p-2 text-blackie">
	<h1 class="text-3xl font-bold">Our Internal Tools</h1>
	<p class="font-sans">In a winter vacation too.</p>

	<p>Anyways, here are the things coming soon.</p>

	<ul>
		<li>IG/Socials Template App (more details later)  </li>
		<li>PDF splitter/merger tool</li>
		<li>STL/STEP viewer</li>
	</ul>

	<p>We intend to make these tools on Svelte or WASM (Rust).</p>
</div>
