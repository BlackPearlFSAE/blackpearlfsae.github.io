<script>
	let pageTitle = 'Merch Store';
	const product = {
		name: 'Black Pearl Racing T-Shirt',
		price: 599,
		image: '/merch/philosopher.jpeg',
		description:
			'Premium cotton t-shirt featuring the Black Pearl Racing logo. Available in all sizes.',
		options: [
			{
				name: 'Size',
				choices: ['S', 'M', 'L', 'XL']
			},
			{
				name: 'Color',
				choices: ['Black', 'White', 'Navy']
			},
			{
				name: 'Quantity',
				choices: [1, 2, 3, 4, 5]
			}
		]
	};

	// Initialize selected options
	let selectedOptions = {};
	product.options.forEach((option) => {
		selectedOptions[option.name] = option.choices[0];
	});

	let showModal = false;
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<section class="bg-baby_powder px-6 py-12 text-blackie">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-center text-4xl font-bold">Merch Store (demo run only)</h1>

		<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
			<div>
				<img
					src={product.image}
					alt={product.name}
					class="w-full rounded-lg object-cover shadow-md"
				/>
			</div>
			<div>
				<h2 class="mb-2 text-2xl font-semibold">{product.name}</h2>
				<p class="mb-4 text-xl font-semibold text-coqueilcot"><span class="text-black">THB &nbsp;</span>{product.price}</p>
				<p class="mb-6 text-gray-700">{product.description}</p>
				{#each product.options as option}
					<div class="mb-4">
						<span class="mb-1 block font-semibold">{option.name}:</span>
						<div class="flex flex-wrap gap-2">
							{#each option.choices as choice}
								<button
									type="button"
									class={`rounded-full border px-4 py-2 transition-colors duration-300 ${
										selectedOptions[option.name] === choice
											? 'border-coqueilcot bg-coqueilcot text-white'
											: 'border-gray-300 bg-white text-blackie hover:border-coqueilcot hover:bg-coqueilcot hover:text-white'
									}`}
									on:click={() => (selectedOptions[option.name] = choice)}
								>
									{choice}
								</button>
							{/each}
						</div>
					</div>
				{/each}
				<button
					class="rounded px-6 py-2 font-bold text-coqueilcot transition duration-300 hover:bg-gray-200"
				>
					Add to Cart
				</button>
				<button
					on:click={() => (showModal = true)}
					class="rounded bg-coqueilcot px-6 py-2 font-bold text-white transition duration-300 hover:bg-amber_SAE_ECE"
				>
					Checkout
				</button>
			</div>
		</div>
	</div>
</section>

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-96 rounded bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-bold">Order Summary</h2>
			<p><strong>Product:</strong> {product.name}</p>
			{#each Object.entries(selectedOptions) as [key, value]}
				<p><strong>{key}:</strong> {value}</p>
			{/each}
			<p><strong>Total:</strong> {product.price * selectedOptions['Quantity']} THB</p>
			<div class="mt-4 flex justify-end">
				<button
					on:click={() => (showModal = false)}
					class="mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-black hover:bg-gray-400"
				>
					Cancel
				</button>
				<button
					on:click={() => {
						// Implement checkout logic here
						showModal = false;
					}}
					class="rounded bg-coqueilcot px-4 py-2 font-bold text-white hover:bg-amber_SAE_ECE"
				>
					Confirm
				</button>
			</div>
		</div>
	</div>
{/if}
