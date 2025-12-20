<!-- src/routes/tools/+page.svelte -->
<script>
	import STLSTEPViewer from '$lib/STLSTEPViewer.svelte';

	let pageTitle = 'Tools and Resources';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="bg-baby_powder dark:bg-gray-900 p-6 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="mx-auto max-w-7xl">
		<h1 class="mb-4 text-3xl font-bold">Our Internal Tools</h1>
		<p class="mb-4 font-sans">In a winter vacation too.</p>

		<!-- STL/STEP Viewer -->
		<STLSTEPViewer />

		<div class="mb-8 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md transition-colors duration-200">
			<h2 class="mb-4 text-2xl font-bold text-blackie dark:text-gray-100">Coming Soon</h2>
			<ul class="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
				<li>IG/Socials Template App (more details later)</li>
				<li>PDF splitter/merger tool</li>
			</ul>
		</div>

		<p class="mb-4">We intend to make these tools on Svelte or WASM (Rust).</p>

		<div class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md transition-colors duration-200">
			<h2 class="mb-4 text-2xl font-bold text-blackie dark:text-gray-100">Common Links</h2>
			<ol class="list-decimal space-y-2 pl-6 text-gray-700 dark:text-gray-300">
				<li>
					<a
						href="https://www.jsae.or.jp/files_publish/page/827/no_29.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="font-bold text-blue-600 dark:text-blue-400 hover:underline"
					>
						140+ pages of rule book
					</a>
				</li>
				<li>
					<a
						href="https://www.fsaeonline.com/app/CompetitionResources.aspx"
						target="_blank"
						rel="noopener noreferrer"
						class="font-bold text-blue-600 dark:text-blue-400 hover:underline"
					>
						Competition resources
					</a>
				</li>
			</ol>
		</div>
	</div>
</div>
