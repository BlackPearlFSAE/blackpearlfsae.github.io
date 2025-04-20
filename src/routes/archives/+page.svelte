<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'Archives';

	let videos = [
		{
			src: 'https://www.youtube.com/embed/rGBTdZGggkk?si=1Hy4XjTqHdCGMv2E',
			caption: '2018. FPV shot on Black Pearl IX: Ubiquitous'
		},
		{
			src: 'https://www.youtube.com/embed/oIERsuLG-4I?si=ccZ6FBVI0okrhMBF',
			caption: '2016. FSAE Introduction Video'
		},
		{
			src: 'https://www.youtube.com/embed/Pn2aIwStQfc?si=f4y6NGSDwfR179Nh',
			caption: '2015. Yamaha provides Yamaha YZF-R6 engines to KMUTT FSAE Team'
		},
		{
			src: 'https://www.youtube.com/embed/c31PceBuelo?si=n7aB7Q2zcYQJVrDZ',
			caption: '2015 make video'
		},
		{
			src: 'https://www.youtube.com/embed/0IlmgSyzUzQ?si=hA-qyy5RU650TX4V',
			caption: '2013. Drift at Night.'
		},
		{
			src: 'https://www.youtube.com/embed/rROL4sWHbxY?si=ixPnJ9DjAJzhPb0z',
			caption: '2012. Black Pearl 4. Teaser.'
		},
		{
			src: 'https://www.youtube.com/embed/fQ-GM445fJI?si=CnaK_Nu8AC9WE8L4',
			caption: '2012. Team Update.'
		},
		{
			src: 'https://www.youtube.com/embed/6aJOC4fK9aI?si=7vF0HW2-bULGFBQZ',
			caption: '2011. Demo Run.'
		},
		{
			src: 'https://www.youtube.com/embed/Rf0vRCVNd-M?si=LZmW5UQSGj7oamUO',
			caption: '2011. Black Pearl 3 video (CAUTION: LOUD NOISE)'
		}
	];
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<!-- YouTube videos -->

<div class="bg-baby_powder p-2 text-blackie">
	<h1 class="text-3xl font-bold">Archives collection</h1>
	<p class="mb-4 font-sans">Explore our team's journey through the years.</p>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each videos as video}
			<div class="rounded-lg bg-white p-0 shadow">
				<iframe
					class="aspect-video w-full rounded"
					src={video.src}
					title={video.caption}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
				<p class="mt-2 text-sm italic text-gray-600">{video.caption}</p>
			</div>
		{/each}
	</div>
</div>
