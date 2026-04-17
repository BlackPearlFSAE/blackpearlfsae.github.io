<script lang="ts">
	import QRCode from 'qrcode';
	import generatePayload from 'promptpay-qr';
	import { onMount } from 'svelte';

	let pageTitle = 'Merch Store';

	// Default product — shown while loading or if fetch fails
	type Product = {
		name: string;
		price: number;
		image: string;
		description: string;
		options: { name: string; choices: (string | number)[] }[];
	};

	let product: Product = {
		name: 'Black Pearl Racing T-Shirt',
		price: 599,
		image: '/merch/philosopher.jpeg',
		description: 'Premium cotton t-shirt featuring the Black Pearl Racing logo. Available in all sizes.',
		options: [
			{ name: 'Size', choices: ['S', 'M', 'L', 'XL'] },
			{ name: 'Color', choices: ['Black', 'White', 'Navy'] },
			{ name: 'Quantity', choices: [1, 2, 3, 4, 5] }
		]
	};

	let selectedOptions: Record<string, string | number> = {};

	function initOptions() {
		selectedOptions = {};
		product.options.forEach((option) => {
			selectedOptions[option.name] = option.choices[0];
		});
	}

	async function loadProduct() {
		try {
			const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Products`;
			const res = await fetch(url);
			const text = await res.text();
			const json = JSON.parse(text.match(/setResponse\(([\s\S]*)\);?\s*$/)![1]);
			const rows: any[] = json.table?.rows || [];
			const config: Record<string, string> = {};
			rows.forEach((row) => {
				const key = row.c[0]?.v;
				const value = row.c[1]?.v;
				if (key && value !== null && value !== undefined) config[key] = String(value);
			});
			if (config.name) product = {
				name: config.name,
				price: Number(config.price) || product.price,
				image: config.image || product.image,
				description: config.description || product.description,
				options: [
					{ name: 'Size', choices: config.sizes ? config.sizes.split(',').map(s => s.trim()) : ['S','M','L','XL'] },
					{ name: 'Color', choices: config.colors ? config.colors.split(',').map(s => s.trim()) : ['Black','White','Navy'] },
					{ name: 'Quantity', choices: config.quantities ? config.quantities.split(',').map(s => Number(s.trim())) : [1,2,3,4,5] }
				]
			};
		} catch {
			// keep defaults
		} finally {
			initOptions();
		}
	}

	onMount(loadProduct);

	// ============================================================
	// CLUB STAFF: Edit these two values and push to GitHub
	// ============================================================
	const PROMPTPAY_ID = '0917700039';       // phone or 13-digit national ID
	const PICKUP_LOCATION = 'Room 101, Engineering Building (Mon–Fri 10:00–17:00)';
	// ============================================================

	// Get from your Google Sheet URL: docs.google.com/spreadsheets/d/THIS_PART/edit
	const SHEET_ID = '1YxGlsysyGsMkIfi2E5XJ4mbOkLKnPCBp9nVEdL6cSRg';

	const APPS_SCRIPT_URL =
		'https://script.google.com/macros/s/AKfycbzqX6pGdvNqBr1HKmTqJaJ_3UoeF3ULjBZwmw0jMydVopvq6urXgAzFAt_UIUXQq8jFwQ/exec';

	let showModal = false;
	let isSubmitting = false;
	let submitStatus = ''; // 'success' | 'error' | ''

	// Customer info
	let customerName = '';
	let contactType: 'phone' | 'instagram' | 'line' = 'phone';
	let contactValue = '';

	// QR receipt
	let showReceipt = false;
	let qrDataUrl = '';
	let receiptOrder: Record<string, unknown> = {};

	// Slip upload
	let slipPreview = '';
	let slipBase64 = '';
	let slipUploading = false;
	let slipUploaded = false;

	function handleSlipSelect(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		console.log('File selected:', file?.name, file?.size);
		if (!file) return;
		if (file.size > 5 * 1024 * 1024) {
			alert('File too large. Please upload an image under 5MB.');
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			slipPreview = result;
			slipBase64 = result.split(',')[1]; // strip data URL prefix
			console.log('slipBase64 set, length:', slipBase64.length);
		};
		reader.readAsDataURL(file);
	}

	async function uploadSlip() {
		console.log('uploadSlip called, slipBase64 length:', slipBase64.length);
		if (!slipBase64) return;
		slipUploading = true;
		try {
			await fetch(APPS_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors',
				body: JSON.stringify({
					type: 'slip',
					orderId: receiptOrder.orderId,
					slip: slipBase64
				})
			});
			slipUploaded = true;
		} catch {
			alert('Upload failed. Please try again.');
		} finally {
			slipUploading = false;
		}
	}

	const contactPlaceholder: Record<string, string> = {
		phone: '08X-XXX-XXXX',
		instagram: '@username',
		line: 'LINE ID'
	};

	// Order status check
	let checkOrderId = '';
	let checkingStatus = false;
	type OrderStatus = { orderId: string; name: string; product: string; size: string; color: string; quantity: number; total: number; hasSlip: boolean; status: string };
	let orderStatus: OrderStatus | 'not_found' | null = null;

	async function checkStatus() {
		if (!checkOrderId.trim()) return;
		checkingStatus = true;
		orderStatus = null;
		try {
			const query = `SELECT A,B,C,D,E,F,G,H,I,J,K,L,M WHERE B = '${checkOrderId.trim()}'`;
			const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Orders&tq=${encodeURIComponent(query)}`;
			const res = await fetch(url);
			const text = await res.text();
			const json = JSON.parse(text.match(/setResponse\(([\s\S]*)\);?\s*$/)![1]);
			const rows = json.table?.rows;
			if (!rows || rows.length === 0) {
				orderStatus = 'not_found';
			} else {
				const c = rows[0].c;
				const val = (i: number) => c[i]?.v ?? '';
				orderStatus = {
					orderId: val(1), name: val(2), product: val(5),
					size: val(6), color: val(7),
					quantity: Number(val(8)), total: Number(val(9)),
					hasSlip: !!val(11), status: val(12) || 'Pending'
				};
			}
		} catch {
			orderStatus = 'not_found';
		} finally {
			checkingStatus = false;
		}
	}

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
			PICKUP_LOCATION
		};
		try {
			await fetch(APPS_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors',
				body: JSON.stringify(payload)
			});
			// Generate PromptPay QR with exact order total
			const promptpayPayload = generatePayload(PROMPTPAY_ID, { amount: payload.total as number });
			qrDataUrl = await QRCode.toDataURL(promptpayPayload, { width: 256, margin: 2 });
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

