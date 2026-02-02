<script lang="ts">
	import { goto } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator/index.js';

	type Lang = 'pt' | 'en';

	type Item = {
		id: number;
		titlePt: string;
		titleEn: string;
		href: string;
	};

	interface Props {
		item: Item;
		lang: Lang;
		variant?: 'default' | 'white';
	}

	let { item, lang, variant = 'default' }: Props = $props();

	function go() {
		const href = item.href.startsWith('/') ? item.href : `/${item.href}`;
		goto(href);
	}

	const base =
		'flex cursor-pointer flex-col items-center justify-center rounded-sm p-4 transition-colors duration-300';

	const bg = variant === 'white' ? 'bg-white hover:bg-gray-100' : 'bg-gray-200 hover:bg-gray-300';
</script>

<button type="button" onclick={go} class={`${base} ${bg}`}>
	<img
		src={`/menu-image/${item.id}`}
		alt={lang === 'en' ? item.titleEn : item.titlePt}
		class="mb-2 h-9 w-9 object-contain"
	/>

	<Separator class="my-4 max-w-28 bg-stone-950" />

	<span class="small text-primary">
		{lang === 'en' ? item.titleEn : item.titlePt}
	</span>
</button>
