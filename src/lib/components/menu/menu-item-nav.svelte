<script lang="ts">
	import { goto } from '$app/navigation';
	import type { MenuItem } from '$lib/types/items.js';
	import { Separator } from '../ui/separator/index.js';

	interface Props {
		item: MenuItem;
	}

	let { item }: Props = $props();
</script>

<button
	onclick={() => goto(item.href)}
	class="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4"
>
	<item.icon size={32} class="mb-2 text-primary" />
	<Separator class="my-4 max-w-28 bg-stone-950" />
	<span class="small text-primary">{item.name}</span>
</button>
