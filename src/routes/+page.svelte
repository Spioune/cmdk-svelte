<script lang="ts">
	import CommandVercel from '../components/CommandVercel.svelte';
	import CommandRaycast from '../components/CommandRaycast.svelte';
	import CommandLinear from '../components/CommandLinear.svelte';

	import Prism from 'prismjs';
	import 'prism-svelte';
	import VercelIcon from '../components/VercelIcon.svelte';
	import RaycastIcon from '../components/RaycastIcon.svelte';
	import LinearIcon from '../components/LinearIcon.svelte';

	let code = `
\<script\>
	import { Command } from 'cmdk-svelte';

	let open = false;
	let value = '';
\</script\>

<svelte:window
	on:keydown={(e) => {
		if (e.metaKey && e.key == 'k') {
			open = !open;
		}
		if (e.key == 'Escape') {
			open = false;
		}
	}}
	on:pointerdown={() => (open = false)}
/>

<Command.Dialog {open}>
	<Command.Overlay />
	<Command.Content>
		<Command.Input bind:value />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group heading="Projects">
				<Command.Item onSelect={()=>{}}>Search Projects...</Command.Item>
				<Command.Item>...</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Content>
</Command.Dialog>`;

	let command = 'vercel';
</script>

<svelte:head>
	<link href="/prism.css" rel="stylesheet" />
</svelte:head>

<main class="flex flex-col items-center">
	<h1 class="font-bold text-4xl my-20">⌘K for Svelte</h1>
	<div class="w-[600px] h-[460px]">
		{#if command == 'vercel'}
			<CommandVercel />
		{:else if command == 'raycast'}
			<CommandRaycast />
		{:else}
			<CommandLinear />
		{/if}
	</div>

	<div class="flex space-x-4">
		<button
			class="flex items-center justify-center w-28 py-2 rounded-full font-light text-sm {command ==
			'vercel'
				? 'bg-black/10'
				: ''}"
			on:click={() => (command = 'vercel')}
		>
			<VercelIcon class="w-4 h-4 mr-2" />
			Vercel
		</button>
		<button
			class="flex items-center justify-center w-28 py-2 rounded-full font-light text-sm {command ==
			'raycast'
				? 'bg-black/10'
				: ''}"
			on:click={() => (command = 'raycast')}
		>
			<RaycastIcon class="w-4 h-4 mr-2" />
			Raycast
		</button>
		<button
			class="flex items-center justify-center w-28 py-2 rounded-full font-light text-sm {command ==
			'linear'
				? 'bg-black/10'
				: ''}"
			on:click={() => (command = 'linear')}
		>
			<LinearIcon class="w-4 h-4 mr-2" />
			Linear
		</button>
	</div>

	<pre class="bg-white border rounded-lg px-4 text-xs my-20">
		<code>{@html Prism.highlight(code, Prism.languages.svelte, 'svelte')}</code>
	</pre>
</main>

<style>
	main::before {
		content: '';
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: -1;
		background: radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fcfcfc 100%);
	}
	main::after {
		content: '';
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: -2;
		background-image: url(https://cmdk.paco.me/grid.svg);
		filter: invert(1);
		opacity: 0.4;
	}
</style>
