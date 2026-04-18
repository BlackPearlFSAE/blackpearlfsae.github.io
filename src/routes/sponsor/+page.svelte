<script lang="ts">
	import { onMount } from 'svelte';
	import { sponsors, sponsorsLoading, sponsorsError, loadSponsors } from '$lib/sponsorStore';

	const TIER_ORDER = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];

	let grouped: Record<string, (typeof $sponsors)[0][]> = {};

	$: {
		grouped = {};
		for (const s of $sponsors) {
			if (!grouped[s.tier]) grouped[s.tier] = [];
			grouped[s.tier].push(s);
		}
	}

	$: tiers = TIER_ORDER.filter((t) => grouped[t]?.length);

	onMount(loadSponsors);
</script>

<svelte:head>
	<title>Sponsors</title>
</svelte:head>

<div class="bg-baby_powder dark:bg-gray-900 min-h-screen px-6 py-10 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="mx-auto max-w-5xl">
		<h1 class="mb-10 text-center text-3xl font-bold">Our Sponsors</h1>

		{#if $sponsorsLoading}
			<p class="text-center text-gray-500">Loading sponsors…</p>
		{:else if $sponsorsError}
			<p class="text-center text-red-500">Could not load sponsors.</p>
		{:else if tiers.length === 0}
			<p class="text-center text-gray-500">No sponsors found.</p>
		{:else}
			{#each tiers as tier}
				<div class="mb-10">
					<h2 class="mb-4 text-center text-xl font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{tier}</h2>
					<div class="flex flex-wrap justify-center items-center gap-6">
						{#each grouped[tier] as sponsor}
							{#if sponsor.website}
								<a href={sponsor.website} target="_blank" rel="noopener noreferrer" class="flex items-center justify-center h-20 w-40 rounded-lg bg-black/40 p-3 transition-opacity hover:opacity-80">
									<img src={sponsor.image} alt={sponsor.name} class="h-full w-full object-contain" />
								</a>
							{:else}
								<div class="flex items-center justify-center h-20 w-40 rounded-lg bg-black/40 p-3">
									<img src={sponsor.image} alt={sponsor.name} class="h-full w-full object-contain" />
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