<section class="bg-baby_powder dark:bg-gray-900 px-6 pb-12 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="mx-auto max-w-4xl border-t border-gray-200 dark:border-gray-700 pt-8">
		<h2 class="mb-4 text-xl font-bold">Check Order Status</h2>
		<div class="flex gap-2">
			<input
				type="text"
				bind:value={checkOrderId}
				placeholder="Order ID (e.g. BPR-1234567890)"
				on:keydown={(e) => e.key === 'Enter' && checkStatus()}
				class="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-blackie dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-coqueilcot"
			/>
			<button
				on:click={checkStatus}
				disabled={checkingStatus}
				class="rounded bg-coqueilcot px-4 py-2 font-bold text-white transition duration-300 hover:bg-amber_SAE_ECE disabled:opacity-50"
			>
				{checkingStatus ? 'Checking…' : 'Check'}
			</button>
		</div>

		{#if orderStatus === 'not_found'}
			<p class="mt-3 text-sm text-red-500">Order not found. Please check your Order ID.</p>
		{:else if orderStatus}
			<div class="mt-4 rounded border border-gray-200 dark:border-gray-700 p-4 text-sm space-y-1">
				<p><strong>Order ID:</strong> {orderStatus.orderId}</p>
				<p><strong>Name:</strong> {orderStatus.name}</p>
				<p><strong>Product:</strong> {orderStatus.product} — {orderStatus.size} / {orderStatus.color} × {orderStatus.quantity}</p>
				<p><strong>Total:</strong> {orderStatus.total} THB</p>
				<p><strong>Payment Slip:</strong> {orderStatus.hasSlip ? 'Submitted ✓' : 'Not uploaded yet'}</p>
				<p class="flex items-center gap-2 pt-1">
					<strong>Status:</strong>
					<span class={`rounded-full px-3 py-0.5 text-xs font-semibold ${
						orderStatus.status === 'Verified'
							? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
							: orderStatus.status === 'Rejected'
							? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
							: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
					}`}>{orderStatus.status}</span>
				</p>
			</div>
		{/if}
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
				<p><strong>Pickup:</strong> {receiptOrder.PICKUP_LOCATION}</p>
			</div>

			<!-- Slip upload -->
			<div class="mt-4 border-t border-gray-200 dark:border-gray-600 pt-4">
				{#if slipUploaded}
					<p class="text-center text-sm font-semibold text-green-600 dark:text-green-400">
						Payment slip submitted! We'll verify and confirm your order.
					</p>
				{:else}
					<p class="mb-2 text-sm font-semibold">Upload your payment slip <span class="text-coqueilcot">*</span></p>
					<input
						type="file"
						accept="image/*"
						on:change={handleSlipSelect}
						class="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-3 file:rounded file:border-0 file:bg-coqueilcot file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white hover:file:bg-amber_SAE_ECE"
					/>
					{#if slipPreview}
						<img src={slipPreview} alt="Payment slip preview" class="mt-3 w-full rounded border border-gray-200 dark:border-gray-600 object-contain max-h-40" />
						<button
							on:click={uploadSlip}
							disabled={slipUploading}
							class="mt-3 w-full rounded bg-coqueilcot px-4 py-2 font-bold text-white transition duration-300 hover:bg-amber_SAE_ECE disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{slipUploading ? 'Uploading…' : 'Submit Payment Slip'}
						</button>
					{/if}
				{/if}
			</div>

			<button
				on:click={() => (showReceipt = false)}
				class="mt-4 w-full rounded bg-gray-200 dark:bg-gray-700 px-4 py-2 font-bold text-blackie dark:text-gray-100 transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
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
				<span class="ml-1">{PICKUP_LOCATION}</span>
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
