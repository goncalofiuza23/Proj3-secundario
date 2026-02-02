<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import pt from '$lib/translations/pt.json';
	import en from '$lib/translations/en.json';

	type Lang = 'pt' | 'en';

	interface Props {
		lang: Lang;
	}

	let { lang }: Props = $props();

	const dict = $derived(lang === 'en' ? en : pt);
</script>

<footer class="bg-foreground text-background">
	<div class="mx-10 py-10 text-left md:mx-30 lg:mx-60">
		<Separator class="mb-4" />
		<div class="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-start">
			<div>
				<h4 class="mb-4">{dict.footer.contacts}</h4>

				<ul class="space-y-2">
					<li>Serviços Centrais e Presidência</li>
					<li>Rua Escola Industrial e Comercial Nun'Álvares, 34 4900-347 Viana do Castelo</li>
					<li>
						<a href="mailto:geral@ipvc.pt" class="transition-colors hover:text-primary">
							geral@ipvc.pt
						</a>
					</li>
					<li>
						<a href="tel:351258809610" class="transition-colors hover:text-primary">
							+351 258 809 610
						</a>
						|
						<a href="tel:965919650" class="transition-colors hover:text-primary"> +965 919 650 </a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
