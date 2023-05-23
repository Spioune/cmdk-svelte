<script lang="ts">
	import { Command } from '$lib';

	let open = true;
	let inputValue = '';
</script>

<Command.Dialog
	loop={false}
	onKeyDown={(e) => {
		if (e.key === 'Enter') {
			inputValue = '';
		}

		if (inputValue.length) {
			return;
		}

		if (e.key === 'Backspace') {
			e.preventDefault();
			inputValue = '';
		}
	}}
	{open}
	class="font-light max-w-2xl shadow-[0_16px_70px_rgb(0_0_0_/_0.25)] overflow-clip rounded-lg border bg-white [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-gray-400"
>
	<!-- <Command.Overlay class="fixed inset-0 bg-white/90 z-50" /> -->
	<Command.Content class="grid w-full">
		<Command.Input
			bind:value={inputValue}
			on:keydown={(e) => {
				if (e.key == 'Backspace' && inputValue.length > 0) {
					e.stopPropagation();
				}
			}}
			autofocus
			placeholder="Search for apps and commands..."
			class="outline-none border-b px-4 py-4"
		/>
		<Command.List class="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
			<Command.Empty class="text-sm py-2 text-center">No results found.</Command.Empty>
			<Command.Group heading="Suggestions">
				<Command.Item
					value="Linear"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-black/5 p-1 rounded mr-2">
						<svg width="12" height="12" viewBox="0 0 64 64" fill="none">
							<path
								d="M0.403013 37.3991L26.6009 63.597C13.2225 61.3356 2.66442 50.7775 0.403013 37.3991Z"
								fill="#5E6AD2"
							/>
							<path
								d="M0 30.2868L33.7132 64C35.7182 63.8929 37.6742 63.6013 39.5645 63.142L0.85799 24.4355C0.398679 26.3259 0.10713 28.2818 0 30.2868Z"
								fill="#5E6AD2"
							/>
							<path
								d="M2.53593 19.4042L44.5958 61.4641C46.1277 60.8066 47.598 60.0331 48.9956 59.1546L4.84543 15.0044C3.96691 16.402 3.19339 17.8723 2.53593 19.4042Z"
								fill="#5E6AD2"
							/>
							<path
								d="M7.69501 11.1447C13.5677 4.32093 22.2677 0 31.9769 0C49.6628 0 64 14.3372 64 32.0231C64 41.7323 59.6791 50.4323 52.8553 56.305L7.69501 11.1447Z"
								fill="#5E6AD2"
							/>
						</svg>
					</div>
					<div>Linear</div>
					<div class="ml-auto text-gray-500">Application</div>
				</Command.Item>
				<Command.Item
					value="Figma"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-black/5 p-1 rounded mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="12" height="12">
							<path fill="#e64a19" d="M26,17h-8c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h8V17z" />
							<path fill="#7c4dff" d="M25,31h-7c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7V31z" />
							<path
								fill="#66bb6a"
								d="M18,45L18,45c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7v7C25,41.866,21.866,45,18,45z"
							/>
							<path
								fill="#ff7043"
								d="M32,17h-7V3h7c3.866,0,7,3.134,7,7v0C39,13.866,35.866,17,32,17z"
							/>
							<circle cx="32" cy="24" r="7" fill="#29b6f6" />
						</svg>
					</div>
					<div>Figma</div>
					<div class="ml-auto text-gray-500">Application</div>
				</Command.Item>
				<Command.Item
					value="Slack"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-black/5 p-1 rounded mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="12" height="12">
							<path
								fill="#33d375"
								d="M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.254,0,9.741,0,11c0,2.209,1.791,4,4,4s4-1.791,4-4	C33,17.741,33,9.254,33,8z"
							/>
							<path
								fill="#33d375"
								d="M43,19c0,2.209-1.791,4-4,4c-1.195,0-4,0-4,0s0-2.986,0-4c0-2.209,1.791-4,4-4S43,16.791,43,19z"
							/>
							<path
								fill="#40c4ff"
								d="M8,14c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.254,0,9.741,0,11,0c2.209,0,4-1.791,4-4s-1.791-4-4-4	C17.741,14,9.254,14,8,14z"
							/>
							<path
								fill="#40c4ff"
								d="M19,4c2.209,0,4,1.791,4,4c0,1.195,0,4,0,4s-2.986,0-4,0c-2.209,0-4-1.791-4-4S16.791,4,19,4z"
							/>
							<path
								fill="#e91e63"
								d="M14,39.006C14,41.212,15.791,43,18,43s4-1.788,4-3.994c0-1.252,0-9.727,0-10.984	c0-2.206-1.791-3.994-4-3.994s-4,1.788-4,3.994C14,29.279,14,37.754,14,39.006z"
							/>
							<path
								fill="#e91e63"
								d="M4,28.022c0-2.206,1.791-3.994,4-3.994c1.195,0,4,0,4,0s0,2.981,0,3.994c0,2.206-1.791,3.994-4,3.994	S4,30.228,4,28.022z"
							/>
							<path
								fill="#ffc107"
								d="M39,33c2.209,0,4-1.791,4-4s-1.791-4-4-4c-1.254,0-9.741,0-11,0c-2.209,0-4,1.791-4,4s1.791,4,4,4	C29.258,33,37.746,33,39,33z"
							/>
							<path
								fill="#ffc107"
								d="M28,43c-2.209,0-4-1.791-4-4c0-1.195,0-4,0-4s2.986,0,4,0c2.209,0,4,1.791,4,4S30.209,43,28,43z"
							/>
						</svg>
					</div>
					<div>Slack</div>
					<div class="ml-auto text-gray-500">Application</div>
				</Command.Item>
				<Command.Item
					value="Youtube"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-black/5 p-1 rounded mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="12" height="12">
							<path
								fill="#FF3D00"
								d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
							/>
							<path fill="#FFF" d="M20 31L20 17 32 24z" />
						</svg>
					</div>
					<div>Youtube</div>
					<div class="ml-auto text-gray-500">Application</div>
				</Command.Item>
				<Command.Item
					value="Raycast"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-black/5 p-1 rounded mr-2">
						<svg
							width="12"
							height="12"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M7 18.073V20.994L0 13.994L1.46 12.534L7 18.075V18.073ZM9.921 20.994H7L14 27.994L15.46 26.534L9.921 20.994V20.994ZM26.535 15.456L27.996 13.994L13.996 -0.00598145L12.538 1.46002L18.077 6.99802H14.73L10.864 3.14002L9.404 4.60002L11.809 7.00402H10.129V17.87H20.994V16.19L23.399 18.594L24.859 17.134L20.994 13.268V9.92102L26.534 15.456H26.535ZM7.73 6.27002L6.265 7.73202L7.833 9.29802L9.294 7.83802L7.73 6.27002ZM20.162 18.702L18.702 20.164L20.268 21.732L21.73 20.27L20.162 18.702V18.702ZM4.596 9.40402L3.134 10.866L7 14.732V11.809L4.596 9.40402ZM16.192 21H13.268L17.134 24.866L18.596 23.404L16.192 21Z"
								fill="#FF6363"
							/>
						</svg>
					</div>
					<div>Raycast</div>
					<div class="ml-auto text-gray-500">Application</div>
				</Command.Item>
			</Command.Group>
			<Command.Group heading="Suggestions">
				<Command.Item
					value="Clipboard History"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-red-500 text-white p-1 rounded mr-2">
						<svg
							width="12"
							height="12"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M6.07512 2.75H4.75C3.64543 2.75 2.75 3.64543 2.75 4.75V12.25C2.75 13.3546 3.64543 14.25 4.75 14.25H11.25C12.3546 14.25 13.25 13.3546 13.25 12.25V4.75C13.25 3.64543 12.3546 2.75 11.25 2.75H9.92488M9.88579 3.02472L9.5934 4.04809C9.39014 4.75952 8.73989 5.25 8 5.25V5.25C7.26011 5.25 6.60986 4.75952 6.4066 4.04809L6.11421 3.02472C5.93169 2.38591 6.41135 1.75 7.07573 1.75H8.92427C9.58865 1.75 10.0683 2.3859 9.88579 3.02472Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</div>
					<div>Clipboard History</div>
					<div class="ml-auto text-gray-500">Command</div>
				</Command.Item>
				<Command.Item
					value="Import Extension"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-green-700 text-white p-1 rounded mr-2">
						<svg
							width="12"
							height="12"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M6.73762 6.19288L2.0488 11.2217C1.6504 11.649 1.6504 12.3418 2.0488 12.769L3.13083 13.9295C3.52923 14.3568 4.17515 14.3568 4.57355 13.9295L9.26238 8.90071M6.73762 6.19288L7.0983 5.80605C7.4967 5.37877 7.4967 4.686 7.0983 4.25872L6.01627 3.09822L6.37694 2.71139C7.57213 1.42954 9.50991 1.42954 10.7051 2.71139L13.9512 6.19288C14.3496 6.62017 14.3496 7.31293 13.9512 7.74021L12.8692 8.90071C12.4708 9.328 11.8248 9.328 11.4265 8.90071L11.0658 8.51388C10.6674 8.0866 10.0215 8.0866 9.62306 8.51388L9.26238 8.90071M6.73762 6.19288L9.26238 8.90071"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</div>
					<div>Import Extension</div>
					<div class="ml-auto text-gray-500">Command</div>
				</Command.Item>
				<Command.Item
					value="Manage Extensions"
					class="relative flex cursor-default select-none items-center rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				>
					<div class="bg-green-700 text-white p-1 rounded mr-2">
						<svg
							width="12"
							height="12"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M6.73762 6.19288L2.0488 11.2217C1.6504 11.649 1.6504 12.3418 2.0488 12.769L3.13083 13.9295C3.52923 14.3568 4.17515 14.3568 4.57355 13.9295L9.26238 8.90071M6.73762 6.19288L7.0983 5.80605C7.4967 5.37877 7.4967 4.686 7.0983 4.25872L6.01627 3.09822L6.37694 2.71139C7.57213 1.42954 9.50991 1.42954 10.7051 2.71139L13.9512 6.19288C14.3496 6.62017 14.3496 7.31293 13.9512 7.74021L12.8692 8.90071C12.4708 9.328 11.8248 9.328 11.4265 8.90071L11.0658 8.51388C10.6674 8.0866 10.0215 8.0866 9.62306 8.51388L9.26238 8.90071M6.73762 6.19288L9.26238 8.90071"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</div>
					<div>Manage Extensions</div>
					<div class="ml-auto text-gray-500">Command</div>
				</Command.Item>
			</Command.Group>
		</Command.List>
		<div class="flex items-center border-t p-2 text-xs">
			<svg
				class="text-gray-400"
				width="18"
				height="18"
				viewBox="0 0 1024 1024"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M934.302 511.971L890.259 556.017L723.156 388.902V300.754L934.302 511.971ZM511.897 89.5373L467.854 133.583L634.957 300.698H723.099L511.897 89.5373ZM417.334 184.275L373.235 228.377L445.776 300.923H533.918L417.334 184.275ZM723.099 490.061V578.209L795.641 650.755L839.74 606.652L723.099 490.061ZM697.868 653.965L723.099 628.732H395.313V300.754L370.081 325.987L322.772 278.675L278.56 322.833L325.869 370.146L300.638 395.379V446.071L228.097 373.525L183.997 417.627L300.638 534.275V634.871L133.59 467.925L89.4912 512.027L511.897 934.461L555.996 890.359L388.892 723.244H489.875L606.516 839.892L650.615 795.79L578.074 723.244H628.762L653.994 698.011L701.303 745.323L745.402 701.221L697.868 653.965Z"
				/></svg
			>
			<button class="font-medium ml-auto text-gray-500">Open Application</button>
			<kbd class="bg-gray-100 px-1 py-0.5 text-center rounded ml-2 font-sans text-gray-500">↵</kbd>
		</div>
	</Command.Content>
</Command.Dialog>
