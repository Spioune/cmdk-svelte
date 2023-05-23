<script lang="ts">
	import { setContext, tick } from 'svelte';
	import { get, writable } from 'svelte/store';
	import { commandScore } from './command-score';

	export let onKeyDown: (e: KeyboardEvent) => void = () => {};
	export let open = false;
	export let loop = false;

	let ref: HTMLElement | null = null;

	let allItems: Set<string> = new Set();
	let allGroups: Map<string, Set<string>> = new Map();
	let ids: Map<string, string> = new Map();

	let state = {
		search: writable(''),
		value: writable(''),
		filtered: {
			count: writable(0),
			groups: new Set(),
			items: new Map()
		}
	};
	function score(value: string) {
		return commandScore(value, get(state.search));
	}
	let context = {
		value: (id: string, value: string) => {
			if (value !== ids.get(id)) {
				ids.set(id, value);
				ids = ids;
				state.filtered.items.set(id, score(value));
				state.filtered.items = state.filtered.items;
			}
		},
		group: (id: string) => {
			if (!allGroups.has(id)) {
				allGroups.set(id, new Set());
			}
			allGroups = allGroups;

			return () => {
				ids.delete(id);
				allGroups.delete(id);
			};
		},
		item: (id: string, groupId: string) => {
			allItems.add(id);
			if (groupId) {
				if (!allGroups.has(groupId)) {
					allGroups.set(groupId, new Set([id]));
				} else {
					allGroups.get(groupId)?.add(id);
				}
			}

			filterItems();
			sort();

			if (!get(state.value)) {
				selectFirstItem();
			}
			allItems = allItems;
			allGroups = allGroups;
			state = state;

			return () => {
				// if (get(state.value) == ids.get(id)) {
				// 	tick().then(() => selectFirstItem());
				// }
				ids.delete(id);
				ids = ids;
				allItems.delete(id);
				allItems = allItems;
				state.filtered.items.delete(id);
				state.filtered.items = state.filtered.items;
				state = state;

				filterItems();
				const selectedItem = getSelectedItem();
				tick().then(() => {
					if (selectedItem == null || selectedItem.getAttribute('id') === id) selectFirstItem();
				});
			};
		}
	};
	function selectFirstItem() {
		const item = getValidItems().find((item) => !item.ariaDisabled);
		const value = item?.getAttribute(VALUE_ATTR);
		state.value.set(value || undefined);
	}
	function scrollSelectedIntoView() {
		const item = getSelectedItem();

		if (item) {
			if (item.parentElement?.firstChild === item) {
				// First item in Group, ensure heading is in view
				item
					.closest(GROUP_SELECTOR)
					?.querySelector(GROUP_HEADING_SELECTOR)
					?.scrollIntoView({ block: 'nearest' });
			}

			// Ensure the item is always in view
			item.scrollIntoView({ block: 'nearest' });
		}
	}
	setContext('state', state);
	setContext('context', context);

	function filterItems() {
		if (!get(state.search)) {
			state.filtered.count.set(allItems.size);
			return;
		}
		// Reset the groups
		state.filtered.groups = new Set();
		let itemCount = 0;

		// Check which items should be included
		for (const id of allItems) {
			const value = ids.get(id);
			const rank = score(value);
			state.filtered.items.set(id, rank);
			if (rank > 0) itemCount++;
		}

		// Check which groups have at least 1 item shown
		for (const [groupId, group] of allGroups) {
			for (const itemId of group) {
				if (state.filtered.items.get(itemId) > 0) {
					state.filtered.groups.add(groupId);
					break;
				}
			}
		}

		// console.log('setitemcount', itemCount)
		state.filtered.count.set(itemCount);
		// state.filtered.items = state.filtered.items;
		// state.filtered.groups = state.filtered.groups;
		// state = state;
	}

	const LIST_SELECTOR = `[cmdk-list-sizer=""]`;
	const GROUP_SELECTOR = `[cmdk-group=""]`;
	const GROUP_ITEMS_SELECTOR = `[cmdk-group-items=""]`;
	const GROUP_HEADING_SELECTOR = `[cmdk-group-heading=""]`;
	const ITEM_SELECTOR = `[cmdk-item=""]`;
	const VALID_ITEM_SELECTOR = `${ITEM_SELECTOR}:not([aria-disabled="true"])`;
	const SELECT_EVENT = `cmdk-item-select`;
	const VALUE_ATTR = `data-value`;
	function getValidItems() {
		return Array.from(ref?.querySelectorAll(VALID_ITEM_SELECTOR) || []);
	}
	function sort() {
		if (!ref || !get(state.search)) return;

		const scores = state.filtered.items;

		// Sort the groups
		const groups: [string, number][] = [];
		state.filtered.groups.forEach((value) => {
			const items = allGroups.get(value);

			// Get the maximum score of the group's items
			let max = 0;
			items.forEach((item) => {
				const score = scores.get(item);
				max = Math.max(score, max);
			});

			groups.push([value, max]);
		});

		// Sort items within groups to bottom
		// Sort items outside of groups
		// Sort groups to bottom (pushes all non-grouped items to the top)
		const list = ref.querySelector(LIST_SELECTOR);

		// Sort the items
		getValidItems()
			.sort((a, b) => {
				const valueA = a.getAttribute(VALUE_ATTR);
				const valueB = b.getAttribute(VALUE_ATTR);
				return (scores.get(valueB) ?? 0) - (scores.get(valueA) ?? 0);
			})
			.forEach((item) => {
				const group = item.closest(GROUP_ITEMS_SELECTOR);
				if (group) {
					group.appendChild(
						item.parentElement === group ? item : item.closest(`${GROUP_ITEMS_SELECTOR} > *`)
					);
				} else {
					list.appendChild(
						item.parentElement === list ? item : item.closest(`${GROUP_ITEMS_SELECTOR} > *`)
					);
				}
			});

		groups
			.sort((a, b) => b[1] - a[1])
			.forEach((group) => {
				const element = ref.querySelector(`${GROUP_SELECTOR}[${VALUE_ATTR}="${group[0]}"]`);
				element?.parentElement.appendChild(element);
			});
	}

	state.search.subscribe(async (value) => {
		filterItems();
		sort();
		await tick();
		selectFirstItem();
	});

	state.value.subscribe((value) => {
		tick().then(() => scrollSelectedIntoView());
	});

	function prev(e: KeyboardEvent) {
		e.preventDefault();

		if (e.metaKey) {
			// First item
			updateSelectedToIndex(0);
		} else if (e.altKey) {
			// Previous group
			updateSelectedToGroup(-1);
		} else {
			// Previous item
			updateSelectedByChange(-1);
		}
	}
	function updateSelectedToIndex(index: number) {
		const items = getValidItems();
		const item = items[index];
		if (item) state.value.set(item.getAttribute(VALUE_ATTR));
	}
	function last() {
		updateSelectedToIndex(getValidItems().length - 1);
	}
	function updateSelectedToGroup(change: 1 | -1) {
		const selected = getSelectedItem();
		let group = selected?.closest(GROUP_SELECTOR);
		let item: HTMLElement;

		while (group && !item) {
			group =
				change > 0
					? findNextSibling(group, GROUP_SELECTOR)
					: findPreviousSibling(group, GROUP_SELECTOR);
			item = group?.querySelector(VALID_ITEM_SELECTOR);
		}

		if (item) {
			state.value.set(item.getAttribute(VALUE_ATTR));
		} else {
			updateSelectedByChange(change);
		}
	}
	function findNextSibling(el: Element, selector: string) {
		let sibling = el.nextElementSibling;

		while (sibling) {
			if (sibling.matches(selector)) return sibling;
			sibling = sibling.nextElementSibling;
		}
	}
	function findPreviousSibling(el: Element, selector: string) {
		let sibling = el.previousElementSibling;

		while (sibling) {
			if (sibling.matches(selector)) return sibling;
			sibling = sibling.previousElementSibling;
		}
	}
	function next(e: KeyboardEvent) {
		e.preventDefault();

		if (e.metaKey) {
			// Last item
			last();
		} else if (e.altKey) {
			// Next group
			updateSelectedToGroup(1);
		} else {
			// Next item
			updateSelectedByChange(1);
		}
	}

	function getSelectedItem() {
		return ref?.querySelector(`${ITEM_SELECTOR}[aria-selected="true"]`);
	}

	function updateSelectedByChange(change: 1 | -1) {
		const selected = getSelectedItem();
		const items = getValidItems();
		const index = items.findIndex((item) => item === selected);

		// Get item at this index
		let newSelected = items[index + change];

		if (loop) {
			newSelected =
				index + change < 0
					? items[items.length - 1]
					: index + change === items.length
					? items[0]
					: items[index + change];
		}

		if (newSelected) state.value.set(newSelected.getAttribute(VALUE_ATTR));
	}
