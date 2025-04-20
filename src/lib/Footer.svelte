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
</script>

<!-- src/lib/Footer.svelte -->
<footer class="border-t-4 border-t-coqueilcot bg-baby_powder py-8 text-blackie">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Branding -->
			<div>
				<div class="group relative mb-1 h-auto w-48">
					<!-- Default Image -->
					<img
						src="/BP_16_Logo_1.png"
						alt="Black Pearl Racing Team Logo"
						class="block h-auto w-full rounded-md transition-opacity duration-300 group-hover:opacity-0"
					/>
					<!-- Hover Image -->
					<img
						src="/favicon.png"
						alt="Black Pearl Racing Team Logo Hover"
						class="absolute left-0 top-0 h-auto w-full rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					/>
				</div>

				<p class="text-sm font-semibold">Black Pearl Racing Team</p>
				<p class="text-sm">Formula Student team of KMUTT.</p>
			</div>

			<!-- Navigation Links -->
			<nav aria-label="Footer Navigation">
				<h2 class="mb-4 text-sm font-semibold text-gray-600">Navigation</h2>
				<ul class="space-y-2 font-semibold">
					<li><a href="/" class="text-blue-700 hover:underline">Home</a></li>
					<li><a href="/about" class="text-blue-700 hover:underline">About</a></li>
					<li><a href="/team" class="text-blue-700 hover:underline">Team</a></li>
					<li><a href="/sponsor" class="text-blue-700 hover:underline">Sponsors</a></li>
					<li><a href="/merch" class="text-blue-700 hover:underline">Merch</a></li>
					<li><a href="/tools" class="text-blue-700 hover:underline">Tools</a></li>
					<li><a href="/archives" class="text-blue-700 hover:underline">Archives</a></li>
				</ul>
			</nav>

			<!-- Contact Information -->
			<div>
				<h2 class="mb-4 text-sm font-semibold text-gray-600">Contact</h2>
				<ul class="space-y-2 font-semibold">
					<li>
						<a
							href="https://github.com/BlackPearlFSAE"
							class="text-blue-700 hover:underline"
							target="_blank"
							rel="noopener noreferrer">GitHub</a
						>
					</li>
					<li>
						<a
							href="https://www.instagram.com/blackpearlracingteam/"
							class="text-blue-700 hover:underline"
							target="_blank"
							rel="noopener noreferrer">Instagram</a
						>
					</li>
					<li>
						<a href="mailto:blackpearl@kmutt.ac.th" class="text-blue-700 hover:underline"
							>blackpearl@kmutt.ac.th</a
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
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="mt-8 text-center text-sm text-gray-500">
			&copy; {new Date().getFullYear()} Black Pearl Racing Team @ KMUTT. All rights reserved.
		</div>
	</div>
</footer>
