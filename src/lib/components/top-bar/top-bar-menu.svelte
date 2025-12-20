<script lang="ts">
	import CircleUser from '@lucide/svelte/icons/circle-user';
	import Search from '@lucide/svelte/icons/search';
	import Menu from '@lucide/svelte/icons/menu';
	import * as Sheet from '$lib/components/ui/sheet/index.ts';

	import type { NavigationItem } from '$lib/types/navigation.ts';
	import { buttonVariants } from '../ui/button/button.svelte';
	import LanguageSelect from '../language-select/language-select.svelte';
	import { Separator } from '../ui/separator/index.js';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	const navigationItems: NavigationItem[] = [
		{ title: 'Missão', href: '/missao' },
		{ title: 'Contactos Si', href: '/contatos_si' },
		{ title: 'Contactos Si UO', href: '/contatos_si_uo' }
	];

	let mobileMenuOpen = $state(false);
</script>

<!-- desktop version -->
<div class="hidden lg:block">
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
				<div class="flex items-center gap-8">
					<button class="flex cursor-pointer gap-2 transition duration-150 hover:text-white"
						><CircleUser /> Log In</button
					>
					<button class="flex cursor-pointer gap-2 transition duration-150 hover:text-white">
						<Search />
					</button>
					<LanguageSelect />
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Mobile version -->
<div class="block lg:hidden">
	<div class="flex items-center justify-between bg-white px-10 py-10" aria-label="main navigation">
		<h1>logo goes here</h1>
		<button onclick={() => (mobileMenuOpen = true)}>
			<Menu />
		</button>
	</div>
</div>

<Sheet.Root bind:open={mobileMenuOpen}>
	<Sheet.Content side="right" class="w-full">
		<Sheet.Header>
			<Sheet.Title>
				<div class="mr-16 flex items-center justify-between">
					<h4>Acessos Uteis</h4>
					<div class="flex gap-8">
						<button class="flex cursor-pointer gap-2 transition duration-150 hover:text-white"
							><CircleUser /> Log In</button
						>
						<button class="flex cursor-pointer gap-2 transition duration-150 hover:text-white">
							<Search />
						</button>
						<LanguageSelect />
					</div>
				</div>
			</Sheet.Title>
		</Sheet.Header>
		<div class=" mx-4">
			<Separator />
		</div>
		<div class="mx-4 mt-8">
			{#each navigationItems as item}
				<a href={item.href}>
					<div class="mb-8 flex items-center justify-between">
						<button>
							<h4>{item.title}</h4>
						</button>
						<ChevronRight />
					</div>
				</a>
			{/each}
		</div>

		<Sheet.Footer>
			<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Save changes</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