</script>

<!-- <svelte:window on:keydown={handleKeyDown} /> -->
<!-- 
<div>value</div>
<pre>{JSON.stringify($v)}</pre>
<div>ids</div>
<pre>{JSON.stringify(Object.fromEntries(ids), null, 2)}</pre>
<div>allItems</div>
<pre>{JSON.stringify([...allItems], null, 2)}</pre>
<div>allGroups</div>
<pre>{JSON.stringify(Object.fromEntries(allGroups), null, 2)}</pre>
<div>state.filtered.groups</div>
<pre>{JSON.stringify([...state.filtered.groups], null, 2)}</pre>
<div>state.filtered.items</div>
<pre>{JSON.stringify(Object.fromEntries(state.filtered.items), null, 2)}</pre> -->
{#if open}
	<div
		{...$$props}
		cmdk-root=""
		bind:this={ref}
		on:keydown={(e) => {
			onKeyDown?.(e);

			if (!e.defaultPrevented) {
				switch (e.key) {
					case 'n':
					case 'j': {
						// vim keybind down
						if (e.ctrlKey) {
							next(e);
						}
						break;
					}
					case 'ArrowDown': {
						next(e);
						break;
					}
					case 'p':
					case 'k': {
						// vim keybind up
						if (e.ctrlKey) {
							prev(e);
						}
						break;
					}
					case 'ArrowUp': {
						prev(e);
						break;
					}
					case 'Home': {
						// First item
						e.preventDefault();
						updateSelectedToIndex(0);
						break;
					}
					case 'End': {
						// Last item
						e.preventDefault();
						last();
						break;
					}
					case 'Enter': {
						// Trigger item onSelect
						e.preventDefault();
						const item = getSelectedItem();
						if (item) {
							const event = new Event(SELECT_EVENT);
							item.dispatchEvent(event);
						}
					}
				}
			}
		}}
	>
		<slot />
	</div>
{/if}
