<script lang="ts">
	import CircleUser from '@lucide/svelte/icons/circle-user';
	import Menu from '@lucide/svelte/icons/menu';

	import type { NavigationItem } from '$lib/types/navigation.ts';
	import { buttonVariants } from '../ui/button/button.svelte';
	import LanguageSelect from '../language-select/language-select.svelte';
	import { Separator } from '../ui/separator/index.js';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import * as Sheet from '../ui/sheet';

	const navigationItems: NavigationItem[] = [
		{ title: 'Missão', href: '/missao' },
		{ title: 'Contactos Si', href: '/contactos-si' }
	];

	let mobileMenuOpen = $state(false);
</script>

<div class="hidden lg:block">
	<div class="grid grid-cols-3" aria-label="main navigation">
		<div class="col-span-3 bg-white px-6 py-4 lg:col-span-1">
			<a href="/" aria-label="Ir para a página inicial">
				<img src="/logo.png" alt="Logótipo da Escola" class="h-20 w-auto object-contain" />
			</a>
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
					<LanguageSelect />
				</div>
			</div>
		</div>
	</div>
</div>

<div class="block lg:hidden">
	<div class="flex items-center justify-between bg-white px-10 py-10" aria-label="main navigation">
		<a href="/" aria-label="Ir para a página inicial">
			<img src="/logo.png" alt="Logótipo da Escola" class="h-20 w-auto object-contain" />
		</a>
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
						<a
							href="/log-in"
							class="flex cursor-pointer gap-2 transition duration-150 hover:text-white"
						>
							<CircleUser /> Log In
						</a>
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
						<h4>{item.title}</h4>

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
