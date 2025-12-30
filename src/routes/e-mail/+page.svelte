<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import StepCard from '$lib/components/info/stepCard.svelte';
</script>

<TopBarGeneric text="Serviços Globais" bgColor="foreground" />
<TopBarClass text="E-mail" bgColor="primary" />

<section class="mx-auto w-full max-w-7xl space-y-16 py-12 lg:py-16">
	<header class="grid gap-10 lg:grid-cols-12 lg:items-start">
		<div class="lg:col-span-8">
			<h2 class="mb-1 text-base font-bold tracking-wide text-teal-700 uppercase">Apresentação</h2>

			<div class="space-y-4 text-justify text-base leading-relaxed text-slate-700">
				<p>
					O Instituto Politécnico de Viana do Castelo disponibiliza acesso ao serviço de Correio
					Eletrónico (e-mail) a toda a sua comunidade, desde alunos, funcionários docentes e não
					docentes, serviços, unidades orgânicas, etc.
				</p>
				<p>
					O serviço de correio eletrónico é um dos canais preferenciais de comunicação da
					Instituição.
				</p>
				<p>
					Todas as mensagens de correio eletrónico são analisadas e filtradas, no âmbito de
					politicas anti-virús e anti-spam, e depois são entregues nas caixas de correio eletrónico
					correspondentes. Este processo apenas é executado ao correio eletrónico no sentido de
					entrada, ou seja, enviado para uma conta do IPVC.
				</p>
				<p>As mensagens de correio eletrónico, no sentido de saída, não são objeto de análise.</p>
			</div>
		</div>

		<div class="hidden flex-col items-center justify-start pt-2 lg:col-span-4 lg:flex">
			<img
				src="/e-mail/icon.png"
				alt="Símbolo Email"
				class="h-32 w-auto object-contain"
				loading="lazy"
			/>
		</div>
	</header>

	<div class="grid gap-10 lg:grid-cols-12 lg:items-start">
		<div class="lg:col-span-7">
			<h2 class="mb-1 text-lg font-bold text-slate-900">Novo Serviço de E-mail (05-04-2012)</h2>
			<p class="text-justify leading-relaxed text-slate-700">
				O Instituto Politécnico de Viana do Castelo vai disponibilizar aos seus utilizadores um novo
				serviço de correio eletrónico, a partir do dia 05-04-2012. Veja de seguida a apresentação.
			</p>
		</div>

		<div class="lg:col-span-5"></div>
	</div>

	<div class="grid gap-10 lg:grid-cols-12 lg:items-start">
		<div class="lg:col-span-7">
			<h2 class="mb-1 text-lg font-bold text-slate-900">Como aceder?</h2>

			<div class="space-y-4 text-justify leading-relaxed text-slate-700">
				<p>
					Microsoft Outlook é um cliente de correio eletrónico, integrado no Microsoft Office. Ao
					contrário do Outlook Express, que é usado basicamente para receber e enviar e-mail, o
					Microsoft Outlook além das funções de e-mail, também é um gestor de calendário completo,
					onde podemos agendar compromissos diários, semanais e mensais.
				</p>
				<p>
					Traz também um gestor de contatos, onde podemos gerir a nossa agenda de contatos com todas
					as informações relevantes sobre os mesmos, como endereço, telefones, ramo de atividade,
					detalhes sobre emprego, apelido, etc.
				</p>
				<p>
					Oferece também um Gestor de tarefas, que podemos organizar em forma de lista, com todos os
					detalhes sobre determinada atividade a ser realizada. Conta ainda com um campo de
					anotações, simulando os tradicionais post-its.
				</p>
				<p>Normalmente é utilizado com o sistema operativo Microsoft Windows.</p>
			</div>
		</div>
	</div>

	<div class="space-y-8">
		<h2 class="text-xl font-bold text-slate-900">Manual do Utilizador</h2>

		<div class="space-y-8">
			<StepCard step="PASSO 1" imageSrc="/e-mail/passo1.png" imageAlt="Screenshot PASSO 1">
				Aceder ao website
				<a
					href="https://webmail.ipvc.pt"
					target="_blank"
					rel="noopener noreferrer"
					class="font-bold text-teal-700 underline hover:text-teal-900"
				>
					https://webmail.ipvc.pt
				</a>, e introduzir o email institucional (ex: utilizadoripvc@ipvc.pt).
			</StepCard>

			<StepCard step="PASSO 2" imageSrc="/e-mail/passo2.png" imageAlt="Screenshot PASSO 2">
				Introduzir a password associada à conta do e-mail institucional
			</StepCard>
		</div>
	</div>
</section>
