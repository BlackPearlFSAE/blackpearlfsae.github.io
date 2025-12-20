<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

	let canvasContainer;
	let scene, camera, renderer, controls;
	let currentMesh = null;
	let fileInput;
	let fileName = '';
	let observer;
	let gridHelper, axesHelper;
	let modelInfo = null;
	let showInfo = true;
	let showGrid = true;
	let showAxes = true;
	let showPlanes = true;
	let showScale = true;

	// Camera controls (simple orbit)
	let isDragging = false;
	let previousMousePosition = { x: 0, y: 0 };
	let zoom = 1;
	let cameraDistance = 5;

	onMount(() => {
		// Initialize Three.js scene
		scene = new THREE.Scene();
		// Check for dark mode
		const isDark = document.documentElement.classList.contains('dark');
		scene.background = new THREE.Color(isDark ? 0x1f2937 : 0xf5f5f5);

		// Camera
		camera = new THREE.PerspectiveCamera(
			75,
			canvasContainer.clientWidth / canvasContainer.clientHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		// Renderer
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		canvasContainer.appendChild(renderer.domElement);

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);

		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight1.position.set(1, 1, 1);
		scene.add(directionalLight1);

		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight2.position.set(-1, -1, -1);
		scene.add(directionalLight2);

		// Enhanced Grid helper (larger, more subdivisions)
		gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0xcccccc);
		scene.add(gridHelper);

		// Enhanced Axes helper (larger, colored)
		axesHelper = new THREE.AxesHelper(5);
		scene.add(axesHelper);

		// Coordinate planes (semi-transparent)
		const planeSize = 10;
		const planeXY = new THREE.Mesh(
			new THREE.PlaneGeometry(planeSize, planeSize),
			new THREE.MeshBasicMaterial({
				color: 0xff0000,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0.1
			})
		);
		planeXY.rotation.x = Math.PI / 2;
		planeXY.name = 'planeXY';
		scene.add(planeXY);

		const planeXZ = new THREE.Mesh(
			new THREE.PlaneGeometry(planeSize, planeSize),
			new THREE.MeshBasicMaterial({
				color: 0x00ff00,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0.1
			})
		);
		planeXZ.name = 'planeXZ';
		scene.add(planeXZ);

		const planeYZ = new THREE.Mesh(
			new THREE.PlaneGeometry(planeSize, planeSize),
			new THREE.MeshBasicMaterial({
				color: 0x0000ff,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0.1
			})
		);
		planeYZ.rotation.y = Math.PI / 2;
		planeYZ.name = 'planeYZ';
		scene.add(planeYZ);

		// Scale indicators (rulers)
		createScaleIndicators();

		// Mouse controls
		renderer.domElement.addEventListener('mousedown', onMouseDown);
		renderer.domElement.addEventListener('mousemove', onMouseMove);
		renderer.domElement.addEventListener('mouseup', onMouseUp);
		renderer.domElement.addEventListener('wheel', onWheel);

		// Handle window resize
		const handleResize = () => {
			if (!canvasContainer) return;
			camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
		};
		window.addEventListener('resize', handleResize);

		// Handle dark mode changes
		const updateBackground = () => {
			const isDark = document.documentElement.classList.contains('dark');
			scene.background = new THREE.Color(isDark ? 0x1f2937 : 0xf5f5f5);
		};
		observer = new MutationObserver(updateBackground);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			// Camera always looks at origin
			camera.lookAt(0, 0, 0);
			renderer.render(scene, camera);
		};
		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			observer.disconnect();
			renderer.domElement.removeEventListener('mousedown', onMouseDown);
			renderer.domElement.removeEventListener('mousemove', onMouseMove);
			renderer.domElement.removeEventListener('mouseup', onMouseUp);
			renderer.domElement.removeEventListener('wheel', onWheel);
		};
	});

	function onMouseDown(event) {
		isDragging = true;
		previousMousePosition = { x: event.clientX, y: event.clientY };
	}

	function onMouseMove(event) {
		if (!isDragging) return;

		const deltaX = event.clientX - previousMousePosition.x;
		const deltaY = event.clientY - previousMousePosition.y;

		// Rotate camera around the model
		const spherical = new THREE.Spherical();
		spherical.setFromVector3(camera.position);
		spherical.theta -= deltaX * 0.01;
		// Invert deltaY to fix up/down rotation
		spherical.phi -= deltaY * 0.01;
		spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
		
		camera.position.setFromSpherical(spherical);
		camera.lookAt(0, 0, 0);

		previousMousePosition = { x: event.clientX, y: event.clientY };
	}

	function onMouseUp() {
		isDragging = false;
	}

	function onWheel(event) {
		event.preventDefault();
		// Only zoom, no rotation
		zoom += event.deltaY * 0.001;
		zoom = Math.max(0.1, Math.min(3, zoom));
		
		// Update camera distance while maintaining current position direction
		const spherical = new THREE.Spherical();
		spherical.setFromVector3(camera.position);
		spherical.radius = 5 / zoom;
		camera.position.setFromSpherical(spherical);
		camera.lookAt(0, 0, 0);
	}

	function createScaleIndicators() {
		// Create scale indicators along axes
		const scaleGroup = new THREE.Group();
		scaleGroup.name = 'scaleIndicators';

		// X-axis scale
		for (let i = -10; i <= 10; i += 2) {
			if (i === 0) continue;
			const line = new THREE.Line(
				new THREE.BufferGeometry().setFromPoints([
					new THREE.Vector3(i, -0.1, 0),
					new THREE.Vector3(i, 0.1, 0)
				]),
				new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 })
			);
			scaleGroup.add(line);
		}

		// Y-axis scale
		for (let i = -10; i <= 10; i += 2) {
			if (i === 0) continue;
			const line = new THREE.Line(
				new THREE.BufferGeometry().setFromPoints([
					new THREE.Vector3(-0.1, i, 0),
					new THREE.Vector3(0.1, i, 0)
				]),
				new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })
			);
			scaleGroup.add(line);
		}

		// Z-axis scale
		for (let i = -10; i <= 10; i += 2) {
			if (i === 0) continue;
			const line = new THREE.Line(
				new THREE.BufferGeometry().setFromPoints([
					new THREE.Vector3(0, -0.1, i),
					new THREE.Vector3(0, 0.1, i)
				]),
				new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 })
			);
			scaleGroup.add(line);
		}

		scene.add(scaleGroup);
	}

	function toggleGrid() {
		showGrid = !showGrid;
		if (gridHelper) gridHelper.visible = showGrid;
	}

	function toggleAxes() {
		showAxes = !showAxes;
		if (axesHelper) axesHelper.visible = showAxes;
	}

	function togglePlanes() {
		showPlanes = !showPlanes;
		const planeXY = scene.getObjectByName('planeXY');
		const planeXZ = scene.getObjectByName('planeXZ');
		const planeYZ = scene.getObjectByName('planeYZ');
		if (planeXY) planeXY.visible = showPlanes;
		if (planeXZ) planeXZ.visible = showPlanes;
		if (planeYZ) planeYZ.visible = showPlanes;
	}

	function toggleScale() {
		showScale = !showScale;
		const scaleIndicators = scene.getObjectByName('scaleIndicators');
		if (scaleIndicators) scaleIndicators.visible = showScale;
	}

	function setView(direction) {
		cameraDistance = 5 / zoom;

		switch (direction) {
			case 'front':
				camera.position.set(0, 0, cameraDistance);
				break;
			case 'back':
				camera.position.set(0, 0, -cameraDistance);
				break;
			case 'top':
				camera.position.set(0, cameraDistance, 0);
				break;
			case 'bottom':
				camera.position.set(0, -cameraDistance, 0);
				break;
			case 'left':
				camera.position.set(-cameraDistance, 0, 0);
				break;
			case 'right':
				camera.position.set(cameraDistance, 0, 0);
				break;
			case 'isometric':
				camera.position.set(cameraDistance, cameraDistance, cameraDistance);
				break;
		}
		camera.lookAt(0, 0, 0);
	}

	async function handleFileSelect(event) {
		const file = event.target.files[0];
		if (!file) return;

		fileName = file.name;
		const fileExtension = file.name.split('.').pop().toLowerCase();

		// Remove previous mesh
		if (currentMesh) {
			scene.remove(currentMesh);
			if (currentMesh.geometry) currentMesh.geometry.dispose();
			if (currentMesh.material) currentMesh.material.dispose();
			currentMesh = null;
		}

		if (fileExtension === 'stl') {
			await loadSTL(file);
		} else if (fileExtension === 'step' || fileExtension === 'stp') {
			alert(
				'STEP file support is limited. Please convert your STEP file to STL format for viewing. You can use CAD software like FreeCAD, Fusion 360, or online converters.'
			);
		} else {
			alert('Unsupported file format. Please use STL or STEP files.');
		}
	}

	function loadSTL(file) {
		const loader = new STLLoader();
		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const geometry = loader.parse(e.target.result);
				
				// Calculate model info before transformations
				const tempMesh = new THREE.Mesh(geometry);
				const box = new THREE.Box3().setFromObject(tempMesh);
				const size = box.getSize(new THREE.Vector3());
				const center = box.getCenter(new THREE.Vector3());
				const vertices = geometry.attributes.position.count;
				const faces = vertices / 3;

				// Store original dimensions
				modelInfo = {
					dimensions: {
						width: size.x.toFixed(2),
						height: size.y.toFixed(2),
						depth: size.z.toFixed(2)
					},
					center: {
						x: center.x.toFixed(2),
						y: center.y.toFixed(2),
						z: center.z.toFixed(2)
					},
					vertices: vertices,
					faces: faces,
					volume: (size.x * size.y * size.z).toFixed(2)
				};
				
				// Center the geometry
				geometry.center();
				
				// Scale to fit
				const maxDim = Math.max(size.x, size.y, size.z);
				const scale = 3 / maxDim;
				geometry.scale(scale, scale, scale);

				// Create material
				const material = new THREE.MeshPhongMaterial({
					color: 0x00a8ff,
					specular: 0x111111,
					shininess: 200,
					flatShading: false
				});

				// Create mesh
				currentMesh = new THREE.Mesh(geometry, material);
				scene.add(currentMesh);

				// Reset view
				setView('isometric');
			} catch (error) {
				console.error('Error loading STL:', error);
				alert('Error loading STL file. Please make sure the file is valid.');
				modelInfo = null;
			}
		};

		reader.readAsArrayBuffer(file);
	}

	function resetView() {
		zoom = 1;
		cameraDistance = 5;
		setView('isometric');
	}

	function clearCanvas() {
		// Remove current mesh
		if (currentMesh) {
			scene.remove(currentMesh);
			if (currentMesh.geometry) currentMesh.geometry.dispose();
			if (currentMesh.material) currentMesh.material.dispose();
			currentMesh = null;
		}
		
		// Reset model info
		modelInfo = null;
		fileName = '';
		
		// Reset file input
		if (fileInput) {
			fileInput.value = '';
		}
		
		// Reset view
		resetView();
	}

	function changeColor(color) {
		if (currentMesh && currentMesh.material) {
			currentMesh.material.color.setHex(color);
		}
	}
