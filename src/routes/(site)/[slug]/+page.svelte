<script lang="ts">
	import type { PageProps } from './$types';

	type BlockType = 'title' | 'text' | 'image' | 'table';
	type Col = 'left' | 'right';
	type RowCols = '1' | '2';

	type TableData = { columns: string[]; rows: string[][] };

	type Block = {
		id: number;
		rowId: number;
		col: Col;
		colOrder: number;
		type: BlockType;
		titleText?: string | null;
		textValue?: string | null;
		imageName?: string | null;
		imageMime?: string | null;
		tableData?: TableData | null;
	};

	type Row = {
		id: number;
		rowIndex: number;
		cols: RowCols;
		leftBlocks: Block[];
		rightBlocks: Block[];
	};

	let { data }: PageProps = $props();
	const { menu, lang, rows } = data as unknown as {
		menu: any;
		lang: 'pt' | 'en';
		rows: Row[];
	};

	function getTable(t?: TableData | null): TableData | null {
		if (!t) return null;
		if (!Array.isArray(t.columns) || !Array.isArray(t.rows)) return null;
		return t;
	}
</script>

<!-- se tens navbar fixed no layout, mete padding-top aqui (ex: pt-20) -->
<div class="mx-auto max-w-5xl px-4 py-8">
	<h1 class="text-2xl font-semibold">
		{lang === 'en' ? menu.titleEn : menu.titlePt}
	</h1>

	<div class="mt-8 space-y-10">
		{#each rows as row (row.id)}
			{#if row.cols === '1'}
				<!-- 1 coluna -->
				<div class="space-y-6">
					{#each row.leftBlocks as block (block.id)}
						{#if block.type === 'title'}
							<h2 class="text-xl font-semibold">{block.titleText}</h2>
						{:else if block.type === 'text'}
							<p class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
								{block.textValue}
							</p>
						{:else if block.type === 'image'}
							<img
								class="h-auto w-full max-w-full rounded-md border object-contain"
								src={`/content-image/${block.id}`}
								alt={block.imageName ?? 'Imagem'}
								loading="lazy"
							/>
						{:else if block.type === 'table'}
							{@const t = getTable(block.tableData)}
							{#if t}
								<div class="overflow-auto rounded-md border">
									<table class="w-full text-sm">
										<thead class="bg-gray-50">
											<tr>
												{#each t.columns as c}
													<th class="border-b px-3 py-2 text-left font-medium">{c}</th>
												{/each}
											</tr>
										</thead>
										<tbody>
											{#each t.rows as r}
												<tr>
													{#each r as cell}
														<td class="border-b px-3 py-2 align-top">{cell}</td>
													{/each}
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			{:else}
				<!-- 2 colunas -->
				<div class="grid gap-8 md:grid-cols-2">
					<!-- LEFT -->
					<div class="min-w-0 space-y-6">
						{#each row.leftBlocks as block (block.id)}
							{#if block.type === 'title'}
								<h2 class="text-xl font-semibold">{block.titleText}</h2>
							{:else if block.type === 'text'}
								<p class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
									{block.textValue}
								</p>
							{:else if block.type === 'image'}
								<img
									class="h-auto w-full max-w-full rounded-md border object-contain"
									src={`/content-image/${block.id}`}
									alt={block.imageName ?? 'Imagem'}
									loading="lazy"
								/>
							{:else if block.type === 'table'}
								{@const t = getTable(block.tableData)}
								{#if t}
									<div class="overflow-auto rounded-md border">
										<table class="w-full text-sm">
											<thead class="bg-gray-50">
												<tr>
													{#each t.columns as c}
														<th class="border-b px-3 py-2 text-left font-medium">{c}</th>
													{/each}
												</tr>
											</thead>
											<tbody>
												{#each t.rows as r}
													<tr>
														{#each r as cell}
															<td class="border-b px-3 py-2 align-top">{cell}</td>
														{/each}
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							{/if}
						{/each}
					</div>

					<!-- RIGHT -->
					<div class="min-w-0 space-y-6">
						{#each row.rightBlocks as block (block.id)}
							{#if block.type === 'title'}
								<h2 class="text-xl font-semibold">{block.titleText}</h2>
							{:else if block.type === 'text'}
								<p class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
									{block.textValue}
								</p>
							{:else if block.type === 'image'}
								<img
									class="h-auto w-full max-w-full rounded-md border object-contain"
									src={`/content-image/${block.id}`}
									alt={block.imageName ?? 'Imagem'}
									loading="lazy"
								/>
							{:else if block.type === 'table'}
								{@const t = getTable(block.tableData)}
								{#if t}
									<div class="overflow-auto rounded-md border">
										<table class="w-full text-sm">
											<thead class="bg-gray-50">
												<tr>
													{#each t.columns as c}
														<th class="border-b px-3 py-2 text-left font-medium">{c}</th>
													{/each}
												</tr>
											</thead>
											<tbody>
												{#each t.rows as r}
													<tr>
														{#each r as cell}
															<td class="border-b px-3 py-2 align-top">{cell}</td>
														{/each}
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
