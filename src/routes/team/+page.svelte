<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'Team';

	const departments = [
		{
			name: 'Leadership',
			members: [
				{ name: 'John Doe', role: 'Captain', year: '2025', avatar: '/team/john_doe.jpg' },
				{ name: 'Jane Smith', role: 'Vice Captain', year: '2025', avatar: '/team/jane_smith.jpg' },
				{
					name: 'Dr. Alan Turing',
					role: 'Faculty Advisor',
					year: '',
					avatar: '/team/alan_turing.jpg'
				}
			]
		},
		{
			name: 'Mechanical',
			subDepartments: [
				{
					name: 'Powertrain',
					members: [
						{
							name: 'Alice Johnson',
							role: 'Engine Lead',
							year: '2024',
							avatar: '/team/alice_johnson.jpg'
						},
						{
							name: 'Bob Lee',
							role: 'Transmission Specialist',
							year: '2025',
							avatar: '/team/bob_lee.jpg'
						}
					]
				},
				{
					name: 'Body & Frame',
					members: [
						{
							name: 'Charlie Kim',
							role: 'Chassis Engineer',
							year: '2024',
							avatar: '/team/charlie_kim.jpg'
						}
					]
				},
				{
					name: 'Suspension',
					members: [
						{
							name: 'Diana Ross',
							role: 'Suspension Analyst',
							year: '2025',
							avatar: '/team/diana_ross.jpg'
						}
					]
				}
			]
		},
		{
			name: 'Electrical',
			members: [
				{ name: 'Ethan Hunt', role: 'Wiring Lead', year: '2024', avatar: '/team/ethan_hunt.jpg' },
				{
					name: 'Fiona Gallagher',
					role: 'Battery Systems',
					year: '2025',
					avatar: '/team/fiona_gallagher.jpg'
				}
			]
		},
		{
			name: 'Admin, Finance & Sponsor',
			members: [
				{
					name: 'George Michael',
					role: 'Finance Head',
					year: '2024',
					avatar: '/team/george_michael.jpg'
				},
				{
					name: 'Hannah Baker',
					role: 'Sponsorship Coordinator',
					year: '2025',
					avatar: '/team/hannah_baker.jpg'
				}
			]
		},
		{
			name: 'Business Development Group',
			members: [
				{ name: 'Ian Curtis', role: 'Presenter', year: '2024', avatar: '/team/ian_curtis.jpg' },
				{
					name: 'Julia Roberts',
					role: 'Content Developer',
					year: '2025',
					avatar: '/team/julia_roberts.jpg'
				},
				{
					name: 'Kevin Spacey',
					role: 'Visual Designer',
					year: '2025',
					avatar: '/team/kevin_spacey.jpg'
				}
			]
		}
	];

	// Define department options
	const departmentOptions = [
		'All',
		'Leadership',
		'Mechanical',
		'Electrical',
		'Admin, Finance & Sponsor',
		'Business Development Group'
	];

	// Variable to hold the selected department
	let selectedDepartment = 'All';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<section class="bg-baby_powder px-6 py-12 text-blackie">
	<div class="mx-auto max-w-7xl">
		<div class="bg-baby_powder p-2 text-blackie">
			<h1 class="text-center text-4xl font-bold">Our Team Strength - 2025/2026</h1>
			<!-- <p class="font-sans">In a winter vacation.</p> -->
		</div>

		<!-- Department Sections -->

		<!-- Department Selector -->
		<div class="mb-6 flex flex-wrap justify-center gap-2">
			{#each departmentOptions as dept}
				<button
					on:click={() => (selectedDepartment = dept)}
					class={`rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
						selectedDepartment === dept
							? 'border-coqueilcot bg-coqueilcot text-white'
							: 'border-gray-300 bg-white text-blackie hover:border-coqueilcot hover:bg-coqueilcot hover:text-white'
					}`}
				>
					{dept}
				</button>
			{/each}
		</div>
		{#each departments as department}
			{#if selectedDepartment === 'All' || department.name === selectedDepartment}
				<div class="mb-12">
					<h2 class="mb-6 text-center text-2xl font-bold text-amber_SAE_ECE">{department.name}</h2>

					{#if department.subDepartments}
						{#each department.subDepartments as subDept}
							<div class="mb-6">
								<h3 class="mb-4 text-xl font-semibold text-coqueilcot">{subDept.name}</h3>
								<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
									{#each subDept.members as member}
										<div
											class="flex flex-col items-center rounded-lg bg-white p-4 text-center text-blackie shadow-md transition duration-300 hover:bg-coqueilcot hover:text-white hover:shadow-lg hover:shadow-coqueilcot"
										>
											<img
												src={member.avatar}
												alt={member.name}
												class="h-[200px] w-[200px] rounded-lg border-2 border-amber_SAE_ECE object-cover transition duration-300 hover:scale-105 hover:shadow-lg"
											/>
											<h3 class="mt-4 text-lg font-semibold">{member.name}</h3>
											<p class="text-sm">{member.role}</p>
											{#if member.year}
												<p class="text-sm font-semibold">
													Class of {member.year}
													<!-- CPE #65 -->
												</p>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/each}
					{:else}
						<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
							{#each department.members as member}
								<div
									class="flex flex-col items-center rounded-lg bg-white p-4 text-center text-blackie shadow-md transition duration-300 hover:bg-coqueilcot hover:text-white hover:shadow-lg hover:shadow-coqueilcot"
								>
									<img
										src={member.avatar}
										alt={member.name}
										class="h-[200px] w-[200px] rounded-lg border-2 border-amber_SAE_ECE object-cover transition duration-300 hover:scale-105 hover:shadow-lg"
									/>
									<h3 class="mt-4 text-lg font-semibold">{member.name}</h3>
									<p class="text-sm">{member.role}</p>
									{#if member.year}
										<p class="text-sm font-semibold">
											Class of {member.year}
											<!-- CPE #65 -->
										</p>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</section>

<p class="p-2 font-extrabold italic text-gray-600">HR section is coming soon...</p>