</script>

<div class="mb-8 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md transition-colors duration-200">
	<h2 class="mb-4 text-2xl font-bold text-blackie dark:text-gray-100">STL/STEP Viewer</h2>
	
	<!-- File Input Section -->
	<div class="mb-4 flex flex-wrap gap-4">
		<label
			for="file-input"
			class="cursor-pointer rounded-lg bg-coqueilcot px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-amber_SAE_ECE"
		>
			Choose File
		</label>
		<input
			id="file-input"
			bind:this={fileInput}
			type="file"
			accept=".stl,.step,.stp"
			on:change={handleFileSelect}
			class="hidden"
		/>
		{#if fileName}
			<span class="self-center text-sm font-semibold text-gray-600 dark:text-gray-400">Loaded: {fileName}</span>
		{/if}
		<button
			on:click={clearCanvas}
			class="rounded-lg border-2 border-red-400 bg-white dark:bg-gray-700 px-4 py-2 font-semibold text-red-600 dark:text-red-400 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
		>
			Clear Canvas
		</button>
	</div>

	<!-- View Presets -->
	<div class="mb-4">
		<p class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">View Presets:</p>
		<div class="flex flex-wrap gap-2">
			<button
				on:click={() => setView('isometric')}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				Isometric
			</button>
			<button
				on:click={() => setView('front')}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				Front
			</button>
			<button
				on:click={() => setView('back')}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				Back
			</button>
			<button
				on:click={() => setView('top')}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				Top
			</button>
			<button
				on:click={() => setView('bottom')}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				Bottom
			</button>
			<button
				on:click={() => setView('left')}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				Left
			</button>
			<button
				on:click={() => setView('right')}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				Right
			</button>
			<button
				on:click={resetView}
				class="rounded-lg border-2 border-coqueilcot bg-coqueilcot px-3 py-1 text-xs font-semibold text-white transition-colors duration-200 hover:bg-amber_SAE_ECE"
			>
				Reset
			</button>
		</div>
	</div>

	<!-- Visual Aids Toggles -->
	<div class="mb-4">
		<p class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Visual Aids:</p>
		<div class="flex flex-wrap gap-2">
			<button
				on:click={toggleGrid}
				class={`rounded-lg border px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
					showGrid
						? 'border-coqueilcot bg-coqueilcot text-white'
						: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
				}`}
			>
				Grid
			</button>
			<button
				on:click={toggleAxes}
				class={`rounded-lg border px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
					showAxes
						? 'border-coqueilcot bg-coqueilcot text-white'
						: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
				}`}
			>
				Axes
			</button>
			<button
				on:click={togglePlanes}
				class={`rounded-lg border px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
					showPlanes
						? 'border-coqueilcot bg-coqueilcot text-white'
						: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
				}`}
			>
				Planes
			</button>
			<button
				on:click={toggleScale}
				class={`rounded-lg border px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
					showScale
						? 'border-coqueilcot bg-coqueilcot text-white'
						: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
				}`}
			>
				Scale
			</button>
		</div>
	</div>

	<!-- Color Picker -->
	<div class="mb-4 flex flex-wrap gap-2">
		<span class="self-center text-sm font-semibold text-gray-700 dark:text-gray-300">Model Color:</span>
		<button
			on:click={() => changeColor(0x00a8ff)}
			class="h-8 w-8 rounded border-2 border-gray-300 dark:border-gray-600 bg-blue-500 hover:scale-110 transition-transform"
			title="Blue"
		></button>
		<button
			on:click={() => changeColor(0x00ff00)}
			class="h-8 w-8 rounded border-2 border-gray-300 dark:border-gray-600 bg-green-500 hover:scale-110 transition-transform"
			title="Green"
		></button>
		<button
			on:click={() => changeColor(0xff3f00)}
			class="h-8 w-8 rounded border-2 border-gray-300 dark:border-gray-600 bg-coqueilcot hover:scale-110 transition-transform"
			title="Orange"
		></button>
		<button
			on:click={() => changeColor(0xff7f11)}
			class="h-8 w-8 rounded border-2 border-gray-300 dark:border-gray-600 bg-amber_SAE_ECE hover:scale-110 transition-transform"
			title="Amber"
		></button>
		<button
			on:click={() => changeColor(0xffffff)}
			class="h-8 w-8 rounded border-2 border-gray-300 dark:border-gray-600 bg-white hover:scale-110 transition-transform"
			title="White"
		></button>
		<button
			on:click={() => changeColor(0x000000)}
			class="h-8 w-8 rounded border-2 border-gray-300 dark:border-gray-600 bg-black hover:scale-110 transition-transform"
			title="Black"
		></button>
	</div>

	<!-- Controls Info -->
	<div class="mb-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-3 text-xs text-gray-600 dark:text-gray-400">
		<p class="font-semibold mb-1">Controls:</p>
		<ul class="list-disc list-inside space-y-1">
			<li><strong>Rotate:</strong> Click and drag</li>
			<li><strong>Zoom:</strong> Scroll wheel</li>
			<li><strong>View Presets:</strong> Use buttons above for standard views</li>
		</ul>
	</div>

	<!-- 3D Canvas with Info Overlay -->
	<div class="relative mb-4">
		<div
			bind:this={canvasContainer}
			class="h-[600px] w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900"
		></div>
		
		<!-- Model Info Overlay -->
		{#if modelInfo && showInfo}
			<div class="absolute top-4 right-4 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 shadow-lg max-w-xs">
				<button
					on:click={() => (showInfo = false)}
					class="float-right mb-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
					title="Close"
				>
					×
				</button>
				<h3 class="mb-2 text-sm font-bold text-blackie dark:text-gray-100">Model Information</h3>
				<div class="space-y-1 text-xs text-gray-700 dark:text-gray-300">
					<p><strong>Dimensions:</strong></p>
					<p class="pl-2">W: {modelInfo.dimensions.width} × H: {modelInfo.dimensions.height} × D: {modelInfo.dimensions.depth}</p>
					<p><strong>Center:</strong> ({modelInfo.center.x}, {modelInfo.center.y}, {modelInfo.center.z})</p>
					<p><strong>Vertices:</strong> {modelInfo.vertices.toLocaleString()}</p>
					<p><strong>Faces:</strong> {modelInfo.faces.toLocaleString()}</p>
					<p><strong>Bounding Volume:</strong> {modelInfo.volume}</p>
				</div>
			</div>
		{/if}

		<!-- Axis Labels Overlay -->
		<div class="absolute bottom-4 left-4 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 shadow-lg">
			<div class="text-xs font-semibold space-y-1">
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 rounded bg-red-500"></div>
					<span class="text-gray-700 dark:text-gray-300">X-axis</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 rounded bg-green-500"></div>
					<span class="text-gray-700 dark:text-gray-300">Y-axis</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 rounded bg-blue-500"></div>
					<span class="text-gray-700 dark:text-gray-300">Z-axis</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Info Toggle -->
	{#if modelInfo}
		<div class="mb-4">
			<button
				on:click={() => (showInfo = !showInfo)}
				class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
			>
				{showInfo ? 'Hide' : 'Show'} Model Info
			</button>
		</div>
	{/if}

	<div class="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 text-sm text-blue-800 dark:text-blue-200">
		<p><strong>Note:</strong> STL files are fully supported. STEP files require conversion to STL format. You can use CAD software like FreeCAD, Fusion 360, or online converters to convert STEP to STL.</p>
	</div>
</div>

<style>
	:global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>

