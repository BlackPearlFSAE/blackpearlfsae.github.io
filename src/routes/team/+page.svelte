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
					avatar: './teams/people/66CVE_Namo.jpg'
				},
				{
					name: 'Tanny',
					role: 'Vice Captain',
					year: 'Year 3, Bachelor',
					department: 'Electronics and Network Engineering',
					avatar: './teams/people/66ENE_Tannie.jpg'
				},
				{
					name: 'Ajarn Danai',
					role: 'Club Advisor',
					year: '',
					avatar:
						'./teams/people/advisor/AjDanai.jpg'
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
							avatar: './teams/people/67ME_Dave.jpg'
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
							avatar: './teams/people/67ME_Goody.jpg'
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
							avatar: './teams/people/66CVE_Namo.jpg'
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
							avatar: './teams/people/65ME_Volk.jpg'
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
							avatar: './teams/people/66ME_Prin.jpg'
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
					role: 'Head of Electrical Department',
					year: 'Year 3, Electronics and Network Engineering',
					avatar: './teams/people/66ENE_Tannie.jpg'
				}
			],
			subDepartments: [
				{
					name: 'HV System',
					members: [
						{
							name: 'Petch',
							role: 'Technician',
							year: 'Year 2, Electronics and Network Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						}
					]
				},
				{
					name: 'LV System',
					members: [
						{
							name: 'Jackie',
							role: 'Head of LV Systems',
							year: 'Year 3, Computer Engineering',
							avatar: './teams/people/66CPE_Jackie.png'
						},
						{
							name: 'Mark',
							role: 'Technician',
							year: 'Year 1, Electrical Engineering',
							avatar: './teams/people/68EE_Mark.jpg'
						}
					]
				}
			]
		},
		{
			name: 'Admin, Finance & Sponsor (BSAC)',
			members: [
				{
					name: 'Chamint',
					role: 'Head of BSAC',
					year: 'Year 3, Modern Automotive and Aerospace Parts Engineering',
					avatar: './teams/people/66TME_Chamint.jpg'
				}
			],
			subDepartments: [
				{
					name: 'Finance',
					members: [
						{
							name: 'Nott',
							role: 'Finance Specialist',
							year: 'Year 2, Mechanical Engineering',
							avatar: './teams/people/67ME_Nott.png'
						}
					]
				},
				{
					name: 'Sponsors',
					members: [
						{
							name: 'Jubjang',
							role: 'Sponsor Relations Specialist',
							year: 'Year 2, Smart Manufacture and Advanced Tools Engineering',
							avatar: './teams/people/67TME_jubjang.jpg'
						},
						{
							name: 'Khaimook',
							role: 'Sponsor Relations',
							year: 'Year 1, Civil Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Aoy',
							role: 'Sponsor Relations',
							year: 'Year 2, Production Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						},
						{
							name: 'Aunda',
							role: 'Sponsor Relations',
							year: 'Year 1, Modern Automotive and Aerospace Parts Engineering',
							avatar:
								'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
						}
					]
				}
			]
		},
		{
			name: 'Systems Innovation Group (SYS)',
			members: [
				{
					name: 'Yoo-il',
					role: 'Head of Dept., Systems Integration Specialist',
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
					avatar: './teams/people/67ENE_Angy.jpg'
				},
				{
					name: 'Ken',
					role: 'IT Specialist',
					year: 'Year 1, Computer Science',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Wine',
					role: 'Researcher for ADAS systems',
					year: 'Master Year 1, Automotive Systems Engineering',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				}
			]
		},
		{
			name: 'Drivers',
			members: [
				{
					name: 'Dawin',
					role: 'Driver',
					year: 'Year 2, Mechanical Engineering',
					avatar: './teams/people/67ME_Dave.jpg'
				},
				{
					name: 'Namo',
					role: 'Driver',
					year: 'Year 3, Civil Engineering',
					avatar: './teams/people/66CVE_Namo.jpg'
				},
				{
					name: 'Jackie',
					role: 'Driver',
					year: 'Year 3, Computer Engineering',
					avatar: './teams/people/66CPE_Jackie.png'
				},
				{
					name: 'Skoog',
					role: 'Driver',
					year: 'Year 1, Master Degree',
					avatar:
						'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'
				},
				{
					name: 'Copter',
					role: 'Driver',
					year: 'Year 2, Automotive Engineering',
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
		'Systems Innovation Group (SYS)',
		'Drivers'
	];

	// Variable to hold the selected department
	let selectedDepartment = 'All';

	// WBS numbering helper function
	function getWBSNumber(deptIndex, subDeptIndex = null) {
		const deptNum = deptIndex + 1;
		if (subDeptIndex !== null && subDeptIndex !== undefined) {
			return `${deptNum}.${subDeptIndex + 1}`;
		}
		return `${deptNum}`;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<section class="bg-baby_powder px-6 py-12 text-blackie">
	<div class="mx-auto max-w-7xl">
		<div class="bg-baby_powder p-2 text-blackie">
			<h1 class="text-center text-4xl font-bold">Our Team Structure - 2025/2026</h1>
			<!-- <p class="font-sans">In a winter vacation.</p> -->
		</div>

		<!-- WBS Overview -->
		<div class="mb-8 rounded-lg border-2 border-amber_SAE_ECE bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-bold text-blackie">Work Breakdown Structure (WBS)</h2>
			<div class="space-y-2 text-sm">
				<p class="font-semibold text-gray-700">
					<span class="mr-2 inline-flex items-center justify-center rounded-md bg-amber_SAE_ECE px-2 py-1 text-xs font-bold text-white">1</span>
					Main Departments (Level 1)
				</p>
				<p class="ml-6 font-semibold text-gray-600">
					<span class="mr-2 inline-flex items-center justify-center rounded-md bg-coqueilcot px-2 py-1 text-xs font-bold text-white">1.1</span>
					Sub-Departments (Level 2)
				</p>
				<p class="mt-3 text-xs text-gray-500">
					The numbered badges indicate the hierarchical structure of our organization.
				</p>
			</div>
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
		{#each departments as department, deptIndex}
			{#if selectedDepartment === 'All' || department.name === selectedDepartment}
				<div class="mb-12">
					<h2 class="mb-6 text-center text-2xl font-bold text-amber_SAE_ECE">
						<span class="mr-3 inline-flex items-center justify-center rounded-md bg-amber_SAE_ECE px-3 py-1 text-lg font-bold text-white">
							{getWBSNumber(deptIndex)}
						</span>
						{department.name}
					</h2>

					{#if department.subDepartments}
						<!-- Show department-level members if they exist (only when there are sub-departments) -->
						{#if department.members && department.members.length > 0}
							<div class="mb-6">
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
											<br />
											<p class="text-sm">{member.role}</p>
											{#if member.year}
												<p class="text-sm font-semibold">
													{member.year}
												</p>
											{/if}
											{#if member.department}
												<p class="text-sm font-bold">
													{member.department}
												</p>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/if}
						{#each department.subDepartments as subDept, subDeptIndex}
							<div class="mb-6">
								<h3 class="mb-4 text-xl font-semibold text-coqueilcot">
									<span class="mr-2 inline-flex items-center justify-center rounded-md bg-coqueilcot px-2 py-1 text-base font-bold text-white">
										{getWBSNumber(deptIndex, subDeptIndex)}
									</span>
									{subDept.name}
								</h3>
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
