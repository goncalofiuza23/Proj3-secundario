<script lang="ts">
	export let step: string; // Ex: "PASSO 1"
	export let imageSrc: string; // Ex: "/imagens/imagem.png"
	export let imageAlt: string; // Texto alternativo
</script>

<div
	class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
>
	<div class="flex flex-col gap-6 lg:flex-row lg:items-start">
		<div class="lg:w-1/2">
			<p class="text-sm font-bold tracking-wider text-teal-600 uppercase">
				{step}
			</p>

			<div class="mt-2 leading-relaxed text-slate-700">
				<slot />
			</div>
		</div>

		<div class="lg:w-1/2">
			<img
				src={imageSrc}
				alt={imageAlt}
				class="w-full rounded-md border border-slate-200 shadow-sm"
				loading="lazy"
			/>
		</div>
	</div>
</div>
