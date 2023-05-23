<script lang="ts">
	export let disabled = false;
	export let value: any;
	export let onSelect: () => void = () => {};

	import { getContext, onMount } from 'svelte';

	const id = crypto.randomUUID();
	const groupId = getContext('groupId');

	const context = getContext('context');
	const state = getContext('state');
	const search = state.search;

	const selectedValue = state.value;

	$: selected = $selectedValue && $selectedValue == value;

	function select() {
		selectedValue.set(value);
	}

	onMount(() => {
		const unregister = context.item(id, groupId);
		context.value(id, value);

		return () => {
			unregister(id);
		};
	});

	const SELECT_EVENT = `cmdk-item-select`;

	function selectevent(element: Element) {
		if (disabled) return;
		element.addEventListener(SELECT_EVENT, onSelect);

		return () => {
			element.removeEventListener(SELECT_EVENT);
		};
	}
</script>

{#if !$search || state.filtered.items.get(id) > 0}
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<div
		use:selectevent
		{...$$props}
		{id}
		cmdk-item
		role="option"
		aria-disabled={disabled || undefined}
		aria-selected={selected || undefined}
		data-disabled={disabled || undefined}
		data-selected={selected || undefined}
		data-value={value}
		data-id={id}
		cmdk-id={id}
		on:pointermove={disabled ? undefined : select}
		on:click={disabled ? undefined : onSelect}
	>
		<slot />
	</div>
{/if}
