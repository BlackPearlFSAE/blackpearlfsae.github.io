<!-- <footer class="border-t-4 border-t-coqueilcot bg-baby_powder py-4 text-blackie">
	<div class="container mx-auto mt-auto text-center">
		<p>&copy; {new Date().getFullYear()} Black Pearl Racing Team <br /> @ KMUTT</p>
		<p>
			<a href="/" class="text-blue-700 hover:underline">Home</a> |
			<a href="/about" class="text-blue-700 hover:underline">About</a> |
			<a href="https://github.com/BlackPearlFSAE" class="text-blue-700 hover:underline">GitHub</a> |
			<a
				href="https://www.instagram.com/blackpearlracingteam/"
				class="text-blue-700 hover:underline">Instagram</a
			>
		</p>
	</div>
</footer> -->

<script>
	import NewsletterForm from './NewsletterForm.svelte';
	import { darkMode } from '$lib/stores/darkMode';
	import { browser } from '$app/environment';
	
	// Get actual theme (dark or light)
	function getActualTheme() {
		if (!browser) return 'light';
		const preference = $darkMode;
		if (preference === 'system') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return preference;
	}
	
	$: isDark = getActualTheme() === 'dark';
</script>

<!-- src/lib/Footer.svelte -->
<footer class="border-t-4 border-t-coqueilcot bg-baby_powder dark:bg-gray-900 py-8 text-blackie dark:text-gray-100 transition-colors duration-200">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Branding -->
			<div>
				<div class="group relative mb-1 h-auto w-48">
					{#if isDark}
						<!-- Dark Mode: Favicon as default -->
						<img
							src="/favicon.png"
							alt="Black Pearl Racing Team Logo"
							class="block h-auto w-full rounded-md transition-opacity duration-300 group-hover:opacity-0"
						/>
						<!-- Dark Mode: BP_16_Logo_1 on hover with light background -->
						<div class="absolute left-0 top-0 h-full w-full rounded-md bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<img
								src="/BP_16_Logo_1.png"
								alt="Black Pearl Racing Team Logo Hover"
								class="h-auto w-full rounded-md"
							/>
						</div>
					{:else}
						<!-- Light Mode: BP_16_Logo_1 as default -->
						<img
							src="/BP_16_Logo_1.png"
							alt="Black Pearl Racing Team Logo"
							class="block h-auto w-full rounded-md transition-opacity duration-300 group-hover:opacity-0"
						/>
						<!-- Light Mode: Favicon on hover -->
						<img
							src="/favicon.png"
							alt="Black Pearl Racing Team Logo Hover"
							class="absolute left-0 top-0 h-auto w-full rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						/>
					{/if}
				</div>

				<p class="text-sm font-semibold">Black Pearl Racing Team</p>
				<p class="text-sm">Formula Student team of KMUTT.</p>
			</div>

			<!-- Navigation Links -->
			<nav aria-label="Footer Navigation">
				<h2 class="mb-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Navigation</h2>
				<ul class="space-y-2 font-semibold">
					<li><a href="/" class="text-blue-700 dark:text-blue-400 hover:underline">Home</a></li>
					<li><a href="/about" class="text-blue-700 dark:text-blue-400 hover:underline">About</a></li>
					<li><a href="/team" class="text-blue-700 dark:text-blue-400 hover:underline">Team</a></li>
					<li><a href="/sponsor" class="text-blue-700 dark:text-blue-400 hover:underline">Sponsors</a></li>
					<li><a href="/merch" class="text-blue-700 dark:text-blue-400 hover:underline">Merch</a></li>
					<li><a href="/tools" class="text-blue-700 dark:text-blue-400 hover:underline">Tools</a></li>
					<li><a href="/archives" class="text-blue-700 dark:text-blue-400 hover:underline">Archives</a></li>
				</ul>
			</nav>

			<!-- Contact Information -->
			<div>
				<h2 class="mb-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Contact</h2>
				<ul class="space-y-2 font-semibold">
					<li>
						<a
							href="https://github.com/BlackPearlFSAE"
							class="text-blue-700 dark:text-blue-400 hover:underline"
							target="_blank"
							rel="noopener noreferrer">GitHub</a
						>
					</li>
					<li>
						<a
							href="https://www.instagram.com/blackpearlracingteam/"
							class="text-blue-700 dark:text-blue-400 hover:underline"
							target="_blank"
							rel="noopener noreferrer">Instagram</a
						>
					</li>
					<li>
						<a href="mailto:fs.kmutt@gmail.com" class="text-blue-700 dark:text-blue-400 hover:underline"
							>fs.kmutt@gmail.com</a
						>
					</li>
					<li>
						<a href="mailto:formula.student@mail.kmutt.ac.th" class="text-blue-700 dark:text-blue-400 hover:underline"
							>formula.student@mail.kmutt.ac.th</a
						>
					</li>
					<li class="font-normal">
						<!-- <p class="text-sm">King Mongkut's University of Technology Thonburi (KMUTT)</p> -->
						<p class="text-sm">
							King Mongkut's University of Technology Thonburi (KMUTT)<br />
							126 Pracha Uthit Road, Bang Mod, Thung Khru, Bangkok 10140, Thailand
						</p>
						<p class="mt-2 text-sm">
							มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ.)<br />
							126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพมหานคร 10140
						</p>
					</li>
				</ul>
			</div>

			<!-- Newsletter Subscription -->
			<div>
				<!-- <h2 class="mb-4 text-sm font-semibold">Subscribe to our Newsletter</h2> -->
				<NewsletterForm />
				
				<!-- Dark Mode Toggle -->
				<div class="mt-4">
					<button
						on:click={() => darkMode.toggle()}
						class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
						aria-label="Toggle dark mode"
					>
						{#if $darkMode === 'dark'}
							<!-- Sun icon for switching to light mode -->
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
							<span>Switch to Light</span>
						{:else}
							<!-- Moon icon for switching to dark mode -->
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
							</svg>
							<span>Switch to Dark</span>
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
			&copy; {new Date().getFullYear()} Black Pearl Racing Team @ KMUTT. All rights reserved.
		</div>
	</div>
</footer>
