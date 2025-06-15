<!-- src/routes/about/+page.svelte -->
<script>
	// Optional: You can add logic here if needed
	// import { baseTitle } from '$layout';

	let pageTitle = 'Team';

	const departments = [
		{
			name: 'Advisory Professors (ADVISOR)',
			members: [
				{
					name: 'Asst. Prof. Dr. Danai Phaoharuhansa',
					role: 'Team Advisor',
					// year: 'D.Eng., Shibaura Institute of Technology, Japan, 2014',
					department: 'Control Laboratory, KMUTT',
					avatar: './teams/people/advisor/AjDanai.jpg'
				},
				{
					name: 'Assoc. Prof. Dr. Anak Khantachawana',
					role: 'Technical Advisor',
					// year: 'D.Eng., University of Tsukuba, Japan, 2003',
					department: 'SMART Laboratory, KMUTT',
					avatar: './teams/people/advisor/AjEarth.jpg'
				},
				{
					name: 'Assoc. Prof. Dr. Chawin Chantharasenawong',
					role: 'Technical Advisor',
					// year: 'Ph.D., Imperial College London, UK, 2007',
					department: 'International Affairs, KMUTT',
					avatar: './teams/people/advisor/AjChawin.jpg'
				}
			]
		},
		{
			name: 'Leadership (LEAD)',
			members: [
				{
					name: 'Namo',
					role: 'Captain',
					year: 'Year 3, Bachelor',
					department: 'Civil Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Tanny',
					role: 'Vice Captain',
					year: 'Year 3, Bachelor',
					department: 'Electronics and Network Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Ajarn Danai',
					role: 'Club Advisor',
					year: '',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				}
			]
		},
		{
			name: 'Mechanical (MECH)',
			subDepartments: [
				{
					name: 'Powertrain',
					members: [
						{
							name: 'Dawin',
							role: 'Specialist, Head of Dept.',
							year: 'Year 2, Mechanical Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Pan',
							role: 'Specialist',
							year: 'Year 2, Automotive Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'IK-Q',
							role: 'Specialist',
							year: 'Year 2, Mechanical Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Goody',
							role: 'Specialist',
							year: 'Year 2, Automotive Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						}
					]
				},
				{
					name: 'Body & Frame',
					members: [
						{
							name: 'Namo',
							role: 'Chassis (Steel Space Frame)',
							year: 'Year 3, Civil Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Skoog',
							role: 'Specialist',
							year: 'Year 1, Master Degree',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						}
					]
				},
				{
					name: 'Suspension',
					members: [
						{
							name: 'Folk',
							role: 'Head of Department',
							year: 'Year 4, Automotive Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Dutch',
							role: 'Specialist',
							year: 'Year 2, Mechanical Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Copter',
							role: 'Specialist',
							year: 'Year 2, Mechanical Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Print',
							role: 'Brake Specialist',
							year: 'Year 2, Mechanical Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						}
					]
				}
			]
		},
		{
			name: 'Electrical (ELEC)',
			members: [
				{
					name: 'Tanny',
					role: 'Head of Dept., High Voltage Specialist',
					year: 'Year 3, Electronics and Network Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Jackie',
					role: 'Low Voltage System Specialist',
					year: 'Year 3, Computer Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				}
			]
		},
		{
			name: 'Admin, Finance & Sponsor (BSAC)',
			members: [
				{
					name: 'Chamint',
					role: 'Finance Head',
					year: 'Year 3, Tools and Materials Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Nott',
					role: 'Finance Specialist',
					year: 'Year 2, Mechanical Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Jubjang',
					role: 'Sponsor Relations Specialist',
					year: 'Year 2, Tools and Materials Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				}
			]
		},
		{
			name: 'Systems Development Group (SYS)',
			members: [
				{
					name: 'Yoo-il',
					role: 'Head of Dept., Control Systems Specialist',
					year: 'Year 4, Computer Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Toen',
					role: 'Specialist, core electronics',
					year: 'Year 3, Electronics and Network Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Angy',
					role: 'Specialist, Design Thinking',
					year: 'Year 2, Electronics and Network Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				}
			]
		}
	];

	// Define department options
	const departmentOptions = [
		'All',
		'Leadership (LEAD)',
		'Mechanical (MECH)',
		'Electrical (ELEC)',
		'Admin, Finance & Sponsor (BSAC)',
		'Systems Development Group (SYS)'
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
											<br />
											<p class="text-sm">{member.role}</p>
											{#if member.year}
												<p class="text-sm font-semibold">
													{member.year}
													<!-- CPE #65 -->
												</p>
											{/if}
											{#if member.department}
												<p class="text-sm font-bold">
													{member.department}
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
									<!-- <br /> -->
									{#if member.year}
										<p class="text-sm font-semibold">
											{member.year}
											<!-- CPE #65 -->
										</p>
									{/if}
									<br />
									{#if member.department}
										<p class="text-sm font-bold">
											{member.department}
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
