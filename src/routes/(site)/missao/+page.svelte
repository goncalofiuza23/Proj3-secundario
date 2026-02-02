<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import type { PageProps } from './$types.js';

	import pt from '$lib/translations/pt.json';
	import en from '$lib/translations/en.json';

	type Lang = 'pt' | 'en';

	let { data }: PageProps = $props();

	const lang = $derived(((data as any)?.lang ?? 'pt') as Lang);
	const dict = $derived(lang === 'en' ? en : pt);
</script>

<TopBarGeneric text={dict.mission.title} bgColor="foreground" />

<div class="mx-auto max-w-5xl px-4 py-10">
	<div class="space-y-5 leading-relaxed">
		<p>{dict.mission.p1}</p>
		<p>{dict.mission.p2}</p>
		<p>{dict.mission.p3}</p>
	</div>
</div>
