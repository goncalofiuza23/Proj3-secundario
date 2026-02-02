<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import type { PageProps } from './$types.js';
	import MenuItemNav from '$lib/components/menu/menu-item-nav.svelte';

	import pt from '$lib/translations/pt.json';
	import en from '$lib/translations/en.json';

	type Lang = 'pt' | 'en';

	let { data }: PageProps = $props();

	const lang = $derived(((data as any)?.lang ?? 'pt') as Lang);
	const dict = $derived(lang === 'en' ? en : pt);

	const globalItems = $derived((data as any)?.globalItems ?? []);
	const studentItems = $derived((data as any)?.studentItems ?? []);
	const teachersItems = $derived((data as any)?.teachersItems ?? []);
</script>

<TopBarGeneric text={dict.home.globalServices} bgColor="foreground" />

<div class="mx-2 my-10 md:mx-30">
	<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6 lg:grid-cols-9">
		{#each globalItems as item (item.id)}
			<MenuItemNav {item} {lang} />
		{/each}
	</div>
</div>

<div class="grid grid-cols-2">
	<div class="col-span-2 bg-[#E7F2F4] md:col-span-1">
		<TopBarGeneric text={dict.home.studentServices} />

		<div class="mx-2 my-10 md:mx-30">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
				{#each studentItems as item (item.id)}
					<MenuItemNav {item} {lang} variant="white" />
				{/each}
			</div>
		</div>
	</div>

	<div class="col-span-2 md:col-span-1">
		<TopBarGeneric text={dict.home.teacherServices} bgColor="foreground" />

		<div class="mx-2 my-10 md:mx-30">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
				{#each teachersItems as item (item.id)}
					<MenuItemNav {item} {lang} />
				{/each}
			</div>
		</div>
	</div>
</div>
