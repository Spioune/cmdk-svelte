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
	<div class="w-[600px] flex items-center justify-between">
		<div class="w-6" />
		<h1 class="font-bold text-4xl my-20">⌘K for Svelte</h1>
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://github.com/spioune/cmdk-svelte"
			class="w-6 h-6"
		>
			<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M7 0.175049C3.128 0.175049 0 3.30305 0 7.17505C0 10.259 2.013 12.885 4.79 13.825C5.14 13.891 5.272 13.672 5.272 13.497V12.316C3.325 12.731 2.909 11.375 2.909 11.375C2.581 10.565 2.122 10.347 2.122 10.347C1.488 9.90905 2.166 9.93105 2.166 9.93105C2.866 9.97505 3.237 10.653 3.237 10.653C3.872 11.725 4.878 11.419 5.272 11.243C5.338 10.784 5.512 10.478 5.709 10.303C4.156 10.128 2.516 9.51605 2.516 6.84705C2.516 6.08105 2.778 5.46905 3.237 4.96605C3.172 4.79105 2.931 4.06905 3.303 3.10605C3.303 3.10605 3.893 2.90905 5.228 3.82805C5.79831 3.67179 6.38668 3.5911 6.978 3.58805C7.568 3.58805 8.181 3.67505 8.728 3.82805C10.063 2.93105 10.653 3.10605 10.653 3.10605C11.025 4.06905 10.784 4.79105 10.719 4.96605C11.179 5.44605 11.441 6.08105 11.441 6.84605C11.441 9.53705 9.8 10.128 8.247 10.303C8.487 10.522 8.728 10.937 8.728 11.593V13.519C8.728 13.716 8.859 13.934 9.209 13.847C11.988 12.884 14 10.259 14 7.17505C14 3.30305 10.872 0.175049 7 0.175049V0.175049Z"
					fill="currentColor"
				/></svg
			>
		</a>
	</div>
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
