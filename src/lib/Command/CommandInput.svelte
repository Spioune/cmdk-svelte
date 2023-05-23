<script lang="ts">
	export let value: string;

	import { getContext } from 'svelte';

	const { search } = getContext('state');

	$: search.set(value);
</script>

<input
	{...$$props}
	cmdk-input=""
	autoComplete="off"
	autoCorrect="off"
	spellCheck={false}
	aria-autocomplete="list"
	role="combobox"
	aria-expanded={true}
	aria-controls=""
	type="text"
	bind:value
/>
