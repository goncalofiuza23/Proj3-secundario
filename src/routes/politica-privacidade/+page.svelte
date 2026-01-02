<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import FileText from '@lucide/svelte/icons/file-text';
	import Download from '@lucide/svelte/icons/download';
	import User from '@lucide/svelte/icons/user';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Phone from '@lucide/svelte/icons/phone';
	import Printer from '@lucide/svelte/icons/printer'; // Para o Fax
	import Mail from '@lucide/svelte/icons/mail';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Política de Privacidade e Proteção de Dados" bgColor="primary" />

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col bg-white px-6 py-12">
	<div class="flex-grow space-y-12">
		<section>
			<div class="mb-6 border-b border-slate-200 pb-4">
				<h2 class="text-2xl font-bold tracking-wide text-teal-700 uppercase">
					Política de Privacidade
				</h2>
				<p class="mt-2 text-slate-600">
					Consulte o documento oficial relativo à política de privacidade e proteção de dados da
					instituição.
				</p>
			</div>

			<a
				href="https://www.ipvc.pt/wp-content/uploads/2024/11/R2.1.1_R2.1.2_IPVC_Politica-de-Privacidade_Alteracoes-V1.2_signed_.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-0.5 hover:border-teal-400 hover:shadow-md"
			>
				<div class="flex items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-teal-600 shadow-sm group-hover:text-teal-800"
					>
						<FileText class="h-6 w-6" />
					</div>
					<div>
						<h3 class="font-bold text-slate-900 group-hover:text-teal-800">
							Política de Privacidade e Proteção de Dados | 2023
						</h3>
						<p class="text-xs text-slate-500">PDF - Clique para descarregar</p>
					</div>
				</div>
				<div class="text-slate-400 transition-colors group-hover:text-teal-600">
					<Download class="h-6 w-6" />
				</div>
			</a>
		</section>

		<section>
			<div class="mb-6 border-b border-slate-200 pb-4">
				<h2 class="text-xl font-bold tracking-wide text-teal-700 uppercase">
					Encarregado de Proteção de Dados (DPO)
				</h2>
			</div>

			<div class="grid gap-8 lg:grid-cols-3">
				<div class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
					<div class="mb-6 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700"
						>
							<User class="h-5 w-5" />
						</div>
						<h3 class="text-lg font-bold text-slate-900">Engenheiro Luís Barreto</h3>
					</div>

					<div class="space-y-6 text-sm text-slate-600">
						<div class="flex gap-3">
							<MapPin class="h-5 w-5 flex-shrink-0 text-slate-400" />
							<div>
								<p class="font-semibold text-slate-900">
									Instituto Politécnico de Viana do Castelo
								</p>
								<p>Rua Escola Industrial e Comercial de Nun’Álvares, n.º 34</p>
								<p>4900-347 Viana do Castelo</p>
							</div>
						</div>

						<div class="h-px w-full bg-slate-100"></div>

						<div class="flex flex-col gap-4 sm:flex-row sm:gap-12">
							<div class="flex items-center gap-3">
								<Phone class="h-4 w-4 text-slate-400" />
								<p><span class="font-semibold text-slate-900">Tel:</span> +351 258 809 610</p>
							</div>
							<div class="flex items-center gap-3">
								<Printer class="h-4 w-4 text-slate-400" />
								<p><span class="font-semibold text-slate-900">Fax:</span> +351 258 829 065</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<Mail class="h-4 w-4 text-slate-400" />
							<a
								href="mailto:dpo@ipvc.pt"
								class="font-bold text-teal-600 hover:text-teal-800 hover:underline"
							>
								dpo@ipvc.pt
							</a>
						</div>
					</div>
				</div>

				<div
					class="flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-50 p-6"
				>
					<h4 class="mb-4 text-sm font-bold tracking-wider text-slate-500 uppercase">Documento</h4>

					<a
						href="https://www.ipvc.pt/wp-content/uploads/2021/02/Despacho_IPVC_P_10_2023_Designacao-DPO_signed.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex flex-col gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-teal-300 hover:shadow-md"
					>
						<div class="flex items-start justify-between">
							<FileText class="h-8 w-8 text-teal-600 transition-transform group-hover:scale-110" />
							<Download class="h-4 w-4 text-slate-300 group-hover:text-teal-600" />
						</div>
						<div>
							<p class="leading-tight font-bold text-slate-900 group-hover:text-teal-700">
								Nomeação Encarregado
							</p>
							<p class="mt-1 text-xs text-slate-400">Despacho Oficial</p>
						</div>
					</a>
				</div>
			</div>
		</section>
	</div>

	<footer class="mt-16 flex justify-end border-t border-gray-100 pt-6 text-xs text-gray-400">
		Atualizado em 05/11/2024
	</footer>
</div>
