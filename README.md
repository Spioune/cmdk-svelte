# ⌘K for Svelte

This is an implementation of [Paco's cmdk](https://github.com/pacocoursey/cmdk) for Svelte.

It is not complete, it is not perfect, but it's functional.

## Install

```bash
npm install cmdk-svelte
```

## Use

```tsx
<script>
	import { Command } from 'cmdk-svelte';

	let open = false;
	let value = '';
</script>

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
</Command.Dialog>
```
