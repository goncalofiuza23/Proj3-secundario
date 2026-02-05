<script lang="ts">
	import type { PageProps } from './$types';
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';

	import pt from '$lib/translations/pt.json';
	import en from '$lib/translations/en.json';

	type BlockType = 'title' | 'subtitle' | 'text' | 'boxText' | 'image' | 'table' | 'file';
	type Col = 'left' | 'right';
	type RowCols = '1' | '2';
	type Lang = 'pt' | 'en';

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
		imageWidth?: number | null;
		imageAlign?: 'left' | 'center' | 'right' | null;
		tableData?: TableData | null;
		fileName?: string | null;
		fileMime?: string | null;
	};

	type Row = {
		id: number;
		rowIndex: number;
		cols: RowCols;
		leftBlocks: Block[];
		rightBlocks: Block[];
	};

	type MenuSection = 'servicos_globais' | 'servicos_alunos' | 'servicos_docentes';

	let { data }: PageProps = $props();

	const { menu, lang, rows } = data as unknown as {
		menu: {
			id: number;
			titlePt: string;
			titleEn: string;
			href: string;
			section: MenuSection;
			isVisible: boolean;
		};
		lang: Lang;
		rows: Row[];
	};

	const dict = lang === 'en' ? en : pt;

	const sectionTitle =
		menu.section === 'servicos_alunos'
			? dict.home.studentServices
			: menu.section === 'servicos_docentes'
				? dict.home.teacherServices
				: dict.home.globalServices;

	const isStudent = menu.section === 'servicos_alunos';
	const sectionBg = isStudent ? 'primary' : 'foreground';
	const menuBg = isStudent ? 'foreground' : 'primary';

	function getTable(t?: TableData | null): TableData | null {
		if (!t) return null;
		if (!Array.isArray(t.columns) || !Array.isArray(t.rows)) return null;
		return t;
	}

	function fileUrl(blockId: number) {
		return `/content-file/${blockId}`;
	}
</script>

<TopBarGeneric text={sectionTitle} bgColor={sectionBg} />
<TopBarClass text={lang === 'en' ? menu.titleEn : menu.titlePt} bgColor={menuBg} />

<div class="mx-auto max-w-5xl px-4 py-8">
	<div class="mt-8 space-y-10">
		{#each rows as row (row.id)}
			{#if row.cols === '1'}
				<div class="space-y-6">
					{#each row.leftBlocks as block (block.id)}
						{#if block.type === 'title'}
							<h2 class="text-xl font-bold text-primary">{block.titleText}</h2>
						{:else if block.type === 'subtitle'}
							<h3 class="text-lg font-semibold text-foreground">{block.titleText}</h3>
						{:else if block.type === 'text'}
							<p class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
								{block.textValue}
							</p>
						{:else if block.type === 'boxText'}
							<div class="rounded-md border bg-gray-50 p-4">
								<p class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
									{block.textValue}
								</p>
							</div>
						{:else if block.type === 'image'}
							{@const width = block.imageWidth ?? 100}
							{@const align = block.imageAlign ?? 'center'}

							<div
								class="w-full"
								style={`display:flex; justify-content:${
									align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'
								};`}
							>
								<img
									src={`/content-image/${block.id}`}
									alt={block.imageName ?? 'Imagem'}
									class="h-auto max-w-full rounded-md border object-contain"
									style={`width:${width}%;`}
									loading="lazy"
								/>
							</div>
						{:else if block.type === 'file'}
							<a
								href={fileUrl(block.id)}
								class="inline-flex items-center gap-2 text-primary underline underline-offset-4"
								download={block.fileName ?? undefined}
							>
								Descarregar o ficheiro {block.fileName ?? ''}
							</a>
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
				<div class="grid gap-8 md:grid-cols-2">
					<div class="min-w-0 space-y-6">
						{#each row.leftBlocks as block (block.id)}
							{#if block.type === 'title'}
								<h2 class="text-xl font-bold text-primary">{block.titleText}</h2>
							{:else if block.type === 'subtitle'}
								<h3 class="text-lg font-semibold text-foreground">{block.titleText}</h3>
							{:else if block.type === 'text'}
								<p class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
									{block.textValue}
								</p>
							{:else if block.type === 'boxText'}
								<div class="rounded-md border bg-gray-50 p-4">
									<p
										class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap"
									>
										{block.textValue}
									</p>
								</div>
							{:else if block.type === 'image'}
								{@const width = block.imageWidth ?? 100}
								{@const align = block.imageAlign ?? 'center'}

								<div
									class="w-full"
									style={`display:flex; justify-content:${
										align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'
									};`}
								>
									<img
										src={`/content-image/${block.id}`}
										alt={block.imageName ?? 'Imagem'}
										class="h-auto max-w-full rounded-md border object-contain"
										style={`width:${width}%;`}
										loading="lazy"
									/>
								</div>
							{:else if block.type === 'file'}
								<a
									href={fileUrl(block.id)}
									class="inline-flex items-center gap-2 text-primary underline underline-offset-4"
									download={block.fileName ?? undefined}
								>
									Descarregar o ficheiro {block.fileName ?? ''}
								</a>
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

					<div class="min-w-0 space-y-6">
						{#each row.rightBlocks as block (block.id)}
							{#if block.type === 'title'}
								<h2 class="text-xl font-bold text-primary">{block.titleText}</h2>
							{:else if block.type === 'subtitle'}
								<h3 class="text-lg font-semibold text-foreground">{block.titleText}</h3>
							{:else if block.type === 'text'}
								<p class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap">
									{block.textValue}
								</p>
							{:else if block.type === 'boxText'}
								<div class="rounded-md border bg-gray-50 p-4">
									<p
										class="leading-relaxed [overflow-wrap:anywhere] break-words whitespace-pre-wrap"
									>
										{block.textValue}
									</p>
								</div>
							{:else if block.type === 'image'}
								{@const width = block.imageWidth ?? 100}
								{@const align = block.imageAlign ?? 'center'}

								<div
									class="w-full"
									style={`display:flex; justify-content:${
										align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'
									};`}
								>
									<img
										src={`/content-image/${block.id}`}
										alt={block.imageName ?? 'Imagem'}
										class="h-auto max-w-full rounded-md border object-contain"
										style={`width:${width}%;`}
										loading="lazy"
									/>
								</div>
							{:else if block.type === 'file'}
								<a
									href={fileUrl(block.id)}
									class="inline-flex items-center gap-2 text-primary underline underline-offset-4"
									download={block.fileName ?? undefined}
								>
									Descarregar o ficheiro {block.fileName ?? ''}
								</a>
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
