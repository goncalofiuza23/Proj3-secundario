<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import StepCard from '$lib/components/info/stepCard.svelte';
</script>

<TopBarGeneric text="Serviços Globais" bgColor="foreground" />
<TopBarClass text="Alterar/Recuperar Password" bgColor="primary" />

<section class="mx-auto w-full max-w-7xl py-12 lg:py-16">
	<header class="grid gap-10 lg:grid-cols-12 lg:items-start">
		<div class="lg:col-span-8">
			<h2 class="mt-0 text-base font-bold tracking-wide text-teal-700 uppercase">
				Alteração/Recuperação de Palavra-Passe
			</h2>

			<div class="mt-4 space-y-4 text-justify text-base leading-relaxed text-slate-700">
				<p>
					O processo de alteração e de recuperação de credenciais para os Sistemas de Informação do
					IPVC é realizado através do preenchimento de um formulário online na plataforma
					http://on.ipvc.pt .
				</p>
			</div>
		</div>
	</header>

	<div class="mt-12 space-y-8">
		<h2 class="border-b pb-2 text-xl font-bold text-slate-900">
			Manual do Utilizador (Recuperação de Palavra-Passe)
		</h2>

		<StepCard
			step="PASSO 1"
			imageSrc="/alterar-recuperar-password/recuperar1.png"
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
			imageSrc="/alterar-recuperar-password/recuperar2.png"
			imageAlt="Passo 2: Criar utilizador"
		>
			Clique na opção <span class="font-bold text-slate-900">Requerimentos Públicos</span>.
		</StepCard>

		<StepCard
			step="PASSO 3"
			imageSrc="/alterar-recuperar-password/recuperar3.png"
			imageAlt="Passo 3: Iniciar sessão"
		>
			Aceda à opção <span class="font-bold text-slate-900"
				>Pedido de Credenciais para os Sistemas de Informação</span
			>, disponível no menu lateral esquerdo.
		</StepCard>

		<StepCard
			step="PASSO 4"
			imageSrc="/alterar-recuperar-password/recuperar4.png"
			imageAlt="Passo 4: Botão Iniciar"
		>
			Proceda ao preenchimento do formulário de recuperação de credenciais apresentado no seu ecrã.
		</StepCard>
	</div>
</section>

<section class="mx-auto w-full max-w-7xl py-12 lg:py-16">
	<div class="mt-12 space-y-8">
		<h2 class="border-b pb-2 text-xl font-bold text-slate-900">
			Manual do Utilizador (Alteração de Palavra-Passe)
		</h2>

		<StepCard
			step="PASSO 1"
			imageSrc="/alterar-recuperar-password/recuperar1.png"
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
			imageSrc="/alterar-recuperar-password/alterar1.png"
			imageAlt="Passo 2: Criar utilizador"
		>
			Clique na opção <span class="font-bold text-slate-900">ON</span> e introduza as suas credenciais.
		</StepCard>

		<StepCard
			step="PASSO 3"
			imageSrc="/alterar-recuperar-password/alterar3.png"
			imageAlt="Passo 3: Iniciar sessão"
		>
			Quando se clica no perfil do utilizador, no canto superior direito, surge um menu desdobrável.
			Seleccione a opção <span class="font-bold">Palavra-Passe</span>.
		</StepCard>

		<StepCard
			step="PASSO 4"
			imageSrc="/alterar-recuperar-password/alterar4.png"
			imageAlt="Passo 4: Botão Iniciar"
		>
			Introduza a sua palavra-passe atual e a nova palavra-passe que pretende definir.
		</StepCard>
	</div>
</section>
