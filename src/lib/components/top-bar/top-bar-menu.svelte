<script lang="ts">

    	import CircleUser from '@lucide/svelte/icons/circle-user';
	import Search from '@lucide/svelte/icons/search';
  	import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.ts';

	import type { NavigationItem } from '$lib/types/navigation';
    
    const navigationItems: NavigationItem[] = [
		{ title: 'Missão', href: '/missao' },
		{ title: 'Contactos Si', href: '/contatos_si' },
		{ title: 'Contactos Si UO', href: '/contatos_si_uo' }
	];
</script>
<div class="grid grid-cols-3" aria-label="main navigation">
		<div class="col-span-3 bg-white px-10 py-10 lg:col-span-1">
			<h1>logo goes here</h1>
		</div>
		<div class="col-span-3 bg-secondary lg:col-span-2">
			<div class="flex justify-between px-10 py-10">
				<div class="flex gap-6">
					{#each navigationItems as item}
						<a class="transition duration-150 hover:text-white" href={item.href}
							><h4>{item.title}</h4></a
						>
					{/each}
				</div>
				<div class="flex gap-8 items-center">
					<button class="flex cursor-pointer gap-2 transition duration-150 hover:text-white"
						><CircleUser /> Log In</button
					>
					<button class="flex cursor-pointer gap-2 transition duration-150 hover:text-white">
						<Search />
					</button>
          <DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
    <button {...props} class="flex cursor-pointer gap-2 transition duration-150 hover:text-white items-center">
      <span>PT</span>
      <ChevronDown size={16}   />
    </button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        PT
        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        EN
        <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
				</div>
			</div>
		</div>
	</div>