<script lang="ts">
	import type { LayoutProps } from './$types';
	import TopBarMenu from '$lib/components/top-bar/top-bar-menu.svelte';
	import Footer from '$lib/components/footer/footer.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<header>
		<TopBarMenu />
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer lang={data.lang} />
</div>
