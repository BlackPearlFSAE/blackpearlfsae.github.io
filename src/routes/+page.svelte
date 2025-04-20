<script>
	import { onMount, onDestroy } from 'svelte';

	const baseTitle = 'Black Pearl Racing Team - KMUTT';

	let images = [
		{
			src: 'teams/IMG_0495.JPG',
			alt: 'BP16',
			caption: 'Team BP16 - TSAE 2025'
		},
		{
			src: 'teams/team_BP15.jpeg',
			alt: 'BP15',
			caption: 'Team BP15 - TSAE 2024'
		},
		{
			src: 'teams/team_BP14.jpg',
			alt: 'BP14',
			caption: 'Team BP14 - TSAE 2023'
		},
		{
			src: 'teams/team_BP9.jpg',
			alt: 'BP9',
			caption: 'Team BP9'
		}
	];

	let currentIndex = 0;
	const totalImages = images.length;
	let intervalA;

	function nextSlide() {
		currentIndex = (currentIndex + 1) % totalImages;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + totalImages) % totalImages;
	}

	onMount(() => {
		intervalA = setInterval(nextSlide, 7000); // Auto-slide every 7 seconds
	});

	onDestroy(() => {
		clearInterval(intervalA); // Clean up the interval on component destruction
	});

	// Countdown Timer
	const targetDate = new Date('2025-12-25T00:00:00');
	let timeLeft = getTimeRemaining();
	let intervalB;

	function getTimeRemaining() {
		const now = new Date();
		const total = targetDate - now;

		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		};
	}

	onMount(() => {
		intervalB = setInterval(() => {
			timeLeft = getTimeRemaining();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalB);
	});

	function formatNumber(num) {
		return String(num).padStart(2, '0');
	}

	const sponsors = [
		{
			src: '/sponsors/NSK.png',
			alt: 'NSK Global',
			caption: 'NSK Global',
			link: 'https://www.nsk.com/th-th/'
		},
		{
			src: '/sponsors/Pumkin.png',
			alt: 'Pumpkin',
			caption: 'Pumpkin',
			link: 'https://pumpkin.co.th/'
		},
		{
			src: '/sponsors/PSP.png',
			alt: 'PSP',
			caption: 'Prapadaeng Steel Pipe',
			link: 'https://www.dataforthai.com/company/0115547001383/'
		},
		{
			src: '/sponsors/henkel.png',
			alt: 'Henkel',
			caption: 'Henkel',
			link: 'https://www.henkel.co.th/'
		},
		{
			src: '/sponsors/nextzer.png',
			alt: 'Nextzer',
			caption: 'Nextzer',
			link: 'https://www.nexzter.com/'
		},
		{
			src: '/sponsors/UpBeat.png',
			alt: 'UpBeat',
			caption: 'UpBeat Trailers',
			link: 'https://www.upbeat.co.th/v2/index.php'
		},
		{
			src: '/sponsors/Lactasoy.png',
			alt: 'Lactasoy',
			caption: 'Lactasoy',
			link: 'https://www.lactasoy.com/'
		},
		{
			src: '/sponsors/PCBWay.png',
			alt: 'PCBWay',
			caption: 'PCBWay',
			link: 'https://www.pcbway.com/'
		},
		{
			src: '/sponsors/bender.png',
			alt: 'Bender',
			caption: 'Bender',
			link: 'https://www.bender.de/en/'
		},
		{
			src: '/sponsors/Tesla.png',
			alt: 'Tesla',
			caption: 'Tesla',
			link: 'https://www.tesla.com/'
		}
		// Add more sponsors as needed
	];
</script>

<svelte:head>
	<title>{baseTitle}</title>
</svelte:head>

<div class="bg-white p-4 text-black">
	<p class="font-sans text-5xl font-bold">Black Pearl Racing Team</p>
	<p class="text-2xl">
		<a
			href="https://www.fsaeonline.com/"
			target="_blank"
			class="font-semibold text-coqueilcot hover:underline">Formula Student</a
		>
		team of
		<a
			href="https://www.kmutt.ac.th/"
			target="_blank"
			class="font-semibold text-coqueilcot hover:underline">KMUTT</a
		>.
	</p>
</div>

<!-- Grid Layout for Countdown and Carousel -->
<div class="mx-auto grid grid-cols-1 items-center gap-8 bg-white p-4 text-black md:grid-cols-10">
	<!-- Timer: spans 3 columns on medium screens and above -->
	<div class="md:col-span-3">
		<!-- Timer content here -->
		<div class="mx-auto max-w-lg rounded-lg bg-gray-100 p-6 shadow-md">
			<h2 class="mb-2 text-3xl font-bold text-gray-800">laconic</h2>
			<p class="mb-4 italic text-gray-600">/ləˈkɒnɪk/</p>
			<p class="mb-2 text-sm font-semibold uppercase text-gray-500">adjective</p>
			<p class="mb-4 text-gray-700">
				Using very few words; concise to the point of seeming mysterious or rude.
			</p>
			<p class="mb-4 text-gray-700">
				<span class="font-semibold">Etymology:</span> From Latin <em>Laconicus</em>, meaning 'of or
				relating to Laconia', the region of ancient Greece that included Sparta. Spartans were known
				for their terse speech.
			</p>
			<div class="border-l-4 border-gray-400 pl-4 italic text-gray-600">
				When Philip II of Macedon threatened Sparta with destruction, the Spartans replied with a
				single word: “If.”
			</div>
		</div>

		<div class="h-[2rem]"></div>

		<!-- Countdown Timer -->
		<div class="mx-auto text-center">
			<h1 class="mb-6 text-3xl font-bold italic text-coqueilcot md:text-4xl">
				🏎️ Next Car Unveiling In...
			</h1>
			{#if timeLeft.total > 0}
				<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
					<div>
						<div class="text-5xl font-bold md:text-6xl">{timeLeft.days}</div>
						<div class="mt-2 text-lg text-coqueilcot">DAYS</div>
					</div>
					<div>
						<div class="text-5xl font-bold md:text-6xl">{formatNumber(timeLeft.hours)}</div>
						<div class="mt-2 text-lg text-coqueilcot">HOURS</div>
					</div>
					<div>
						<div class="text-5xl font-bold md:text-6xl">{formatNumber(timeLeft.minutes)}</div>
						<div class="mt-2 text-lg text-coqueilcot">MINUTES</div>
					</div>
					<div>
						<div class="text-5xl font-bold md:text-6xl">{formatNumber(timeLeft.seconds)}</div>
						<div class="mt-2 text-lg text-coqueilcot">SECONDS</div>
					</div>
				</div>
			{:else}
				<div class="mt-10 text-3xl font-bold md:text-4xl">🎉 The Car Has Been Unveiled! 🎉</div>
			{/if}
		</div>
	</div>

	<!-- Carousel: spans 7 columns on medium screens and above -->
	<div class="md:col-span-7">
		<!-- Carousel -->
		<div class="relative mx-auto w-full max-w-5xl overflow-hidden">
			<div
				class="flex transition-transform duration-500"
				style="transform: translateX(-{currentIndex * 100}%);"
			>
				{#each images as image}
					<div class="relative w-full flex-shrink-0">
						<div class="aspect-video">
							<img src={image.src} alt={image.alt} class="h-full w-full rounded-md object-cover" />
						</div>
						<!-- Caption Overlay -->
						<div
							class="absolute bottom-0 left-0 right-0 rounded-b-md bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-white"
						>
							<p class="text-base font-medium md:text-lg">{image.caption}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Navigation Controls -->
			<button
				on:click={prevSlide}
				class="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 text-black hover:bg-opacity-75"
				aria-label="Previous Slide"
			>
				&#8592;
			</button>
			<button
				on:click={nextSlide}
				class="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 text-black hover:bg-opacity-75"
				aria-label="Next Slide"
			>
				&#8594
			</button>
			<!-- ::contentReference[oaicite:10]{index=10} -->
		</div>
	</div>
</div>

<!-- <div class="grid grid-cols-1 items-center gap-8 bg-white p-4 text-black md:grid-cols-2"></div> -->

<div class="h-[2rem]"></div>
<hr />
<!-- Sponsors (homepage entry) -->
<div class="p-2 px-4">
	<div class="bg-baby_powder text-blackie">
		<h1 class="text-4xl font-bold">Driving Innovation Together</h1>
		<p>
			We extend our heartfelt gratitude to the sponsors who power our journey. Their unwavering
			support fuels our passion and drives us forward.​
		</p>
		<p>Explore our sponsors below and discover the remarkable work they do.</p>
	</div>
	<div class="overflow-x-auto whitespace-nowrap px-2 py-4">
		<div class="overflow-hidden whitespace-nowrap">
			<div class="animate-marquee flex">
				{#each sponsors as sponsor}
					<a
						href={sponsor.link}
						target="_blank"
						rel="noopener noreferrer"
						class="mx-3 flex w-48 flex-shrink-0 flex-col items-center"
					>
						<img src={sponsor.src} alt={sponsor.alt} class="h-48 w-48 object-contain" />
						<span class="mt-2 text-center text-sm font-semibold text-gray-700">
							{sponsor.caption}
						</span>
					</a>
				{/each}
				<!-- Duplicate the sponsors for seamless looping -->
				{#each sponsors as sponsor}
					<a
						href={sponsor.link}
						target="_blank"
						rel="noopener noreferrer"
						class="mx-3 flex w-48 flex-shrink-0 flex-col items-center"
					>
						<img src={sponsor.src} alt={sponsor.alt} class="h-48 w-48 object-contain" />
						<span class="mt-2 text-center text-sm font-semibold text-gray-700">
							{sponsor.caption}
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<div class="h-[2rem]"></div>

<!-- TODO: Tell more about FSAE story, BP formula team and other details. -->
