<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';
	import Check from '@lucide/svelte/icons/check';
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Serviços de Informática" bgColor="primary" />

<section class="mx-auto w-full max-w-7xl px-4 py-12 lg:py-16">
	<header class="mb-16 max-w-4xl">
		<h2 class="mb-6 pb-2 text-lg font-bold tracking-wide text-primary uppercase">Missão</h2>
		<div class="space-y-4 text-justify text-base leading-relaxed text-slate-700">
			<p>
				Os Serviços de Informática têm como missão zelar pelo bom funcionamento de todas as
				infraestruturas e tecnologias de suporte aos serviços prestados pelo IPVC, quer estes sejam
				de natureza interna ou externa.
			</p>
			<p>
				Está também na missão dos Serviços de Informática potenciar as ideias e projetos da
				comunidade IPVC (interna ou externa), criando condições para que estes possam funcionar e
				crescer.
			</p>
			<p>
				Os Serviços de Informática são um elemento facilitador na implementação de tecnologias para
				que a sociedade de informação se consolide no Alto Minho e a nível mais global.
			</p>
		</div>
	</header>

	<hr class="my-12 border-slate-200" />

	<div class="grid gap-12 lg:grid-cols-2">
		<div>
			<h3 class="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900">
				Objetivos Estratégicos
			</h3>

			<ul class="space-y-3 text-sm text-slate-700">
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Contribuir para o desenvolvimento da visão, objetivos e estratégia da Instituição.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Definir estratégias e objetivos de atuação que permitam antecipar as necessidades de
						adaptação do serviço à realidade interna e externa.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Definir uma estratégia de atuação clara, concreta e ambiciosa para os Serviços.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Implementar e manter um modelo de gestão das tecnologias de informação que privilegie a
						qualidade de serviço dos utilizadores.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Assegurar uma resposta flexível e ágil dos SI face a futuras mudanças.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Atender, esclarecer e divulgar normas internas e procedimentos a adotar.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Promover e garantir a articulação entre as divisões tendo em vista a qualidade e
						eficácia do serviço a prestar e a satisfação do interesse dos utilizadores.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Gerir os recursos humanos, patrimoniais e técnicos afetos ao Serviço de modo a otimizar
						o seu desempenho.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Promover ações de formação no sentido de maximizar a eficiência de utilização dos
						recursos disponibilizados e o desenvolvimento de competências.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Garantir a elaboração de planos de formação internos de forma a permitir a aquisição e
						consolidação de competências por parte dos recursos humanos afetos ao Serviço.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Promover o envolvimento de todos os intervenientes, numa ótica de gestão participada.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Promover a valorização e a responsabilização da equipa.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Organizar, planear e gerir os SI de modo a atingir os objetivos definidos pela
						Instituição salvaguardando o retorno dos investimentos realizados.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Estabelecer a articulação entre os SI, as restantes Unidades, Órgãos e Serviços, no
						sentido de equacionar as melhores soluções tecnológicas para a Instituição.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Definir uma arquitetura de Sistemas Informáticos tendo em vista a integração de
						sistemas e os requisitos e necessidades do IPVC e dos seus utilizadores.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Apoiar e promover, no domínio das respetivas competências, a concretização de projetos
						de investigação e cooperação, internos ou em parceria com entidades externas.</span
					>
				</li>
			</ul>
		</div>

		<div>
			<h3 class="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900">
				Objetivos Operacionais
			</h3>

			<ul class="space-y-3 text-sm text-slate-700">
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed">Instruir e gerir processos.</span>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Organizar informação e pareceres para decisão superior.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Avaliar e orientar o desempenho e eficiência do Serviço.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Garantir o desenvolvimento informático que permita facilitar os procedimentos,
						controlar a veracidade da informação e facilitar a sua apresentação e utilização.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed">Garantir a segurança dos sistemas de informação.</span>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Coordenar a seleção, aquisição e implementação de todos os novos sistemas de
						informação, dos respetivos equipamentos e tecnologias de suporte, bem como de todas as
						infraestruturas necessárias à sua correta e eficaz utilização.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Garantir a existência e adequação de normas de funcionamento e utilização estabelecidas
						para os recursos e sistemas disponibilizados, bem como assegurar a sua divulgação e
						sensibilização dos utilizadores para o seu cumprimento.</span
					>
				</li>
				<li class="flex items-start gap-3">
					<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
					<span class="leading-relaxed"
						>Garantir que os SI funcionem de acordo com o nível solicitado pelos utilizadores, de
						acordo com a estratégia do IPVC.</span
					>
				</li>
			</ul>
		</div>
	</div>

	<hr class="my-12 border-slate-200" />

	<div class="space-y-8">
		<h2 class="pb-2 text-lg font-bold tracking-wide text-primary uppercase">
			Estrutura Organizacional
		</h2>
		<p class="text-slate-700">Os Serviços estruturam-se em duas áreas e num gabinete de suporte:</p>

		<div class="grid gap-8 md:grid-cols-2">
			<div
				class="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md"
			>
				<h3 class="mb-4 text-xl font-bold text-slate-900">Infraestruturas e Serviços</h3>
				<p class="mb-4 text-sm text-slate-600 italic">
					Compete a esta área a conceção, implementação e exploração de infraestruturas e serviços.
				</p>
				<ul class="space-y-3 text-sm text-slate-700">
					<li class="flex gap-2">
						<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
						<span
							>Assegurar a administração e gestão técnica das infraestruturas informáticas,
							audiovisuais e de comunicações no IPVC, garantindo a sua operacionalidade bem como a
							disponibilização de serviços estáveis e fiáveis.</span
						>
					</li>
					<li class="flex gap-2">
						<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
						<span
							>Definir e assegurar a aplicação de regras e normas de uso das infraestruturas e
							serviços existentes, garantindo a segurança, confidencialidade e integridade das
							comunicações e recursos associados.</span
						>
					</li>
					<li class="flex gap-2">
						<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
						<span
							>Definir e implementar políticas de atualização e manutenção das infraestruturas
							existentes garantindo uma resposta eficaz face às necessidades das Unidades e Órgãos
							do IPVC.</span
						>
					</li>
				</ul>
			</div>

			<div
				class="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md"
			>
				<h3 class="mb-4 text-xl font-bold text-slate-900">Desenvolvimento</h3>
				<p class="mb-4 text-sm text-slate-600 italic">
					Compete a esta área a conceção, desenvolvimento, manutenção e exploração dos sistemas, e
					aplicações informáticas do IPVC.
				</p>
				<ul class="space-y-3 text-sm text-slate-700">
					<li class="flex gap-2">
						<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
						<span
							>Assegurar a conceção, implementação e operacionalização de aplicações e sistemas
							definindo uma arquitetura de informação integrada e consistente.</span
						>
					</li>
					<li class="flex gap-2">
						<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
						<span
							>Definir e implementar políticas e regras relativamente ao uso dos sistemas e
							aplicações.</span
						>
					</li>
					<li class="flex gap-2">
						<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
						<span
							>Apoiar na conceção e produção de materiais e recursos para utilização quer interna
							quer externa.</span
						>
					</li>
					<li class="flex gap-2">
						<Check class="mt-1 h-4 w-4 min-w-[16px] text-primary" />
						<span
							>Operacionalizar a utilização de tecnologias de e-learning, quer a nível das
							aplicações de suporte quer a nível de conteúdos digitais.</span
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
