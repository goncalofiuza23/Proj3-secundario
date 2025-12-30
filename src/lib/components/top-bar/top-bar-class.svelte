<script lang="ts">
	interface Props {
		bgColor?: 'primary' | 'foreground';
		text: string;
	}

	let { bgColor = 'primary', text }: Props = $props();

	const bgClassColor = `bg-${bgColor}`;
</script>

<div class={bgClassColor}>
	<h3 class="ml-20 py-2 text-background">{text}</h3>
</div>
