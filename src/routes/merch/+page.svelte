<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	let pageTitle = 'Merch Store';
	const product = {
		name: 'Black Pearl Racing T-Shirt',
		price: 599,
		image: '/merch/philosopher.jpeg',
		description:
			'Premium cotton t-shirt featuring the Black Pearl Racing logo. Available in all sizes.',
		options: [
			{ name: 'Size', choices: ['S', 'M', 'L', 'XL'] },
			{ name: 'Color', choices: ['Black', 'White', 'Navy'] },
			{ name: 'Quantity', choices: [1, 2, 3, 4, 5] }
		]
	};

	let selectedOptions: Record<string, string | number> = {};
	product.options.forEach((option) => {
		selectedOptions[option.name] = option.choices[0];
	});

	let showModal = false;
	let isSubmitting = false;
	let submitStatus = ''; // 'success' | 'error' | ''

	// Customer info
	let customerName = '';
	let contactType: 'phone' | 'instagram' | 'line' = 'phone';
	let contactValue = '';
	let pickupLocation = 'Loading...';

	// QR receipt
	let showReceipt = false;
	let qrDataUrl = '';
	let receiptOrder: Record<string, unknown> = {};

	const APPS_SCRIPT_URL =
		'https://script.google.com/macros/s/AKfycbw0757zkQVz_COC8bETu35q40Y290dhVOrJgB5S2L2unJtyV7cbMqAoRT1wnja8UPG8WA/exec';

	onMount(async () => {
		try {
			const res = await fetch(APPS_SCRIPT_URL);
			const data = await res.json();
			pickupLocation = data.pickupLocation || 'TBA';
		} catch {
			pickupLocation = 'TBA – check our social media for updates';
		}
	});

	const contactPlaceholder: Record<string, string> = {
		phone: '08X-XXX-XXXX',
		instagram: '@username',
		line: 'LINE ID'
	};

	$: canSubmit = customerName.trim() !== '' && contactValue.trim() !== '';

	async function submitOrder() {
		if (!canSubmit) return;
		isSubmitting = true;
		submitStatus = '';
		const orderId = `BPR-${Date.now()}`;
		const payload = {
			orderId,
			timestamp: new Date().toISOString(),
			name: customerName.trim(),
			contactType,
			contact: contactValue.trim(),
			product: product.name,
			size: selectedOptions['Size'],
			color: selectedOptions['Color'],
			quantity: selectedOptions['Quantity'],
			total: product.price * Number(selectedOptions['Quantity']),
			pickupLocation
		};
		try {
			await fetch(APPS_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors',
				body: JSON.stringify(payload)
			});
			// Generate QR code from order summary text
			const qrText = [
				`Order ID: ${orderId}`,
				`Name: ${payload.name}`,
				`Product: ${payload.product}`,
				`Size: ${payload.size}  Color: ${payload.color}  Qty: ${payload.quantity}`,
				`Total: ${payload.total} THB`,
				`Pickup: ${payload.pickupLocation}`
			].join('\n');
			qrDataUrl = await QRCode.toDataURL(qrText, { width: 256, margin: 2 });
			receiptOrder = payload;
			showReceipt = true;
			customerName = '';
			contactValue = '';
		} catch {
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
				<p class="mb-4 text-xl font-semibold text-coqueilcot dark:text-amber_SAE_ECE">
					<span class="text-black dark:text-gray-100">THB &nbsp;</span>{product.price}
				</p>
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

{#if submitStatus === 'error'}
	<div class="fixed bottom-6 left-1/2 -translate-x-1/2 rounded bg-red-600 px-6 py-3 text-white shadow-lg">
		Something went wrong. Please try again.
	</div>
{/if}

{#if showReceipt}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-96 rounded bg-white dark:bg-gray-800 p-6 shadow-lg text-blackie dark:text-gray-100 transition-colors duration-200">
			<h2 class="mb-1 text-xl font-bold text-green-600 dark:text-green-400">Order Confirmed!</h2>
			<p class="mb-4 text-sm text-gray-500 dark:text-gray-400">Screenshot this receipt as proof of your order.</p>

			<div class="flex justify-center mb-4">
				<img src={qrDataUrl} alt="Order QR Code" class="rounded" />
			</div>

			<div class="text-sm space-y-1 border-t border-gray-200 dark:border-gray-600 pt-3">
				<p><strong>Order ID:</strong> {receiptOrder.orderId}</p>
				<p><strong>Name:</strong> {receiptOrder.name}</p>
				<p><strong>Product:</strong> {receiptOrder.product}</p>
				<p><strong>Size:</strong> {receiptOrder.size} &nbsp; <strong>Color:</strong> {receiptOrder.color} &nbsp; <strong>Qty:</strong> {receiptOrder.quantity}</p>
				<p><strong>Total:</strong> {receiptOrder.total} THB</p>
				<p><strong>Pickup:</strong> {receiptOrder.pickupLocation}</p>
			</div>

			<button
				on:click={() => (showReceipt = false)}
				class="mt-4 w-full rounded bg-coqueilcot px-4 py-2 font-bold text-white transition duration-300 hover:bg-amber_SAE_ECE"
			>
				Close
			</button>
		</div>
	</div>
{/if}

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-96 rounded bg-white dark:bg-gray-800 p-6 shadow-lg text-blackie dark:text-gray-100 transition-colors duration-200">
			<h2 class="mb-4 text-xl font-bold">Checkout</h2>

			<!-- Customer info -->
			<div class="mb-4">
				<label class="mb-1 block font-semibold" for="customerName">Full Name <span class="text-coqueilcot">*</span></label>
				<input
					id="customerName"
					type="text"
					bind:value={customerName}
					placeholder="Your name"
					class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-blackie dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-coqueilcot"
				/>
			</div>

			<div class="mb-4">
				<span class="mb-1 block font-semibold">Contact <span class="text-coqueilcot">*</span></span>
				<div class="mb-2 flex gap-2">
					{#each (['phone', 'instagram', 'line'] as const) as type}
						<button
							type="button"
							on:click={() => { contactType = type; contactValue = ''; }}
							class={`rounded-full border px-3 py-1 text-sm transition-colors duration-200 ${
								contactType === type
									? 'border-coqueilcot bg-coqueilcot text-white'
									: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-coqueilcot'
							}`}
						>
							{type === 'phone' ? 'Phone' : type === 'instagram' ? 'Instagram' : 'LINE'}
						</button>
					{/each}
				</div>
				<input
					type="text"
					bind:value={contactValue}
					placeholder={contactPlaceholder[contactType]}
					class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-blackie dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-coqueilcot"
				/>
			</div>

			<!-- Pickup location -->
			<div class="mb-4 rounded bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm">
				<span class="font-semibold">Pickup location:</span>
				<span class="ml-1">{pickupLocation}</span>
			</div>

			<!-- Order summary -->
			<div class="mb-4 border-t border-gray-200 dark:border-gray-600 pt-4 text-sm">
				<p><strong>Product:</strong> {product.name}</p>
				{#each Object.entries(selectedOptions) as [key, value]}
					<p><strong>{key}:</strong> {value}</p>
				{/each}
				<p class="mt-1 font-semibold"><strong>Total:</strong> {product.price * Number(selectedOptions['Quantity'])} THB</p>
			</div>

			<div class="flex justify-end gap-2">
				<button
					on:click={() => (showModal = false)}
					disabled={isSubmitting}
					class="rounded bg-gray-300 dark:bg-gray-600 px-4 py-2 font-bold text-black dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
				>
					Cancel
				</button>
				<button
					on:click={submitOrder}
					disabled={isSubmitting || !canSubmit}
					class="rounded bg-coqueilcot px-4 py-2 font-bold text-white transition duration-300 hover:bg-amber_SAE_ECE disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? 'Submitting…' : 'Confirm Order'}
				</button>
			</div>
		</div>
	</div>
{/if}
