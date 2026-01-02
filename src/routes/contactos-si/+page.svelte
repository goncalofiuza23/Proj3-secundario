<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import User from '@lucide/svelte/icons/user';
	import Mail from '@lucide/svelte/icons/mail';
	import Phone from '@lucide/svelte/icons/phone';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Globe from '@lucide/svelte/icons/globe';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Contactos Sistemas Informáticos" bgColor="primary" />

<section class="mx-auto flex min-h-screen w-full max-w-7xl flex-col space-y-12 px-4 py-12">
	<div class="border-b border-slate-200 pb-4">
		<h2 class="text-2xl font-bold tracking-wide text-primary uppercase">
			Colaboradores e Contactos
		</h2>
	</div>

	<div class="grid gap-8 lg:grid-cols-3">
		<div
			class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
		>
			<h4
				class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 text-sm font-bold tracking-wider text-primary uppercase"
			>
				Área do Desenvolvimento
			</h4>
			<ul class="space-y-3">
				<li class="flex items-center gap-3 text-slate-700">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400"
					>
						<User class="h-4 w-4" />
					</div>
					<span class="font-medium text-slate-900">José Viana</span>
				</li>
			</ul>
		</div>

		<div
			class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md lg:col-span-2"
		>
			<h4
				class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 text-sm font-bold tracking-wider text-primary uppercase"
			>
				Área de Infraestruturas e Serviços
			</h4>

			<ul class="grid gap-x-8 gap-y-4 sm:grid-cols-2">
				<li class="flex items-center gap-3 text-slate-700">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400"
					>
						<User class="h-4 w-4" />
					</div>
					<span class="font-medium text-slate-900">Duarte Silva</span>
				</li>
				<li class="flex items-center gap-3 text-slate-700">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400"
					>
						<User class="h-4 w-4" />
					</div>
					<span class="font-medium text-slate-900">Pedro Barbosa</span>
				</li>
				<li class="flex items-center gap-3 text-slate-700">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400"
					>
						<User class="h-4 w-4" />
					</div>
					<span class="font-medium text-slate-900">Filipe Miranda</span>
				</li>
				<li class="flex items-center gap-3 text-slate-700">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400"
					>
						<User class="h-4 w-4" />
					</div>
					<span class="font-medium text-slate-900">Hélder Jacques</span>
				</li>
				<li class="flex items-center gap-3 text-slate-700">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400"
					>
						<User class="h-4 w-4" />
					</div>
					<span class="font-medium text-slate-900">Hélder Cruz</span>
				</li>
				<li class="flex items-center gap-3 text-slate-700">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400"
					>
						<User class="h-4 w-4" />
					</div>
					<span class="font-medium text-slate-900">Henrique Silva</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-8">
		<div
			class="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left"
		>
			<div class="flex flex-col gap-2">
				<div
					class="flex items-center justify-center gap-2 text-sm font-bold tracking-wider text-primary uppercase md:justify-start"
				>
					<MapPin class="h-4 w-4" /> Morada
				</div>
				<p class="text-sm leading-relaxed text-slate-600">
					Rua Escola Industrial e Comercial de Nun’Álvares n.º 34<br />
					4900-367 Viana do Castelo
				</p>
			</div>

			<div class="hidden h-12 w-px bg-slate-300 md:block"></div>

			<div class="flex flex-col gap-2">
				<div
					class="flex items-center justify-center gap-2 text-sm font-bold tracking-wider text-primary uppercase md:justify-start"
				>
					<Phone class="h-4 w-4" /> Contactos
				</div>
				<div class="space-y-1 text-sm text-slate-600">
					<p>
						<span class="font-semibold text-slate-900">Tel:</span> +351 258 809 610
					</p>
					<p class="flex items-center justify-center gap-1 md:justify-start">
						<span class="font-semibold text-slate-900">Site:</span>
						<a
							href="http://www.ipvc.pt/"
							target="_blank"
							class="flex items-center gap-1 text-teal-600 hover:underline"
						>
							www.ipvc.pt <Globe class="h-3 w-3" />
						</a>
					</p>
				</div>
			</div>

			<div class="hidden h-12 w-px bg-slate-300 md:block"></div>

			<div>
				<a
					href="mailto:si@ipvc.pt"
					class="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg"
				>
					<Mail class="h-5 w-5 transition-transform group-hover:scale-110" />
					si@ipvc.pt
				</a>
			</div>
		</div>
	</div>
</section>
