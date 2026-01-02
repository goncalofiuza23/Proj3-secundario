<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import Mail from '@lucide/svelte/icons/mail';
	import Phone from '@lucide/svelte/icons/phone';
	import Building from '@lucide/svelte/icons/building-2';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Contactos SI - Unidades Orgânicas" bgColor="primary" />

<section class="mx-auto flex min-h-screen w-full max-w-7xl flex-col space-y-12 px-4 py-12">
	<div class="border-b border-slate-200 pb-4">
		<h2 class="text-2xl font-bold tracking-wide text-primary uppercase">
			Colaboradores das Unidades Orgânicas
		</h2>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<div
			class="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
		>
			<div>
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<span
						class="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase"
					>
						<Building class="h-4 w-4" /> ESE
					</span>
					<span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600"
						>Ext: 21112</span
					>
				</div>
				<div class="mb-4">
					<p class="font-bold text-slate-900">João Pereira</p>
					<p class="text-xs text-slate-500">Técnico de Informática</p>
				</div>
			</div>
			<a
				href="mailto:si@ese.ipvc.pt"
				class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary hover:underline"
			>
				<Mail class="h-4 w-4" /> si@ese.ipvc.pt
			</a>
		</div>

		<div
			class="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
		>
			<div>
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<span
						class="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase"
					>
						<Building class="h-4 w-4" /> ESA
					</span>
					<span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600"
						>Ext: 22142</span
					>
				</div>
				<div class="mb-4">
					<p class="font-bold text-slate-900">Luís Armando</p>
					<p class="text-xs text-slate-500">Técnico de Informática</p>
				</div>
			</div>
			<a
				href="mailto:ci@esa.ipvc.pt"
				class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary hover:underline"
			>
				<Mail class="h-4 w-4" /> ci@esa.ipvc.pt
			</a>
		</div>

		<div
			class="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
		>
			<div>
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<span
						class="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase"
					>
						<Building class="h-4 w-4" /> ESTG
					</span>
					<span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600"
						>Ext: 23174</span
					>
				</div>
				<div class="mb-4 space-y-1">
					<div>
						<p class="font-bold text-slate-900">Paulo Vaz</p>
					</div>
					<div>
						<p class="font-bold text-slate-900">João Vasconcelos</p>
					</div>
					<p class="pt-1 text-xs text-slate-500">Equipa de Informática</p>
				</div>
			</div>
			<a
				href="mailto:si@estg.ipvc.pt"
				class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary hover:underline"
			>
				<Mail class="h-4 w-4" /> si@estg.ipvc.pt
			</a>
		</div>

		<div
			class="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
		>
			<div>
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<span
						class="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase"
					>
						<Building class="h-4 w-4" /> ESS
					</span>
					<span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600"
						>Ext: 24118</span
					>
				</div>
				<div class="mb-4">
					<p class="font-bold text-slate-900">João Pedro Pereira</p>
					<p class="text-xs text-slate-500">Técnico de Informática</p>
				</div>
			</div>
			<a
				href="mailto:si@ess.ipvc.pt"
				class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary hover:underline"
			>
				<Mail class="h-4 w-4" /> si@ess.ipvc.pt
			</a>
		</div>

		<div
			class="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
		>
			<div>
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<span
						class="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase"
					>
						<Building class="h-4 w-4" /> ESCE
					</span>
					<span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600"
						>Ext: 25105</span
					>
				</div>
				<div class="mb-4">
					<p class="font-bold text-slate-900">Luís Carrilho</p>
					<p class="text-xs text-slate-500">Técnico de Informática</p>
				</div>
			</div>
			<a
				href="mailto:si@esce.ipvc.pt"
				class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary hover:underline"
			>
				<Mail class="h-4 w-4" /> si@esce.ipvc.pt
			</a>
		</div>

		<div
			class="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
		>
			<div>
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<span
						class="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase"
					>
						<Building class="h-4 w-4" /> ESDL
					</span>
					<span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600"
						>Ext: 29126</span
					>
				</div>
				<div class="mb-4">
					<p class="font-bold text-slate-900">Tiago Araújo</p>
					<p class="text-xs text-slate-500">Técnico de Informática</p>
				</div>
			</div>
			<a
				href="mailto:si@esdl.ipvc.pt"
				class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary hover:underline"
			>
				<Mail class="h-4 w-4" /> si@esdl.ipvc.pt
			</a>
		</div>

		<div
			class="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
		>
			<div>
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
					<span
						class="flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase"
					>
						<Building class="h-4 w-4" /> SAS
					</span>
					<span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600"
						>Ext: 27112</span
					>
				</div>
				<div class="mb-4">
					<p class="font-bold text-slate-900">Rui Carneiro</p>
					<p class="text-xs text-slate-500">Técnico de Informática</p>
				</div>
			</div>
			<a
				href="mailto:ci@sas.ipvc.pt"
				class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary hover:underline"
			>
				<Mail class="h-4 w-4" /> ci@sas.ipvc.pt
			</a>
		</div>
	</div>
</section>
