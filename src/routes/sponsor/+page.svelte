<script lang="ts">
	import { onMount } from 'svelte';

	const SHEET_ID = '1YxGlsysyGsMkIfi2E5XJ4mbOkLKnPCBp9nVEdL6cSRg';
	const TIER_ORDER = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];

	type Sponsor = { name: string; image: string; tier: string; website: string };

	let grouped: Record<string, Sponsor[]> = {};
	let loading = true;
	let error = false;

	function driveImage(url: string) {
		const slashMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
		const queryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
		const id = slashMatch?.[1] ?? queryMatch?.[1];
		return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w400` : url;
	}

	onMount(async () => {
		try {
			const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sponsors`;
			const res = await fetch(url);
			const text = await res.text();
			const json = JSON.parse(text.match(/setResponse\(([\s\S]*)\);?\s*$/)![1]);
			const headers: string[] = (json.table?.cols || []).map((col: any) => col.label);
			const rows: any[] = json.table?.rows || [];

			const sponsors: Sponsor[] = rows.map((row) => {
				const c = row.c;
				const get = (key: string) => String(c[headers.indexOf(key)]?.v ?? '').trim();
				return {
					name: get('name'),
					image: get('image') ? driveImage(get('image')) : '',
					tier: get('tier') || 'Bronze',
					website: get('website')
				};
			});

			grouped = {};
			for (const s of sponsors) {
				if (!grouped[s.tier]) grouped[s.tier] = [];
				grouped[s.tier].push(s);
			}
		} catch {
			error = true;
		} finally {
			loading = false;
		}
	});

	$: tiers = TIER_ORDER.filter((t) => grouped[t]?.length);
</script>

<svelte:head>
	<title>Sponsors</title>
</svelte:head>

<div class="bg-baby_powder dark:bg-gray-900 min-h-screen px-6 py-10 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="mx-auto max-w-5xl">
		<h1 class="mb-10 text-center text-3xl font-bold">Our Sponsors</h1>

		{#if loading}
			<p class="text-center text-gray-500">Loading sponsors…</p>
		{:else if error}
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
								<a href={sponsor.website} target="_blank" rel="noopener noreferrer">
									<img src={sponsor.image} alt={sponsor.name} class="h-20 w-auto object-contain transition-opacity hover:opacity-80" />
								</a>
							{:else}
								<img src={sponsor.image} alt={sponsor.name} class="h-20 w-auto object-contain" />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
