<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'About';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="bg-baby_powder p-2 text-blackie">
	<h1 class="text-3xl font-bold">Our Heritage</h1>
	<p class="font-sans">Coming from the flashback.</p>
	Check&nbsp;<a
		href="https://www.jsae.or.jp/files_publish/page/827/no_29.pdf"
		target="_blank"
		rel="noopener noreferrer"
		class="font-bold text-blue-600 hover:underline"
	>
		FSAE Japan 2014 report
	</a>
	here.

	<p class="mt-2">
		FSAE might have <a
			href="https://www.jsae.or.jp/files_publish/page/827/no_29.pdf"
			target="_blank"
			rel="noopener noreferrer"
			class="font-bold text-blue-600 hover:underline"
		>
			140+ pages of rule book
		</a> changing every year, but we play these rules all the time.
	</p>

	<dl>
		<dt class="font-bold">1. Work hard/play harder</dt>
		<dd class="mb-2">Does not need much of definition.</dd>

		<dt class="font-bold">2. Supportive</dt>
		<dd class="mb-2">and helpful in terms of knowledge sharing.</dd>

		<dt class="font-bold">3. Resourcefulness</dt>
		<dd class="mb-2">We bring the best out of optimum resources on our disposal.</dd>

		<dt class="font-bold">4. Learn, adapt, iterate, and repeat.</dt>
		<dd class="mb-2">Forever.</dd>

		<dt class="font-bold">5. Extreme ownership.</dt>
		<dd class="mb-2">
			No one will be poking you on your back. But you must deliver what you commit to.
		</dd>
	</dl>
</div>
