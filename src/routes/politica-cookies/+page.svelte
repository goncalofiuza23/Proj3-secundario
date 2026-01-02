<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';

	// Ícones para ilustrar o conteúdo
	import Cookie from '@lucide/svelte/icons/cookie';
	import Settings from '@lucide/svelte/icons/settings';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Info from '@lucide/svelte/icons/info';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Política de Cookies" bgColor="primary" />

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-12">
	<div class="flex-grow space-y-10">
		<div class="border-b border-slate-200 pb-4">
			<h2 class="text-2xl font-bold tracking-wide text-primary uppercase">Utilização de Cookies</h2>
			<p class="mt-2 text-slate-600">
				Informações sobre como recolhemos e utilizamos dados de navegação para melhorar a sua
				experiência.
			</p>
		</div>

		<div class="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
			<div class="mb-6 flex items-start gap-4">
				<div
					class="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-primary sm:flex"
				>
					<Cookie class="h-6 w-6" />
				</div>
				<div class="space-y-4 leading-relaxed text-slate-700">
					<h3
						class="flex items-center gap-2 text-lg font-bold tracking-wider text-primary uppercase"
					>
						<span class="sm:hidden"><Cookie class="h-5 w-5" /></span>
						O que são cookies?
					</h3>
					<p>
						Neste website, são utilizados cookies de sessão, apenas para analisar padrões de tráfego
						na web ou para permitir identificar problemas e fornecer uma melhor experiência de
						navegação.
					</p>
				</div>
			</div>

			<hr class="my-6 border-slate-100" />

			<div class="flex items-start gap-4">
				<div
					class="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 sm:flex"
				>
					<Settings class="h-6 w-6" />
				</div>
				<div class="space-y-4 leading-relaxed text-slate-700">
					<h3
						class="flex items-center gap-2 text-lg font-bold tracking-wider text-primary uppercase"
					>
						<span class="sm:hidden"><Settings class="h-5 w-5" /></span>
						Gestão de Cookies no Browser
					</h3>
					<p>
						Todos os browsers permitem ao utilizador aceitar, recusar ou apagar cookies,
						nomeadamente através da seleção das definições apropriadas no respetivo navegador. Os
						cookies poderão ser configurados no menu “opções” ou “preferências” do browser do
						utilizador.
					</p>

					<div
						class="mt-4 flex gap-3 rounded-md border border-yellow-100 bg-yellow-50 p-4 text-sm text-yellow-800"
					>
						<Info class="h-5 w-5 flex-shrink-0" />
						<p>
							<strong>Nota importante:</strong> Ao desativar cookies, o utilizador poderá impedir que
							alguns serviços da web funcionem corretamente, afetando, parcial ou totalmente, a navegação
							no website.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="rounded-lg border border-teal-200 bg-teal-50/50 p-8 shadow-sm">
			<div class="flex flex-col items-start gap-6 sm:flex-row">
				<div
					class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-primary shadow-sm"
				>
					<ShieldCheck class="h-6 w-6" />
				</div>
				<div class="space-y-3">
					<h3 class="text-lg font-bold tracking-wider text-primary uppercase">
						Aceitação destes termos
					</h3>
					<p class="leading-relaxed text-slate-700">
						Ao ter aceite voluntariamente e expressamente no nosso sítio a política de cookies,
						concordou com a recolha e uso das suas informações tal como estabelecido nesta Política
						de Cookies.
					</p>
				</div>
			</div>
		</div>
	</div>

	<footer class="mt-16 flex justify-end border-t border-gray-100 pt-6 text-xs text-gray-400">
		Atualizado em 2022-02-25 12:37:44
	</footer>
</div>
