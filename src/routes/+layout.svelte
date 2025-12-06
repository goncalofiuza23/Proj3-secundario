<script lang="ts">
	import TopBarUtilities from '$lib/components/top-bar/top-bar-utilities.svelte';
	import TopBarMenu from '$lib/components/top-bar/top-bar-menu.svelte';

	import '../app.css';
	import Footer from '$lib/components/footer/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
</svelte:head>

<header>
	<TopBarUtilities />
	<TopBarMenu />
</header>

{@render children()}

<Footer />
