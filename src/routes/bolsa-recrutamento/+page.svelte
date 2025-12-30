<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import StepCard from '$lib/components/info/stepCard.svelte';
</script>

<TopBarGeneric text="Serviços Globais" bgColor="foreground" />
<TopBarClass text="Bolsa de Recrutamento" bgColor="primary" />

<section class="mx-auto w-full max-w-7xl py-12 lg:py-16">
	<header class="grid gap-10 lg:grid-cols-12 lg:items-start">
		<div class="lg:col-span-8">
			<h2 class="mt-0 text-base font-bold tracking-wide text-teal-700 uppercase">Descrição</h2>

			<div class="mt-4 space-y-4 text-justify text-base leading-relaxed text-slate-700">
				<p>
					A Bolsa de Recrutamento do IPVC é um novo mecanismo de contratação de pessoal docente que
					visa aumentar a transparência, a equidade e oportunidade na seleção de todos os que
					pretendem colaborar com este Instituto. Este mecanismo está sempre disponível e em
					qualquer altura, qualquer pessoa, pode registar-se e definir as áreas onde tem formação,
					experiência e competência para lecionar.
				</p>

				<p>
					Esta ferramenta funciona por compatibilização de preferências dos candidatos com as
					propostas de recrutamento publicadas. Sempre que uma proposta seja publicada todos os
					candidatos registados na plataforma serão notificados por email e poderão ajustar as suas
					preferências para estarem dentro dos parâmetros da proposta apresentada, caso tenham
					habilitações compatíveis.
				</p>

				<p>
					Para o mecanismo de compatibilização funcionar, os candidatos devem cumprir os requisitos
					publicados no edital, ao nível de habilitações, unidades curriculares e/ou grupos
					disciplinares. Após este processo o júri analisará todos os candidatos dentro dos
					parâmetros e aplicará o regulamento em vigor.
				</p>
			</div>
		</div>

		<div class="mt-0hidden flex-col items-center lg:col-span-4 lg:flex">
			<img
				src="/bolsa_recrutamento/simbolo.png"
				alt="Símbolo"
				class="mt-0 mb-8 h-32 w-auto object-contain"
				loading="lazy"
			/>

			<div class="w-full px-4">
				<p class="mb-2 text-left text-base font-bold tracking-wide text-slate-900">Atenção:</p>

				<div class="space-y-4 text-justify text-sm leading-relaxed text-slate-600">
					<p>
						Quando for publicado na bolsa um edital, o candidato deve consultá-lo e caso cumpra as
						competências para as unidades curriculares que constam do mesmo, deve alterar o seu
						registo e garantir que estas unidades curriculares estão selecionadas. Só desta forma se
						garante que o candidato estará na seleção sujeita a seriação pela comissão.
					</p>
					<p>
						Nesta página existe um documento de apoio para o registo, acesso e preenchimento de
						informação.
					</p>
				</div>
			</div>
		</div>
	</header>

	<div class="mt-12 space-y-8">
		<h2 class="border-b pb-2 text-xl font-bold text-slate-900">Manual do Utilizador</h2>

		<StepCard
			step="PASSO 1"
			imageSrc="/bolsa_recrutamento/passo1.png"
			imageAlt="Passo 1: Aceder ao site"
		>
			Entre no seu browser. Para aceder ao formulário clique em
			<a
				href="https://on.ipvc.pt/"
				target="_blank"
				rel="noopener noreferrer"
				class="font-bold text-teal-700 underline hover:text-teal-900"
			>
				https://on.ipvc.pt/
			</a>;
		</StepCard>

		<StepCard
			step="PASSO 2"
			imageSrc="/bolsa_recrutamento/passo2.png"
			imageAlt="Passo 2: Criar utilizador"
		>
			Clique no botão <span class="font-bold text-slate-900">Recrutamento</span> e escolha a opção
			<span class="font-bold text-slate-900">Criar utilizador</span>;
		</StepCard>

		<StepCard
			step="PASSO 3"
			imageSrc="/bolsa_recrutamento/passo3.png"
			imageAlt="Passo 3: Iniciar sessão"
		>
			Na opção <span class="font-bold text-slate-900">Recrutamento</span> clique em
			<span class="font-bold text-slate-900">Iniciar sessão</span> e insira o seu email e password de
			acesso;
		</StepCard>

		<StepCard
			step="PASSO 4"
			imageSrc="/bolsa_recrutamento/passo4.png"
			imageAlt="Passo 4: Botão Iniciar"
		>
			Após iniciar sessão, tem que aceder à opção de <span class="font-bold text-slate-900"
				>Iniciar</span
			>.
		</StepCard>

		<StepCard
			step="PASSO 5"
			imageSrc="/bolsa_recrutamento/passo5.png"
			imageAlt="Passo 5: Formulário"
		>
			Preencher o formulário com os seus <span class="font-bold"
				>dados pessoais, habilitações académicas, experiência profissional, atividade científica,
				unidades curriculares e grupos disciplinares</span
			>, e por fim submeter o seu registo.
		</StepCard>
	</div>
</section>
