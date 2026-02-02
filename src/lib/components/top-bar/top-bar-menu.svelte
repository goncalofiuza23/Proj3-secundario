<script lang="ts">
	import Menu from '@lucide/svelte/icons/menu';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import * as Sheet from '../ui/sheet';

	import type { NavigationItem } from '$lib/types/navigation.ts';
	import LanguageSelect from '../language-select/language-select.svelte';
	import { Separator } from '../ui/separator/index.js';

	import { page } from '$app/stores';

	import pt from '$lib/translations/pt.json';
	import en from '$lib/translations/en.json';

	type Lang = 'pt' | 'en';

	const lang = $derived((($page.data as any)?.lang ?? 'pt') as Lang);
	const dict = $derived(lang === 'en' ? en : pt);

	const navigationItems = $derived<NavigationItem[]>([
		{ title: dict.nav.mission, href: '/missao' },
		{ title: dict.nav.contactsSI, href: '/contactos-si' }
	]);

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
						<a class="transition duration-150 hover:text-white" href={item.href}>
							<h4>{item.title}</h4>
						</a>
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

		<button type="button" onclick={() => (mobileMenuOpen = true)} aria-label="Abrir menu">
			<Menu />
		</button>
	</div>
</div>

<Sheet.Root bind:open={mobileMenuOpen}>
	<Sheet.Content side="right" class="w-full">
		<div class="mx-4">
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
	</Sheet.Content>
</Sheet.Root>
