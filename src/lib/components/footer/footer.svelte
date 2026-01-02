<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<footer class="bg-foreground text-background">
	<div class="mx-10 py-10 md:mx-30 lg:mx-60">
		<Separator class="mb-4" />
		<div class="flex flex-col justify-between gap-8 lg:flex-row">
			<div>
				<h4 class="mb-4">Links úteis</h4>
				<div class="grid grid-cols-2 gap-8">
					<div>
						<ul class="space-y-2">
							<li>
								<a href="/ficha-tecnica" class="transition-colors hover:text-primary"
									>Ficha Técnica</a
								>
							</li>
							<li>
								<a href="/politica-cookies" class="transition-colors hover:text-primary"
									>Política de Cookies</a
								>
							</li>
							<li>
								<a href="/politica-privacidade" class="transition-colors hover:text-primary"
									>Política de Privacidade e Proteção de Dados</a
								>
							</li>
							<li>
								<a href="/sugestoes" class="transition-colors hover:text-primary"
									>Sugestões, Elogios e Reclamações</a
								>
							</li>
							<li>
								<a href="/denuncias" class="transition-colors hover:text-primary">Denúncias</a>
							</li>
						</ul>
					</div>
					<div>
						<ul class="space-y-2">
							<li><a href="/noticias" class="transition-colors hover:text-primary">Notícias</a></li>
							<li>
								<a href="/redes-sociais" class="transition-colors hover:text-primary"
									>Redes Sociais</a
								>
							</li>
							<li>
								<a href="/servicos-online" class="transition-colors hover:text-primary"
									>Serviços On-line</a
								>
							</li>
							<li>
								<a href="/mapa-site" class="transition-colors hover:text-primary">Mapa do Site</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- aqui nova -->
			<div class="lg:text-right">
				<h4 class="mb-4">Contactos</h4>
				<ul class="space-y-2">
					<li>Serviços Centrais e Presidência</li>
					<li>Rua Escola Industrial e Comercial Nun'Álvares, 34 4900-347 Viana do Castelo</li>
					<li>
						<a href="mailto:geral@ipvc.pt" class="transition-colors hover:text-primary"
							>geral@ipvc.pt</a
						>
					</li>
					<li>
						<a href="tel:351258809610" class="transition-colors hover:text-primary"
							>+351 258 809 610</a
						>
						|
						<a href="tel:965919650" class="transition-colors hover:text-primary">+965 919 650</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
