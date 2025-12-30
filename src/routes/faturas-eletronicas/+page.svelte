<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import StepCard from '$lib/components/info/stepCard.svelte';
</script>

<TopBarGeneric text="Serviços para Alunos" bgColor="primary" />
<TopBarClass text="Faturas Eletrónicas" bgColor="foreground" />

<section class="mx-auto w-full max-w-6xl px-4 py-10 lg:py-14">
	<header class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
		<div class="max-w-3xl">
			<p class="font-semibold tracking-wide text-primary">APRESENTAÇÃO</p>

			<p class="mt-3 leading-relaxed text-slate-700">
				O Instituto Politécnico de Viana do Castelo disponibiliza acesso ao serviço de Faturas
				Eletrónicas a todos os seus alunos.
			</p>

			<p class="mt-2 leading-relaxed text-slate-700">
				Desde o dia 1 de fevereiro de 2014 as faturas relacionadas com propinas e emolumentos de
				caráter académico serão emitidas em formato eletrónico, podendo ser obtidas em qualquer
				altura no site
				<a
					href="https://academicos.ipvc.pt"
					target="_blank"
					rel="noopener noreferrer"
					class="font-bold text-teal-700 underline"
				>
					https://academicos.ipvc.pt
				</a>, na área pessoal de cada aluno.
			</p>
		</div>

		<div class="hidden justify-self-end lg:block">
			<img
				src="/faturas_eletronicas/simbolo.png"
				alt="Símbolo"
				class="h-40 w-40 object-contain"
				loading="lazy"
			/>
		</div>
	</header>

	<div class="mt-10 space-y-10">
		<h2 class="text-base font-semibold text-slate-900">Manual do Utilizador</h2>

		<StepCard
			step="PASSO 1"
			imageSrc="/faturas_eletronicas/passo1.jpg"
			imageAlt="Screenshot PASSO 1"
		>
			Aceder ao portal
			<a
				href="https://academicos.ipvc.pt"
				target="_blank"
				rel="noopener noreferrer"
				class="font-bold text-teal-700 underline"
			>
				https://academicos.ipvc.pt
			</a>, autenticar na área pessoal.
		</StepCard>

		<StepCard
			step="PASSO 2"
			imageSrc="/faturas_eletronicas/passo2.jpg"
			imageAlt="Screenshot PASSO 2"
		>
			Menu <span class="font-semibold">“Tesouraria”</span> →{' '}
			<span class="font-semibold">“Documentos de Facturação”</span>.
		</StepCard>

		<StepCard
			step="PASSO 3"
			imageSrc="/faturas_eletronicas/passo3.jpg"
			imageAlt="Screenshot PASSO 3"
		>
			Pesquisar.
		</StepCard>

		<StepCard
			step="PASSO 4"
			imageSrc="/faturas_eletronicas/passo4.jpg"
			imageAlt="Screenshot PASSO 4"
		>
			Obter todos os documentos da lista.
		</StepCard>

		<StepCard
			step="PASSO 5"
			imageSrc="/faturas_eletronicas/passo5.jpg"
			imageAlt="Screenshot PASSO 5"
		>
			Aguarde a preparação dos documentos.
		</StepCard>

		<StepCard
			step="PASSO 6"
			imageSrc="/faturas_eletronicas/passo6.jpg"
			imageAlt="Screenshot PASSO 6"
		>
			Guardar os documentos.
		</StepCard>
	</div>
</section>
