<script lang="ts">
	import TopBarBackoffice from '$lib/components/top-bar/top-bar-backoffice.svelte';

	let { children } = $props();
</script>

<header>
	<TopBarBackoffice />
</header>
<div class="mx-16 my-8">
	{@render children()}
</div>
