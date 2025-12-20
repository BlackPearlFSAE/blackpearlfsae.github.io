<script>
	let pageTitle = 'About';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<section class="bg-baby_powder dark:bg-gray-900 px-6 py-12 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
		<!-- Main Content Section (Approximately 70% on large screens) -->
		<article class="lg:col-span-8">
			<h1 class="mb-6 text-4xl font-extrabold">Our Heritage</h1>
			<p class="mb-4">
				Reflecting on our journey, we invite you to explore our beginnings and milestones.
			</p>
			<p class="mb-4">
				Dive into the details with the
				<a
					href="https://www.jsae.or.jp/files_publish/page/827/no_29.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
				>
					FSAE Japan 2014 report
				</a>.
			</p>
			<p class="mb-6">
				The FSAE rulebook, spanning over
				<a
					href="https://www.fsaeonline.com/cdsweb/app/NewsItem.aspx?NewsItemID=379e4a8a-80a2-4a74-87c2-6f2de4212270"
					target="_blank"
					rel="noopener noreferrer"
					class="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
				>
					140 pages
				</a>
				and evolving annually, sets the stage—but we thrive within these dynamics.
			</p>
		</article>

		<!-- Core Values Section (Approximately 30% on large screens) -->
		<aside class="lg:col-span-4">
			<h2 class="mb-6 text-2xl font-bold">Our Core Values</h2>
			<dl class="space-y-4 rounded-lg bg-gray-100 dark:bg-gray-800 p-6 shadow-sm transition-colors duration-200">
				<div class="flex items-start">
					<span class="mr-3 text-xl">💪</span>
					<div>
						<dt class="text-lg font-semibold">Work Hard, Play Harder</dt>
						<dd class="text-gray-700 dark:text-gray-300">We balance dedication with celebration.</dd>
					</div>
				</div>
				<div class="flex items-start">
					<span class="mr-3 text-xl">🤝</span>
					<div>
						<dt class="text-lg font-semibold">Supportive</dt>
						<dd class="text-gray-700 dark:text-gray-300">
							Fostering a culture of knowledge sharing and mutual growth.
						</dd>
					</div>
				</div>
				<div class="flex items-start">
					<span class="mr-3 text-xl">🧠</span>
					<div>
						<dt class="text-lg font-semibold">Resourcefulness</dt>
						<dd class="text-gray-700 dark:text-gray-300">Maximizing the potential of available resources.</dd>
					</div>
				</div>
				<div class="flex items-start">
					<span class="mr-3 text-xl">🔄</span>
					<div>
						<dt class="text-lg font-semibold">Learn, Adapt, Iterate, Repeat</dt>
						<dd class="text-gray-700 dark:text-gray-300">Continuous improvement is at our core.</dd>
					</div>
				</div>
				<div class="flex items-start">
					<span class="mr-3 text-xl">🧭</span>
					<div>
						<dt class="text-lg font-semibold">Extreme Ownership</dt>
						<dd class="text-gray-700 dark:text-gray-300">
							We take full responsibility for our commitments and outcomes.
						</dd>
					</div>
				</div>
			</dl>
		</aside>
	</div>
</section>

<section class="bg-white dark:bg-gray-900 px-6 py-12 transition-colors duration-200">
	<div class="mx-auto max-w-7xl">
		<h2 class="mb-6 text-center text-3xl font-bold text-blackie dark:text-gray-100">Our Journey Through Time</h2>
		<figure class="overflow-hidden rounded-lg shadow-lg">
			<img
				src="/about/timeline.webp"
				alt="Timeline of Black Pearl Racing Team milestones"
				class="h-auto w-full"
			/>
			<figcaption class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
				A visual chronicle of Black Pearl Racing Team's milestones and achievements.
			</figcaption>
		</figure>
	</div>
</section>
