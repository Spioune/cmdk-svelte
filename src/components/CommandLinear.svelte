<script lang="ts">
	import { Command } from '$lib';

	let open = true;
	let inputValue = '';
	let activePage = 'home';
</script>

<Command.Dialog
	loop={false}
	onKeyDown={(e) => {
		if (e.key === 'Enter') {
			inputValue = '';
		}

		if (inputValue.length) {
			return;
		}

		if (e.key === 'Backspace') {
			e.preventDefault();
			inputValue = '';
			activePage = 'home';
		}
	}}
	{open}
	class="linear font-light max-w-2xl shadow-[0_16px_70px_rgb(0_0_0_/_0.25)] overflow-clip rounded-lg border bg-white [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-gray-400"
>
	<Command.Content class="grid w-full">
		<div class="flex mt-3 ml-3">
			<div class="text-xs bg-zinc-100 px-2 py-1 rounded">LIN-111 Walkway lighting</div>
		</div>
		<Command.Input
			bind:value={inputValue}
			on:keydown={(e) => {
				if (e.key == 'Backspace' && inputValue.length > 0) {
					e.stopPropagation();
				}
			}}
			autofocus
			placeholder="Type a command or search..."
			class="outline-none border-b px-4 py-4"
		/>
		<Command.List class="max-h-[300px] overflow-y-auto overflow-x-hidden">
			<Command.Group>
				{#if activePage == 'home'}
					<Command.Item
						onSelect={() => (activePage = 'Assign to...')}
						value="Assign to..."
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
								><path
									d="M7 7a2.5 2.5 0 10.001-4.999A2.5 2.5 0 007 7zm0 1c-1.335 0-4 .893-4 2.667v.666c0 .367.225.667.5.667h2.049c.904-.909 2.417-1.911 4.727-2.009v-.72a.27.27 0 01.007-.063C9.397 8.404 7.898 8 7 8zm4.427 2.028a.266.266 0 01.286.032l2.163 1.723a.271.271 0 01.013.412l-2.163 1.97a.27.27 0 01-.452-.2v-.956c-3.328.133-5.282 1.508-5.287 1.535a.27.27 0 01-.266.227h-.022a.27.27 0 01-.249-.271c0-.046 1.549-3.328 5.824-3.509v-.72a.27.27 0 01.153-.243z"
								/></svg
							>
						</div>
						<div>Assign to...</div>
					</Command.Item>
					<Command.Item
						onSelect={() => (activePage = 'Change status...')}
						value="Change status..."
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="-1 -1 15 15" fill="currentColor"
								><path
									d="M10.5714 7C10.5714 8.97245 8.97245 10.5714 7 10.5714L6.99975 3.42857C8.9722 3.42857 10.5714 5.02755 10.5714 7Z"
								/><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
								/></svg
							>
						</div>
						<div>Change status...</div>
					</Command.Item>
					<Command.Item
						value="Change priority..."
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
								><rect x="1" y="8" width="3" height="6" rx="1" /><rect
									x="6"
									y="5"
									width="3"
									height="9"
									rx="1"
								/><rect x="11" y="2" width="3" height="12" rx="1" /></svg
							>
						</div>
						<div>Change priority...</div>
					</Command.Item>
					<Command.Item
						onSelect={() => (activePage = 'Add labels...')}
						value="Add labels..."
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M10.2105 4C10.6337 4 11.0126 4.18857 11.24 4.48L14 8L11.24 11.52C11.0126 11.8114 10.6337 12 10.2105 12L3.26316 11.9943C2.56842 11.9943 2 11.4857 2 10.8571V5.14286C2 4.51429 2.56842 4.00571 3.26316 4.00571L10.2105 4ZM11.125 9C11.6773 9 12.125 8.55228 12.125 8C12.125 7.44772 11.6773 7 11.125 7C10.5727 7 10.125 7.44772 10.125 8C10.125 8.55228 10.5727 9 11.125 9Z"
								/></svg
							>
						</div>
						<div>Add labels...</div>
					</Command.Item>
				{:else if activePage == 'Assign to...'}
					<Command.Item
						value="Jori"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="#8A8F98"
								><path d="M8 4a2 2 0 0 0-2 2v.5a2 2 0 0 0 4 0V6a2 2 0 0 0-2-2Z" /><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-2.879-4.121-1.01 1.01a5.5 5.5 0 1 1 7.778 0l-1.01-1.01A3 3 0 0 0 8.757 10H7.243a3 3 0 0 0-2.122.879Z"
								/></svg
							>
						</div>
						<div>Jori</div>
					</Command.Item>
					<Command.Item
						value="Karri"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="#8A8F98"
								><path d="M8 4a2 2 0 0 0-2 2v.5a2 2 0 0 0 4 0V6a2 2 0 0 0-2-2Z" /><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-2.879-4.121-1.01 1.01a5.5 5.5 0 1 1 7.778 0l-1.01-1.01A3 3 0 0 0 8.757 10H7.243a3 3 0 0 0-2.122.879Z"
								/></svg
							>
						</div>
						<div>Karri</div>
					</Command.Item>
					<Command.Item
						value="Tuomas"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="#8A8F98"
								><path d="M8 4a2 2 0 0 0-2 2v.5a2 2 0 0 0 4 0V6a2 2 0 0 0-2-2Z" /><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-2.879-4.121-1.01 1.01a5.5 5.5 0 1 1 7.778 0l-1.01-1.01A3 3 0 0 0 8.757 10H7.243a3 3 0 0 0-2.122.879Z"
								/></svg
							>
						</div>
						<div>Tuomas</div>
					</Command.Item>
				{:else if activePage == 'Change status...'}
					<Command.Item
						value="Backlog"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="#8A8F98"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M14.9408 8.91426L12.9576 8.65557C12.9855 8.4419 13 8.22314 13 8C13 7.77686 12.9855 7.5581 12.9576 7.34443L14.9408 7.08573C14.9799 7.38496 15 7.69013 15 8C15 8.30987 14.9799 8.61504 14.9408 8.91426ZM14.4688 5.32049C14.2328 4.7514 13.9239 4.22019 13.5538 3.73851L11.968 4.95716C12.2328 5.30185 12.4533 5.68119 12.6214 6.08659L14.4688 5.32049ZM12.2615 2.4462L11.0428 4.03204C10.6981 3.76716 10.3188 3.54673 9.91341 3.37862L10.6795 1.53116C11.2486 1.76715 11.7798 2.07605 12.2615 2.4462ZM8.91426 1.05917L8.65557 3.04237C8.4419 3.01449 8.22314 3 8 3C7.77686 3 7.5581 3.01449 7.34443 3.04237L7.08574 1.05917C7.38496 1.02013 7.69013 1 8 1C8.30987 1 8.61504 1.02013 8.91426 1.05917ZM5.32049 1.53116L6.08659 3.37862C5.68119 3.54673 5.30185 3.76716 4.95716 4.03204L3.73851 2.4462C4.22019 2.07605 4.7514 1.76715 5.32049 1.53116ZM2.4462 3.73851L4.03204 4.95716C3.76716 5.30185 3.54673 5.68119 3.37862 6.08659L1.53116 5.32049C1.76715 4.7514 2.07605 4.22019 2.4462 3.73851ZM1.05917 7.08574C1.02013 7.38496 1 7.69013 1 8C1 8.30987 1.02013 8.61504 1.05917 8.91426L3.04237 8.65557C3.01449 8.4419 3 8.22314 3 8C3 7.77686 3.01449 7.5581 3.04237 7.34443L1.05917 7.08574ZM1.53116 10.6795L3.37862 9.91341C3.54673 10.3188 3.76716 10.6981 4.03204 11.0428L2.4462 12.2615C2.07605 11.7798 1.76715 11.2486 1.53116 10.6795ZM3.73851 13.5538L4.95716 11.968C5.30185 12.2328 5.68119 12.4533 6.08659 12.6214L5.32049 14.4688C4.7514 14.2328 4.22019 13.9239 3.73851 13.5538ZM7.08574 14.9408L7.34443 12.9576C7.5581 12.9855 7.77686 13 8 13C8.22314 13 8.4419 12.9855 8.65557 12.9576L8.91427 14.9408C8.61504 14.9799 8.30987 15 8 15C7.69013 15 7.38496 14.9799 7.08574 14.9408ZM10.6795 14.4688L9.91341 12.6214C10.3188 12.4533 10.6981 12.2328 11.0428 11.968L12.2615 13.5538C11.7798 13.9239 11.2486 14.2328 10.6795 14.4688ZM13.5538 12.2615L11.968 11.0428C12.2328 10.6981 12.4533 10.3188 12.6214 9.91341L14.4688 10.6795C14.2328 11.2486 13.924 11.7798 13.5538 12.2615Z"
								/></svg
							>
						</div>
						<div>Backlog</div>
					</Command.Item>
					<Command.Item
						value="Todo"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
								><g opacity="0.9"
									><path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13Z"
									/></g
								></svg
							>
						</div>
						<div>Todo</div>
					</Command.Item>
					<Command.Item
						value="In Progress"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="16" height="16" viewBox="-1 -1 15 15" fill="#8A8F98"
								><path
									d="M10.5714 7C10.5714 8.97245 8.97245 10.5714 7 10.5714L6.99975 3.42857C8.9722 3.42857 10.5714 5.02755 10.5714 7Z"
								/><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
								/></svg
							>
						</div>
						<div>In Progress</div>
					</Command.Item>
					<Command.Item
						value="Done"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3">
							<svg width="14" height="14" viewBox="0 0 14 14" aria-label="Done" fill="currentColor"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0ZM11.101 5.10104C11.433 4.76909 11.433 4.23091 11.101 3.89896C10.7691 3.56701 10.2309 3.56701 9.89896 3.89896L5.5 8.29792L4.10104 6.89896C3.7691 6.56701 3.2309 6.56701 2.89896 6.89896C2.56701 7.2309 2.56701 7.7691 2.89896 8.10104L4.89896 10.101C5.2309 10.433 5.7691 10.433 6.10104 10.101L11.101 5.10104Z"
								/></svg
							>
						</div>
						<div>Done</div>
					</Command.Item>
				{:else if activePage == 'Add labels...'}
					<Command.Item
						value="Bug"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3 w-2 h-2 rounded-full bg-[#eb5757]" />
						<div>Bug</div>
					</Command.Item>
					<Command.Item
						value="Feature"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3 w-2 h-2 rounded-full bg-[#bb87fc]" />
						<div>Feature</div>
					</Command.Item>
					<Command.Item
						value="Improvement"
						class="relative flex cursor-default select-none items-center px-2 py-3 text-sm outline-none aria-selected:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						<div class="mx-3 w-2 h-2 rounded-full bg-[#4da7fc]" />
						<div>Improvement</div>
					</Command.Item>
				{/if}
			</Command.Group>
		</Command.List>
	</Command.Content>
</Command.Dialog>

<style>
	:global(.linear [cmdk-item][data-selected='true']:after) {
		content: '';
		position: absolute;
		left: 0;
		z-index: 123;
		width: 3px;
		height: 100%;
		background: #5f6ad2;
	}
</style>
