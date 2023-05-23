<script lang="ts">
	import { getContext } from 'svelte';

	const state = getContext('state');
    const count = state.filtered.count
</script>

{#if $count == 0}
	<div {...$$props} cmdk-empty="" role="presentation"><slot /></div>
{/if}
