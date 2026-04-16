<script lang="ts">
	// ============================================================
	// CLUB STAFF: Set these values
	// ============================================================
	const SHEET_ID = '1YxGlsysyGsMkIfi2E5XJ4mbOkLKnPCBp9nVEdL6cSRg';
	const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqX6pGdvNqBr1HKmTqJaJ_3UoeF3ULjBZwmw0jMydVopvq6urXgAzFAt_UIUXQq8jFwQ/exec';
	const ADMIN_PASSWORD = 'bpr2025'; // Change this — also update in Apps Script
	// ============================================================

	type Order = {
		timestamp: string;
		orderId: string;
		name: string;
		contactType: string;
		contact: string;
		product: string;
		size: string;
		color: string;
		quantity: number;
		total: number;
		slip: string;
		status: string;
	};

	let password = '';
	let isLoggedIn = false;
	let wrongPassword = false;
	let orders: Order[] = [];
	let loading = false;
	let fetchError = false;
	let filter = 'All';
	let updatingId = '';

	async function login() {
		if (password === ADMIN_PASSWORD) {
			isLoggedIn = true;
			wrongPassword = false;
			await fetchOrders();
		} else {
			wrongPassword = true;
		}
	}

	async function fetchOrders() {
		loading = true;
		fetchError = false;
		try {
			const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Orders`;
			const res = await fetch(url);
			const text = await res.text();
			const json = JSON.parse(text.match(/setResponse\(([\s\S]*)\);?\s*$/)![1]);
			const rows: any[] = json.table?.rows || [];
			orders = rows.map((row) => {
				const c = row.c;
				const val = (i: number) => c[i]?.v ?? '';
				return {
					timestamp: val(0),
					orderId: val(1),
					name: val(2),
					contactType: val(3),
					contact: val(4),
					product: val(5),
					size: val(6),
					color: val(7),
					quantity: Number(val(8)),
					total: Number(val(9)),
					slip: val(11),
					status: val(12) || 'Pending'
				};
			});
		} catch {
			fetchError = true;
		} finally {
			loading = false;
		}
	}

	async function updateStatus(orderId: string, newStatus: string) {
		updatingId = orderId;
		await fetch(APPS_SCRIPT_URL, {
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify({ type: 'verify', orderId, newStatus, password: ADMIN_PASSWORD })
		});
		// Optimistic update
		orders = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
		updatingId = '';
	}

	$: filteredOrders = filter === 'All' ? orders : orders.filter((o) => o.status === filter);
	$: counts = {
		All: orders.length,
		Pending: orders.filter((o) => o.status === 'Pending').length,
		Verified: orders.filter((o) => o.status === 'Verified').length,
		Rejected: orders.filter((o) => o.status === 'Rejected').length
	};
</script>

<svelte:head>
	<title>Admin – Orders</title>
</svelte:head>

{#if !isLoggedIn}
	<div class="min-h-screen flex items-center justify-center bg-baby_powder dark:bg-gray-900 px-4">
		<div class="w-80 rounded bg-white dark:bg-gray-800 p-6 shadow-lg text-blackie dark:text-gray-100">
			<h1 class="mb-1 text-xl font-bold">Staff Login</h1>
			<p class="mb-4 text-sm text-gray-500 dark:text-gray-400">Black Pearl Racing – Order Admin</p>
			<input
				type="password"
				bind:value={password}
				placeholder="Password"
				on:keydown={(e) => e.key === 'Enter' && login()}
				class="mb-3 w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coqueilcot"
			/>
			{#if wrongPassword}
				<p class="mb-2 text-sm text-red-500">Incorrect password.</p>
			{/if}
			<button
				on:click={login}
				class="w-full rounded bg-coqueilcot px-4 py-2 font-bold text-white transition duration-300 hover:bg-amber_SAE_ECE"
			>
				Login
			</button>
		</div>
	</div>

{:else}
	<div class="min-h-screen bg-baby_powder dark:bg-gray-900 px-6 py-10 text-blackie dark:text-gray-100 transition-colors duration-200">
		<div class="mx-auto max-w-7xl">

			<div class="mb-6 flex items-center justify-between">
				<h1 class="text-2xl font-bold">Orders</h1>
				<button
					on:click={fetchOrders}
					class="rounded border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					Refresh
				</button>
			</div>

			<!-- Filter tabs -->
			<div class="mb-4 flex flex-wrap gap-2">
				{#each ['All', 'Pending', 'Verified', 'Rejected'] as tab}
					<button
						on:click={() => (filter = tab)}
						class={`rounded-full px-4 py-1 text-sm font-semibold transition-colors ${
							filter === tab
								? 'bg-coqueilcot text-white'
								: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
						}`}
					>
						{tab} ({counts[tab as keyof typeof counts]})
					</button>
				{/each}
			</div>

			{#if loading}
				<p class="py-10 text-center text-gray-500">Loading orders…</p>
			{:else if fetchError}
				<div class="rounded border border-red-300 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
					Could not load orders. Make sure the Google Sheet is set to <strong>"Anyone with the link can view"</strong>.
				</div>
			{:else if filteredOrders.length === 0}
				<p class="py-10 text-center text-gray-500">No orders found.</p>
			{:else}
				<div class="overflow-x-auto rounded border border-gray-200 dark:border-gray-700">
					<table class="w-full text-sm">
						<thead class="bg-gray-50 dark:bg-gray-800">
							<tr>
								{#each ['Date', 'Order ID', 'Name', 'Contact', 'Items', 'Total', 'Slip', 'Status'] as h}
									<th class="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
							{#each filteredOrders as order (order.orderId)}
								<tr class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
									<td class="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
										{new Date(order.timestamp).toLocaleDateString('th-TH')}
									</td>
									<td class="px-4 py-3 font-mono text-xs">{order.orderId}</td>
									<td class="px-4 py-3 font-medium">{order.name}</td>
									<td class="px-4 py-3 text-xs">
										<span class="capitalize">{order.contactType}</span>: {order.contact}
									</td>
									<td class="px-4 py-3 text-xs">
										{order.product}<br />
										<span class="text-gray-500">{order.size} / {order.color} × {order.quantity}</span>
									</td>
									<td class="px-4 py-3 whitespace-nowrap font-medium">{order.total} ฿</td>
									<td class="px-4 py-3">
										{#if order.slip}
											<a
												href={order.slip}
												target="_blank"
												class="text-coqueilcot hover:underline text-xs"
											>View slip</a>
										{:else}
											<span class="text-xs text-gray-400">No slip</span>
										{/if}
									</td>
									<td class="px-4 py-3">
										<select
											value={order.status}
											disabled={updatingId === order.orderId}
											on:change={(e) => updateStatus(order.orderId, (e.target as HTMLSelectElement).value)}
											class={`rounded border pl-2 pr-6 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-coqueilcot disabled:opacity-50 ${
												order.status === 'Verified'
													? 'border-green-300 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
													: order.status === 'Rejected'
													? 'border-red-300 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
													: 'border-yellow-300 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
											}`}
										>
											<option class="pr-20" value="Pending">Pending</option>
											<option class="pr-20" value="Verified">Verified</option>
											<option class="pr-20" value="Rejected">Rejected</option>
										</select>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>
{/if}
