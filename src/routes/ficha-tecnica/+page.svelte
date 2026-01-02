<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';

	// Ícones para ilustrar as secções
	import Users from '@lucide/svelte/icons/users';
	import Code from '@lucide/svelte/icons/code';
	import Palette from '@lucide/svelte/icons/palette';
	import Globe from '@lucide/svelte/icons/globe';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Mail from '@lucide/svelte/icons/mail';
	import Building from '@lucide/svelte/icons/building-2';
	import Languages from '@lucide/svelte/icons/languages';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Ficha Técnica" bgColor="primary" />

<div class="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-12">
	<div class="flex-grow space-y-12">
		<div class="border-b border-slate-200 pb-4">
			<h2 class="text-2xl font-bold tracking-wide text-primary uppercase">
				Ficha Técnica do Portal
			</h2>
			<p class="mt-2 text-slate-600">
				Informações sobre a equipa, tecnologias e entidades envolvidas no desenvolvimento do portal.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			<div
				class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
			>
				<h4
					class="mb-6 flex items-center gap-2 border-b border-slate-100 pb-2 text-sm font-bold tracking-wider text-primary uppercase"
				>
					<Users class="h-4 w-4" /> Coordenação e Equipa
				</h4>

				<div class="space-y-6">
					<div class="flex gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-primary"
						>
							<Building class="h-5 w-5" />
						</div>
						<div>
							<p class="text-xs font-bold text-slate-400 uppercase">Suporte Técnico</p>
							<p class="font-medium text-slate-900">Instituto Politécnico de Viana do Castelo</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-primary"
						>
							<Users class="h-5 w-5" />
						</div>
						<div>
							<p class="text-xs font-bold text-slate-400 uppercase">Coordenação Institucional</p>
							<p class="font-medium text-slate-900">Ana Paula Vale</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-primary"
						>
							<Code class="h-5 w-5" />
						</div>
						<div>
							<p class="text-xs font-bold text-slate-400 uppercase">Coordenação Técnica</p>
							<p class="font-medium text-slate-900">
								Jorge Esparteiro Garcia <span class="text-sm font-normal text-slate-400"
									>– ESCE</span
								>
							</p>
						</div>
					</div>

					<div class="rounded-lg border border-slate-100 bg-slate-50 p-4">
						<p class="mb-3 text-xs font-bold text-slate-400 uppercase">Colaboradores (GCI)</p>
						<ul class="grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-2">
							<li class="flex items-center gap-2">
								<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
								 Susana Caravana
							</li>
							<li class="flex items-center gap-2">
								<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
								 Olga Pereira Costa
							</li>
							<li class="flex items-center gap-2">
								<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
								 Pedro Miguel Sousa
							</li>
							<li class="flex items-center gap-2">
								<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
								 José Rocha
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div
				class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
			>
				<h4
					class="mb-6 flex items-center gap-2 border-b border-slate-100 pb-2 text-sm font-bold tracking-wider text-primary uppercase"
				>
					<Globe class="h-4 w-4" /> Gestores de Conteúdos (UO)
				</h4>

				<ul class="space-y-4">
					<li class="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
						<span class="text-slate-700">Cristina Fernandes / João Pereira</span>
						<span class="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">ESE</span>
					</li>
					<li class="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
						<span class="text-slate-700">Ofélia Brito</span>
						<span class="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">ESA</span>
					</li>
					<li class="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
						<span class="text-slate-700">José Mário Rodrigues</span>
						<span class="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">ESTG</span>
					</li>
					<li class="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
						<span class="text-slate-700">Luís Carrilho</span>
						<span class="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">ESCE</span>
					</li>
					<li class="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
						<span class="text-slate-700">Pedro Araújo</span>
						<span class="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">ESS</span>
					</li>
					<li class="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
						<span class="text-slate-700">Tiago Araújo</span>
						<span class="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">ESDL</span>
					</li>
				</ul>
			</div>

			<div
				class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md lg:col-span-2"
			>
				<h4
					class="mb-6 flex items-center gap-2 border-b border-slate-100 pb-2 text-sm font-bold tracking-wider text-primary uppercase"
				>
					<Monitor class="h-4 w-4" /> Desenvolvimento e Tecnologia
				</h4>

				<div class="grid gap-8 md:grid-cols-3">
					<div class="space-y-6">
						<div>
							<div class="mb-1 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
								<Languages class="h-3 w-3" /> Tradução
							</div>
							<a
								href="https://www.janeladaspalavras.com"
								target="_blank"
								class="font-medium text-primary hover:underline"
							>
								Janela das palavras
							</a>
						</div>
						<div>
							<div class="mb-1 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
								<Palette class="h-3 w-3" /> Design e Desenvolvimento
							</div>
							<a
								href="https://skillmind.pt/"
								target="_blank"
								class="font-medium text-primary hover:underline"
							>
								Skillmind
							</a>
						</div>
					</div>

					<div>
						<div class="mb-2 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
							<Code class="h-3 w-3" /> Stack Tecnológica
						</div>
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
								>HTML5</span
							>
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
								>CSS3</span
							>
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
								>JavaScript</span
							>
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
								>SvelteKit</span
							>
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
								>Tailwind</span
							>
						</div>
					</div>

					<div>
						<div class="mb-2 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
							<Monitor class="h-3 w-3" /> Compatibilidade
						</div>
						<p class="text-sm leading-relaxed text-slate-600">
							Otimizado para navegadores modernos (Edge, Firefox, Safari, Chrome). Totalmente
							adaptável a dispositivos móveis e tablets.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="flex justify-center pt-4">
			<a
				href="mailto:geral@ipvc.pt"
				class="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg"
			>
				<Mail class="h-5 w-5 transition-transform group-hover:scale-110" />
				Contactar Geral: geral@ipvc.pt
			</a>
		</div>
	</div>

	<footer class="mt-16 flex justify-end border-t border-gray-100 pt-6 text-xs text-gray-400">
		Atualizado em 2025-01-20 11:44:43
	</footer>
</div>
