<script lang="ts">
	import { Command } from '$lib';

	let open = true;
	let inputValue = '';
	let pages = ['home'];
	$: activePage = pages[pages.length - 1];
	$: isHome = activePage == 'home';

	import { Search, Plus, Users, Sheet, MessageCircle, Play, Pause, Delete } from 'lucide-svelte';
</script>

<Command.Dialog
	loop={false}
	onKeyDown={(e) => {
		if (e.key === 'Enter') {
			inputValue = '';
		}

		if (isHome || inputValue.length) {
			return;
		}

		if (e.key === 'Backspace') {
			e.preventDefault();
			pages.pop();
			pages = pages;
			inputValue = '';
		}
	}}
	{open}
	class="bg-white max-w-2xl rounded-lg p-2 shadow-[0_16px_70px_rgb(0_0_0_/_0.25)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-gray-400"
>
	<!-- <Command.Overlay class="fixed inset-0 bg-white/90 z-50" /> -->
	<Command.Content class="grid w-full">
		<div>
			{#each pages as page, i}
				<button
					tabindex="-1"
					on:click={() => (pages = pages.slice(0, i + 1))}
					class="capitalize px-2 py-0.5 mx-1 rounded text-gray-500 text-xs bg-black/5 inline-flex"
				>
					{page}
				</button>
			{/each}
		</div>
		<Command.Input
			bind:value={inputValue}
			on:keydown={(e) => {
				if (e.key == 'Backspace' && inputValue.length > 0) {
					e.stopPropagation();
				}
			}}
			autofocus
			placeholder={activePage == 'projects' ? 'Search Projects...' : 'What do you need ?'}
			class="outline-none mb-4 border-b px-2 py-4"
		/>
		<Command.List class="max-h-[300px] overflow-y-auto overflow-x-hidden text-zinc-400">
			<Command.Empty class="text-sm py-2 text-center">No results found.</Command.Empty>
			{#if activePage == 'projects'}
				{#each { length: 6 } as _, i}
					<Command.Item
						value="Project {i + 1}"
						onSelect={() => window.alert(`Project ${i + 1} selected`)}
						class="relative flex cursor-default select-none items-center rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-gray-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						Project {i + 1}
					</Command.Item>
				{/each}
			{:else}
				<Command.Group heading="Projects">
					<Command.Item
						value="Search Projects..."
						onSelect={() => {
							console.log('onSelect search projects...');
							pages = [...pages, 'projects'];
						}}
						class="relative flex cursor-default select-none items-center rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-gray-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<Search class="w-4 h-4 mr-2" />
						Search Projects...
					</Command.Item>
					<Command.Item
						value="Create a new Project..."
						class="relative flex cursor-default select-none items-center rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-gray-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<Plus class="w-4 h-4 mr-2" />
						Create a new Project...
					</Command.Item>
				</Command.Group>
				<Command.Group heading="Teams">
					<Command.Item
						value="Search Teams..."
						class="relative flex cursor-default select-none items-center rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-gray-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<Users class="w-4 h-4 mr-2" />
						Search Teams...
					</Command.Item>
					<Command.Item
						value="Create a new Team..."
						class="relative flex cursor-default select-none items-center rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-gray-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<Plus class="w-4 h-4 mr-2" />
						Create a new Team...
					</Command.Item>
				</Command.Group>
				<Command.Group heading="Help">
					<Command.Item
						value="Search Docs..."
						class="relative flex cursor-default select-none items-center rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-gray-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<Sheet class="w-4 h-4 mr-2" />
						Search Docs...
					</Command.Item>
					<Command.Item
						value="Create Feedback..."
						class="relative flex cursor-default select-none items-center rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-gray-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<MessageCircle class="w-4 h-4 mr-2" />
						Create Feedback...
					</Command.Item>
				</Command.Group>
			{/if}
		</Command.List>
	</Command.Content>
</Command.Dialog>
