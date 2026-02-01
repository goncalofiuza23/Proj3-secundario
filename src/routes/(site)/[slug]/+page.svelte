<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { menu, lang, blocks } = data as any;

	function pageTitle() {
		return lang === 'en' ? menu.titleEn : menu.titlePt;
	}
</script>

<svelte:head>
	<title>{pageTitle()}</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8">
	<h1 class="mb-6 text-2xl font-semibold">{pageTitle()}</h1>

	{#if !blocks || blocks.length === 0}
		<p class="opacity-70">Esta página ainda não tem conteúdo.</p>
	{:else}
		<div class="space-y-6">
			{#each blocks as b (b.id)}
				{#if b.type === 'title'}
					<h2 class="text-xl font-semibold">{b.titleText}</h2>
				{:else if b.type === 'text'}
					<p class="leading-relaxed whitespace-pre-wrap">{b.textValue}</p>
				{:else if b.type === 'image'}
					{#if b.imageMime}
						<img
							src={`/content-image/${b.id}`}
							alt={b.imageName ?? 'Imagem'}
							class="max-h-[420px] w-full rounded-md object-contain"
						/>
					{:else}
						<p class="opacity-70">Sem imagem.</p>
					{/if}
				{:else if b.type === 'table'}
					{#if b.tableData?.columns?.length}
						<div class="overflow-auto rounded-md border">
							<table class="w-full text-sm">
								<thead class="bg-gray-50">
									<tr class="border-b">
										{#each b.tableData.columns as col}
											<th class="p-2 text-left font-medium">{col}</th>
										{/each}
									</tr>
								</thead>

								<tbody>
									{#each b.tableData.rows ?? [] as row}
										<tr class="border-b">
											{#each row as cell}
												<td class="p-2">{cell}</td>
											{/each}
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{:else}
						<p class="opacity-70">Tabela vazia.</p>
					{/if}
				{/if}
			{/each}
		</div>
	{/if}
</div>
