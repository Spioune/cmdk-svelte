<script lang="ts">
	import { getContext, setContext, onMount } from 'svelte';

	export let heading: string;

	const id = crypto.randomUUID();
	setContext('groupId', id);

	const state = getContext('state');
	const context = getContext('context');
	const search = state.search;

	onMount(() => {
		const unregister = context.group(id);

		return () => {
			unregister();
		};
	});
</script>

<div
	cmdk-group=""
	data-value={id}
	hidden={!$search || state.filtered.groups.has(id) ? undefined : true}
>
	{#if heading}
		<div cmdk-group-heading="">{heading}</div>
	{/if}
	<div cmdk-group-items="">
		<slot />
	</div>
</div>
