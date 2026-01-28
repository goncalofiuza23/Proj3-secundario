<!-- <script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import type { MenuItem } from '$lib/types/items.js';
	import ArrowDownToLine from '@lucide/svelte/icons/arrow-down-to-line';
	import type { PageProps } from './$types.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import MenuItemNav from '$lib/components/menu/menu-item-nav.svelte';

	let { data }: PageProps = $props();

	let { globalItems, studentItems, teachersItems } = data;
</script>

<TopBarGeneric text="Serviços Globais" bgColor="foreground" />

<div class="mx-2 my-10 md:mx-30">
	<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6 lg:grid-cols-9">
		{#each globalItems as item, index (index)}
			<MenuItemNav {item} />
		{/each}
	</div>
</div>

<div class="grid grid-cols-2">
	<div class="col-span-2 bg-[#E7F2F4] md:col-span-1">
		<TopBarGeneric text="Serviços para Alunos" />
		<div class="mx-2 my-10 md:mx-30">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
				{#each studentItems as item, index (index)}
					<MenuItemNav {item} />
				{/each}
			</div>
		</div>
	</div>
	<div class="col-span-2 md:col-span-1">
		<TopBarGeneric text="Serviços para Docentes" bgColor="foreground" />
		<div class="mx-2 my-10 md:mx-30">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
				{#each teachersItems as item, index (index)}
					<MenuItemNav {item} />
				{/each}
			</div>
		</div>
	</div>
</div> -->

<!-- src/routes/+page.svelte -->
<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import type { PageProps } from './$types.js';
	import MenuItemNav from '$lib/components/menu/menu-item-nav.svelte';

	let { data }: PageProps = $props();
	let { globalItems, studentItems, teachersItems } = data;
</script>

<TopBarGeneric text="Serviços Globais" bgColor="foreground" />

<div class="mx-2 my-10 md:mx-30">
	<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6 lg:grid-cols-9">
		{#each globalItems as item (item.id)}
			<MenuItemNav {item} />
		{/each}
	</div>
</div>

<div class="grid grid-cols-2">
	<div class="col-span-2 bg-[#E7F2F4] md:col-span-1">
		<TopBarGeneric text="Serviços para Alunos" />
		<div class="mx-2 my-10 md:mx-30">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
				{#each studentItems as item (item.id)}
					<MenuItemNav {item} />
				{/each}
			</div>
		</div>
	</div>

	<div class="col-span-2 md:col-span-1">
		<TopBarGeneric text="Serviços para Docentes" bgColor="foreground" />
		<div class="mx-2 my-10 md:mx-30">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
				{#each teachersItems as item (item.id)}
					<MenuItemNav {item} />
				{/each}
			</div>
		</div>
	</div>
</div>
