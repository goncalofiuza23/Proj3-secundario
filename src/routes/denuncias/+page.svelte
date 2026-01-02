<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import Megaphone from '@lucide/svelte/icons/megaphone';
	import FileText from '@lucide/svelte/icons/file-text';
	import Download from '@lucide/svelte/icons/download';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import ShieldAlert from '@lucide/svelte/icons/shield-alert';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Denúncias" bgColor="primary" />

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col bg-white px-6 py-12">
	<div class="flex-grow space-y-12">
		<section>
			<div class="mb-6 border-b border-slate-200 pb-4">
				<h2 class="text-2xl font-bold tracking-wide text-primary uppercase">Canal de Denúncias</h2>
				<p class="mt-2 text-slate-600">
					Plataforma oficial para apresentação de denúncias de infrações.
				</p>
			</div>

			<div class="rounded-xl border border-teal-100 bg-teal-50/50 p-8 shadow-sm">
				<div class="flex flex-col items-start gap-6 md:flex-row md:items-center">
					<div
						class="hidden h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-600 shadow-sm md:flex"
					>
						<Megaphone class="h-8 w-8" />
					</div>

					<div class="flex-grow space-y-3">
						<h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
							<span class="md:hidden"><Megaphone class="h-5 w-5 text-teal-600" /></span>
							Apresentar Denúncia
						</h3>
						<p class="leading-relaxed text-slate-700">
							Para formalizar a sua denúncia, utilize o formulário oficial disponível na plataforma
							ON.IPVC. O processo garante a confidencialidade e segue os procedimentos legais em
							vigor.
						</p>
					</div>

					<div class="mt-4 w-full flex-shrink-0 md:mt-0 md:w-auto">
						<a
							href="https://on.ipvc.pt/v1/form_default.php?seccao=2&doc=385&doc_form=generico.php"
							target="_blank"
							rel="noopener noreferrer"
							class="group flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg md:w-auto"
						>
							Aceder ao Formulário
							<ExternalLink class="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</a>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
				<ShieldAlert class="h-5 w-5 text-teal-600" />
				Documentos Normativos
			</h3>

			<div class="grid gap-6 md:grid-cols-2">
				<a
					href="https://www.ipvc.pt/wp-content/uploads/2023/04/Procedimento_DENUNCIAS_IPVC_vrs06-1.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-400 hover:shadow-md"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-teal-600 group-hover:bg-teal-50 group-hover:text-teal-800"
						>
							<FileText class="h-6 w-6" />
						</div>
						<div>
							<h4 class="font-bold text-slate-900 transition-colors group-hover:text-teal-700">
								Procedimento de Denúncias
							</h4>
							<p class="text-xs text-slate-500">Versão: 31/01/2023 | PDF</p>
						</div>
					</div>
					<Download class="h-5 w-5 text-slate-300 transition-colors group-hover:text-teal-600" />
				</a>
			</div>
		</section>
	</div>

	<footer class="mt-16 flex justify-end border-t border-gray-100 pt-6 text-xs text-gray-400">
		Atualizado em 2023-01-30 13:41:18
	</footer>
</div>
