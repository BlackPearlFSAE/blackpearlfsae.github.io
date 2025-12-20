<!-- MasonrySection.svelte -->
<script>
	export let title;
	export let sponsors = [];
</script>

<section class="mb-12">
	<h2 class="mb-4 text-center text-2xl font-bold text-amber_SAE_ECE">{title}</h2>
	<div class="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
		{#each sponsors as sponsor (sponsor.id)}
			<div
				class="break-inside-avoid overflow-hidden rounded-lg shadow transition-all duration-300 hover:scale-105 hover:shadow-lg"
			>
				<img src={sponsor.image} alt={sponsor.name} class="h-auto w-full object-cover" />
				<div class="bg-white dark:bg-gray-800 p-4 text-blackie dark:text-gray-100 transition-colors duration-200">
					<p class="text-center font-semibold">{sponsor.name}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
