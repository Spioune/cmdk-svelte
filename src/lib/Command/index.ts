import CommandContent from './CommandContent.svelte';
import CommandDialog from './CommandDialog.svelte';
import CommandGroup from './CommandGroup.svelte';
import CommandInput from './CommandInput.svelte';
import CommandItem from './CommandItem.svelte';
import CommandList from './CommandList.svelte';
import CommandOverlay from './CommandOverlay.svelte';
import CommandEmpty from './CommandEmpty.svelte';

export const Command = {
	Dialog: CommandDialog,
	Input: CommandInput,
	Group: CommandGroup,
	List: CommandList,
	Item: CommandItem,
	Overlay: CommandOverlay,
	Content: CommandContent,
	Empty: CommandEmpty
};
