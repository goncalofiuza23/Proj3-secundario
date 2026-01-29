<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import * as DropdownMenu from '../ui/dropdown-menu';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class="flex cursor-pointer items-center gap-2 transition duration-150 hover:text-white"
			>
				<span>PT</span>
				<ChevronDown size={16} />
			</button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-30" align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Item>PT</DropdownMenu.Item>
			<DropdownMenu.Item>EN</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
