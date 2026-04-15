<script lang="ts">
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
	let selectedOptions: Record<string, string | number> = {};
	product.options.forEach((option) => {
		selectedOptions[option.name] = option.choices[0];
	});

	let showModal = false;
	let isSubmitting = false;
	let submitStatus = ''; // 'success' | 'error' | ''

	// Replace with your deployed Apps Script Web App URL
	const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw0757zkQVz_COC8bETu35q40Y290dhVOrJgB5S2L2unJtyV7cbMqAoRT1wnja8UPG8WA/exec';

	async function submitOrder() {
		isSubmitting = true;
		submitStatus = '';
		const payload = {
			timestamp: new Date().toISOString(),
			product: product.name,
			size: selectedOptions['Size'],
			color: selectedOptions['Color'],
			quantity: selectedOptions['Quantity'],
			total: product.price * Number(selectedOptions['Quantity'])
		};
		try {
			await fetch(APPS_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors', // Apps Script doesn't return CORS headers
				body: JSON.stringify(payload)
			});
			submitStatus = 'success';
		} catch (e) {
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
			showModal = false;
		}
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<section class="bg-baby_powder dark:bg-gray-900 px-6 py-12 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-center text-4xl font-bold">Merch Store (demo run only)</h1>

		<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
			<div>
				<img
					src={product.image}
					alt={product.name}
					class="w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-105"
				/>
			</div>
			<div>
				<h2 class="mb-2 text-2xl font-semibold">{product.name}</h2>
				<p class="mb-4 text-xl font-semibold text-coqueilcot dark:text-amber_SAE_ECE"><span class="text-black dark:text-gray-100">THB &nbsp;</span>{product.price}</p>
				<p class="mb-6 text-gray-700 dark:text-gray-300">{product.description}</p>
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
											: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-blackie dark:text-gray-100 hover:border-coqueilcot hover:bg-coqueilcot hover:text-white'
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
					class="rounded px-6 py-2 font-bold text-coqueilcot dark:text-amber_SAE_ECE transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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

{#if submitStatus === 'success'}
	<div class="fixed bottom-6 left-1/2 -translate-x-1/2 rounded bg-green-600 px-6 py-3 text-white shadow-lg">
		Order placed! We'll be in touch.
	</div>
{:else if submitStatus === 'error'}
	<div class="fixed bottom-6 left-1/2 -translate-x-1/2 rounded bg-red-600 px-6 py-3 text-white shadow-lg">
		Something went wrong. Please try again.
	</div>
{/if}

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-96 rounded bg-white dark:bg-gray-800 p-6 shadow-lg text-blackie dark:text-gray-100 transition-colors duration-200">
			<h2 class="mb-4 text-xl font-bold">Order Summary</h2>
			<p><strong>Product:</strong> {product.name}</p>
			{#each Object.entries(selectedOptions) as [key, value]}
				<p><strong>{key}:</strong> {value}</p>
			{/each}
			<p><strong>Total:</strong> {product.price * Number(selectedOptions['Quantity'])} THB</p>
			<div class="mt-4 flex justify-end">
				<button
					on:click={() => (showModal = false)}
					disabled={isSubmitting}
					class="mr-2 rounded bg-gray-300 dark:bg-gray-600 px-4 py-2 font-bold text-black dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
				>
					Cancel
				</button>
				<button
					on:click={submitOrder}
					disabled={isSubmitting}
					class="rounded bg-coqueilcot px-4 py-2 font-bold text-white transition duration-300 hover:bg-amber_SAE_ECE disabled:opacity-50"
				>
					{isSubmitting ? 'Submitting…' : 'Confirm'}
				</button>
			</div>
		</div>
	</div>
{/if}
