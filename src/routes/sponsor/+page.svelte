<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';
	//
	import MasonrySection from './MasonrySection.svelte';

	let pageTitle = 'Sponsor';

	// const platinumSponsors = Array.from({ length: 6 }, (_, i) => ({
	// 	id: `platinum-${i}`,
	// 	name: 'Lorem Corp',
	// 	image: 
	// }));

	const goldSponsors = Array.from({ length: 8 }, (_, i) => ({
		id: `gold-${i}`,
		name: 'Ipsum Inc.',
		image: `https://picsum.photos/seed/gold-${i}/400/300`
	}));

	const silverSponsors = Array.from({ length: 10 }, (_, i) => ({
		id: `silver-${i}`,
		name: 'Dolor LLC',
		image: `https://picsum.photos/seed/silver-${i}/400/300`
	}));
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<!-- <div class="bg-baby_powder p-2 text-blackie">
	<h1 class="text-3xl font-bold">Our Sponsors</h1>
	<br />
	<p class="font-extrabold italic text-gray-600">Coming soon...</p>
</div> -->

<div class="bg-baby_powder dark:bg-gray-900 p-6 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="container mx-auto px-4 row-auto">
		<h1 class="mb-8 text-center text-3xl font-bold">Our Sponsors</h1>
		<!-- <MasonrySection title="Platinum Sponsors" sponsors={platinumSponsors} />
		  -->
		<div class="flex flex-wrap justify-center items-center gap-6">
			<img src="/sponsors/hiokinoback.png" alt="Wurth" class="w-40 h-auto" />
			<img src="/sponsors/nsknoback.png" alt="Wurth" class="w-40 h-auto" />
			<img src="/sponsors/wurthnoback.png" alt="Wurth" class="w-40 h-auto" />
			<img src="/sponsors/cpenoback.png" alt="Wurth" class="w-40 h-auto" />
			<img src="/sponsors/nexzternoback.png" alt="Nexzter" class="w-40 h-auto" />
			<img src="/sponsors/PEMCEnoback.png" alt="PEMCE" class="w-40 h-auto" />
			<img src="/sponsors/pspnoback.png" alt="PSP" class="w-40 h-auto" />
			<img src="/sponsors/morinnoback.png" alt="Morin" class="w-40 h-auto" />
			<img src="/sponsors/pumpkinnoback.png" alt="Pumpkin" class="w-40 h-auto" />
			<img src="/sponsors/tozzhinnoback.png" alt="Tozzhin" class="w-40 h-auto" />
			<img src="/sponsors/upbeatnoback.png" alt="Upbeat" class="w-40 h-auto" />
			<img src="/sponsors/wurthnoback.png" alt="Wurth" class="w-40 h-auto" />
			<img src="/sponsors/wurthnoback.png" alt="Wurth" class="w-40 h-auto" />
		</div>
		<MasonrySection title="Gold Sponsors" sponsors={goldSponsors} />
		<MasonrySection title="Silver Sponsors" sponsors={silverSponsors} />
	</div>
</div>
