<!-- src/lib/NewsletterForm.svelte -->
<script>
	let email = '';
	let isValid = false;
	let isSubmitted = false;
	let errorMessage = '';

	// Regular expression for basic email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Reactive statement to validate email in real-time
	$: isValid = emailRegex.test(email);

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		if (isValid) {
			// TODO: Integrate with your newsletter service API
			isSubmitted = true;
			errorMessage = '';
			email = '';
		} else {
			errorMessage = 'Please enter a valid email address.';
			isSubmitted = false;
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="mx-auto max-w-md">
	<label for="email" class="mb-1 block text-sm font-medium text-gray-700"
		>Subscribe to our newsletter</label
	>
	<div class="flex">
		<input
			id="email"
			type="email"
			bind:value={email}
			class="flex-1 rounded-l-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			placeholder="Enter your email"
			required
			aria-invalid={!isValid}
			aria-describedby="email-error"
		/>
		<button
			type="submit"
			class="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Subscribe
		</button>
	</div>
	{#if errorMessage}
		<p id="email-error" class="animate-fade-in mt-2 text-sm text-red-600">{errorMessage}</p>
	{/if}
	{#if isSubmitted}
		<p class="animate-fade-in mt-2 text-sm text-green-600">Thank you for subscribing!</p>
	{/if}
</form>

<style>
	/* Tailwind CSS doesn't include keyframes by default; define custom animations if needed */
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in {
		animation: fade-in 0.5s ease-in-out;
	}
</style>
