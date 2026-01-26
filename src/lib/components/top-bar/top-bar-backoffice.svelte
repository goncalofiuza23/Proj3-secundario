<script>
	import { Button } from '../ui/button';
</script>

<div class="flex items-center justify-between bg-white px-6 py-4">
	<button
		><a href="/backoffice" aria-label="Ir para a página inicial">
			<img src="/logo.png" alt="Logótipo da Empresa" class="h-20 w-auto object-contain" />
		</a></button
	>
	<form method="POST" action="/log-out">
		<Button type="submit" variant="default">Logout</Button>
	</form>
</div>
