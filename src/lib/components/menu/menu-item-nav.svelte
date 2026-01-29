<script lang="ts">
	import { goto } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator/index.js';

	type Item = {
		id: number;
		titlePt: string;
		titleEn: string;
		href: string;
	};

	interface Props {
		item: Item;
	}

	let { item }: Props = $props();

	function go() {
		const href = item.href.startsWith('/') ? item.href : `/${item.href}`;
		goto(href);
	}
</script>

<button
	type="button"
	onclick={go}
	class="flex cursor-pointer flex-col items-center justify-center rounded-sm bg-gray-200 p-4 transition-colors duration-300 hover:bg-gray-300"
>
	<img src={`/menu-image/${item.id}`} alt={item.titlePt} class="mb-2 h-9 w-9 object-contain" />

	<Separator class="my-4 max-w-28 bg-stone-950" />

	<span class="small text-primary">{item.titlePt}</span>
</button>
