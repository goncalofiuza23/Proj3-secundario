<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import BookHeart from '@lucide/svelte/icons/book-heart';
	import MonitorCheck from '@lucide/svelte/icons/monitor-check';
	import Info from '@lucide/svelte/icons/info';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Sugestões, Elogios e Reclamações" bgColor="primary" />

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col bg-white px-6 py-12">
	<div class="flex-grow space-y-12">
		<section>
			<div class="mb-6 border-b border-slate-200 pb-4">
				<h2 class="text-2xl font-bold tracking-wide text-teal-700 uppercase">
					A tua opinião conta
				</h2>
				<p class="mt-2 text-slate-600">
					Ajuda-nos a melhorar os nossos serviços. Podes apresentar sugestões, deixar um elogio ou
					fazer uma reclamação.
				</p>
			</div>

			<div class="rounded-lg border border-teal-100 bg-teal-50/50 p-6">
				<div class="flex items-start gap-4">
					<div
						class="hidden rounded-full border border-teal-100 bg-white p-2 text-teal-600 shadow-sm sm:block"
					>
						<Info class="h-6 w-6" />
					</div>
					<div class="space-y-3">
						<p class="text-lg font-medium text-slate-800">
							Apresenta as tuas sugestões, elogios e reclamações diretamente no portal <span
								class="font-bold text-teal-700">ON.IPVC</span
							>.
						</p>

						<div class="space-y-1">
							<p class="text-xs font-bold tracking-wider text-slate-500 uppercase">
								Caminho no Portal:
							</p>
							<div
								class="inline-flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 font-mono text-sm text-slate-600 shadow-sm"
							>
								<span>Req. Públicos</span>
								<span class="text-slate-300">/</span>
								<span>Gestão e Melhoria do Sistema</span>
								<span class="text-slate-300">/</span>
								<span class="font-bold text-teal-700">Ficha de Ocorrência</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">Links de Acesso</h3>

			<div class="grid gap-6 md:grid-cols-2">
				<a
					href="https://livrodeelogios.com/elogiar/ipvc"
					target="_blank"
					rel="noopener noreferrer"
					class="group relative flex items-center justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-300 hover:shadow-md"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition-colors group-hover:bg-pink-100"
						>
							<BookHeart class="h-6 w-6" />
						</div>
						<div>
							<h4 class="font-bold text-slate-900 transition-colors group-hover:text-pink-600">
								Livro de Elogios Digital
							</h4>
							<p class="text-xs text-slate-500">Plataforma Externa</p>
						</div>
					</div>
					<ExternalLink
						class="h-5 w-5 text-slate-300 transition-colors group-hover:text-pink-400"
					/>
				</a>

				<a
					href="https://on.ipvc.pt/"
					target="_blank"
					rel="noopener noreferrer"
					class="group relative flex items-center justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-400 hover:shadow-md"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-100"
						>
							<MonitorCheck class="h-6 w-6" />
						</div>
						<div>
							<h4 class="font-bold text-slate-900 transition-colors group-hover:text-teal-700">
								ON.IPVC
							</h4>
							<p class="text-xs text-slate-500">Portal Académico</p>
						</div>
					</div>
					<ExternalLink
						class="h-5 w-5 text-slate-300 transition-colors group-hover:text-teal-500"
					/>
				</a>
			</div>
		</section>
	</div>

	<footer class="mt-16 flex justify-end border-t border-gray-100 pt-6 text-xs text-gray-400">
		Atualizado em 2023-01-30 13:41:18
	</footer>
</div>
