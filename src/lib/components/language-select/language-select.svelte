<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import * as DropdownMenu from '../ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	type Lang = 'pt' | 'en';

	async function setLang(lang: Lang) {
		await fetch('/api/lang', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ lang })
		});

		await goto($page.url.pathname + $page.url.search, { invalidateAll: true });
	}

	$: current = (($page.data as any)?.lang ?? 'pt') as Lang;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class="flex cursor-pointer items-center gap-2 transition duration-150 hover:text-white"
				type="button"
			>
				<span>{current.toUpperCase()}</span>
				<ChevronDown size={16} />
			</button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-30" align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={() => setLang('pt')}>PT</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => setLang('en')}>EN</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
