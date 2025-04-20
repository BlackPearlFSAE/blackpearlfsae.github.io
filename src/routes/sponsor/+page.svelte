<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';
	//
	import MasonrySection from './MasonrySection.svelte';

	let pageTitle = 'Sponsor';

	const platinumSponsors = Array.from({ length: 6 }, (_, i) => ({
		id: `platinum-${i}`,
		name: 'Lorem Corp',
		image: `https://picsum.photos/seed/platinum-${i}/400/300`
	}));

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

<div class="bg-baby_powder p-6 text-blackie">
	<h1 class="mb-8 text-center text-3xl font-bold">Our Sponsors</h1>
	<MasonrySection title="Platinum Sponsors" sponsors={platinumSponsors} />
	<MasonrySection title="Gold Sponsors" sponsors={goldSponsors} />
	<MasonrySection title="Silver Sponsors" sponsors={silverSponsors} />
</div>
