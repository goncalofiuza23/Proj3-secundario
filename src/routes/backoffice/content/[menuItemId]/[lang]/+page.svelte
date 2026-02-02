<script lang="ts">
	import type { PageProps } from './$types';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import Type from '@lucide/svelte/icons/type';
	import AlignLeft from '@lucide/svelte/icons/align-left';
	import ImageIcon from '@lucide/svelte/icons/image';
	import Table2 from '@lucide/svelte/icons/table-2';
	import GripVertical from '@lucide/svelte/icons/grip-vertical';
	import Trash2 from '@lucide/svelte/icons/trash-2';

	import { dndzone } from 'svelte-dnd-action';
	import { deserialize } from '$app/forms';

	type TableData = { columns: string[]; rows: string[][] };
	type BlockType = 'title' | 'text' | 'image' | 'table';
	type Col = 'left' | 'right';
	type RowCols = '1' | '2';

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
		tableData?: any;
	};

	type Row = {
		id: number;
		rowIndex: number;
		cols: RowCols;
		leftBlocks: Block[];
		rightBlocks: Block[];
	};

	let { data }: PageProps = $props();
	const { menu, lang } = data as any;

	let rows = $state<Row[]>((data as any).rows ?? []);

	// seleção de destino para “Adicionar”
	let activeRowId = $state<number | null>(null);
	let activeCol = $state<Col>('left');

	$effect(() => {
		if (activeRowId === null && rows.length > 0) {
			activeRowId = rows[rows.length - 1]!.id;
		}
	});

	// Dialog editor
	let editOpen = $state(false);
	let draft = $state<Block | null>(null);
	let imageFile = $state<File | null>(null);

	// Delete block dialog
	let deleteOpen = $state(false);
	let pendingDeleteId = $state<number | null>(null);

	// Delete row dialog
	let deleteRowOpen = $state(false);
	let pendingRowDeleteId = $state<number | null>(null);

	function typeLabel(t: BlockType) {
		return t === 'title' ? 'Título' : t === 'text' ? 'Texto' : t === 'image' ? 'Imagem' : 'Tabela';
	}

	function safeClone<T>(obj: T): T {
		return JSON.parse(JSON.stringify(obj));
	}

	function ensureTableData(obj: any): TableData {
		let t: TableData =
			obj && Array.isArray(obj.columns) && Array.isArray(obj.rows)
				? obj
				: { columns: ['Coluna 1'], rows: [['']] };

		if (t.columns.length === 0) t.columns = ['Coluna 1'];
		if (t.rows.length === 0) t.rows = [Array.from({ length: t.columns.length }, () => '')];

		t.rows = t.rows.map((r: any) => {
			const row = Array.isArray(r) ? r : [];
			if (row.length < t.columns.length) {
				return [...row, ...Array.from({ length: t.columns.length - row.length }, () => '')];
			}
			return row.slice(0, t.columns.length);
		});

		return t;
	}

	function openEditor(block: Block) {
		draft = safeClone(block);
		imageFile = null;

		if (draft.type === 'table') {
			draft.tableData = ensureTableData(draft.tableData);
		}

		editOpen = true;
	}

	function cancelEditor() {
		editOpen = false;
		draft = null;
		imageFile = null;
	}

	function askDelete(blockId: number) {
		pendingDeleteId = blockId;
		deleteOpen = true;
	}

	function closeDelete() {
		deleteOpen = false;
		pendingDeleteId = null;
	}

	function askDeleteRow(rowId: number) {
		pendingRowDeleteId = rowId;
		deleteRowOpen = true;
	}

	function closeDeleteRow() {
		deleteRowOpen = false;
		pendingRowDeleteId = null;
	}

	function setActiveTarget(rowId: number, col: Col) {
		activeRowId = rowId;
		activeCol = col;
	}

	function activateOnKey(e: KeyboardEvent, rowId: number, col: Col) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			setActiveTarget(rowId, col);
		}
	}

	function findRow(rowId: number) {
		return rows.find((r) => r.id === rowId) ?? null;
	}

	function replaceBlockLocal(updated: Partial<Block> & { id: number }) {
		rows = rows.map((r) => ({
			...r,
			leftBlocks: r.leftBlocks.map((b) =>
				b.id === updated.id ? ({ ...b, ...updated } as Block) : b
			),
			rightBlocks: r.rightBlocks.map((b) =>
				b.id === updated.id ? ({ ...b, ...updated } as Block) : b
			)
		}));
	}

	function removeBlockLocal(blockId: number) {
		rows = rows.map((r) => ({
			...r,
			leftBlocks: r.leftBlocks.filter((b) => b.id !== blockId),
			rightBlocks: r.rightBlocks.filter((b) => b.id !== blockId)
		}));
	}

	// DnD costuma mandar placeholders — garantimos só ids numéricos
	function stripPlaceholder(items: unknown[]): Block[] {
		return (items as any[]).filter(
			(it) => typeof it?.id === 'number' && Number.isFinite(it.id)
		) as Block[];
	}

	// ----------------- ✅ DND DAS LINHAS (ROWS) -----------------

	function stripRowPlaceholder(items: unknown[]): Row[] {
		return (items as any[]).filter(
			(it) => typeof it?.id === 'number' && Number.isFinite(it.id)
		) as Row[];
	}

	function normalizeRowIndexes(list: Row[]): Row[] {
		return list.map((r, i) => ({ ...r, rowIndex: i }));
	}

	async function reorderRowsServer(items: Row[]) {
		const fd = new FormData();
		items.forEach((r) => fd.append('orderedRowIds', String(r.id)));
		await fetch('?/reorderRows', { method: 'POST', body: fd });
	}

	function onConsiderRows(e: CustomEvent) {
		const detail = e.detail as any;
		const items = normalizeRowIndexes(stripRowPlaceholder(detail?.items ?? []));
		rows = items;
	}

	async function onFinalizeRows(e: CustomEvent) {
		const detail = e.detail as any;
		const items = normalizeRowIndexes(stripRowPlaceholder(detail?.items ?? []));
		rows = items;
		await reorderRowsServer(items);
	}

	// --------- SERVER CALLS ---------

	async function addRow(cols: RowCols) {
		const fd = new FormData();
		fd.set('cols', cols);

		const res = await fetch('?/addRow', {
			method: 'POST',
			body: fd,
			headers: { accept: 'application/json' }
		});
		if (!res.ok) return;

		const result = deserialize(await res.text());
		if (result.type !== 'success') return;

		const row = (result.data as any)?.row as
			| { id: number; rowIndex: number; cols: RowCols }
			| undefined;
		if (!row) return;

		const newRow: Row = { ...row, leftBlocks: [], rightBlocks: [] };

		rows = normalizeRowIndexes([...rows, newRow].sort((a, b) => a.rowIndex - b.rowIndex));
		activeRowId = newRow.id;
		activeCol = 'left';
	}

	async function deleteRow(rowId: number) {
		const fd = new FormData();
		fd.set('rowId', String(rowId));

		const res = await fetch('?/deleteRow', {
			method: 'POST',
			body: fd,
			headers: { accept: 'application/json' }
		});
		if (!res.ok) return;

		const result = deserialize(await res.text());
		if (result.type !== 'success') return;

		const deletedRowId = (result.data as any)?.deletedRowId as number | undefined;
		if (!deletedRowId) return;

		rows = normalizeRowIndexes(rows.filter((r) => r.id !== deletedRowId));

		if (activeRowId === deletedRowId) {
			activeRowId = rows.length ? rows[rows.length - 1]!.id : null;
			activeCol = 'left';
		}

		if (draft?.rowId === deletedRowId) cancelEditor();
	}

	async function addBlock(type: BlockType) {
		if (!activeRowId) {
			await addRow('1');
			if (!activeRowId) return;
		}

		const row = findRow(activeRowId);
		if (!row) return;

		const col: Col = row.cols === '1' ? 'left' : activeCol;

		const fd = new FormData();
		fd.set('type', type);
		fd.set('rowId', String(row.id));
		fd.set('col', col);

		const res = await fetch('?/add', {
			method: 'POST',
			body: fd,
			headers: { accept: 'application/json' }
		});
		if (!res.ok) return;

		const result = deserialize(await res.text());
		if (result.type !== 'success') return;

		const block = (result.data as any)?.block as Block | undefined;
		if (!block) return;

		rows = rows.map((r) => {
			if (r.id !== row.id) return r;
			if (block.col === 'left') return { ...r, leftBlocks: [...r.leftBlocks, block] };
			return { ...r, rightBlocks: [...r.rightBlocks, block] };
		});
	}

	async function deleteBlock(blockId: number) {
		const fd = new FormData();
		fd.set('blockId', String(blockId));

		const res = await fetch('?/delete', {
			method: 'POST',
			body: fd,
			headers: { accept: 'application/json' }
		});
		if (!res.ok) return;

		const result = deserialize(await res.text());
		if (result.type !== 'success') return;

		const deletedId = (result.data as any)?.deletedId as number | undefined;
		if (!deletedId) return;

		removeBlockLocal(deletedId);
		if (draft?.id === deletedId) cancelEditor();
	}

	async function reorderColumn(rowId: number, col: Col, items: Block[]) {
		const fd = new FormData();
		fd.set('rowId', String(rowId));
		fd.set('col', col);
		items.forEach((b) => fd.append('orderedIds', String(b.id)));

		await fetch('?/reorder', { method: 'POST', body: fd });
	}

	// --------- DND handlers (por coluna) ---------

	function onConsiderColumn(rowId: number, col: Col, e: CustomEvent) {
		const detail = e.detail as any;
		const items = stripPlaceholder(detail?.items ?? []) as Block[];

		rows = rows.map((r) => {
			if (r.id !== rowId) return r;
			return col === 'left' ? { ...r, leftBlocks: items } : { ...r, rightBlocks: items };
		});
	}

	async function onFinalizeColumn(rowId: number, col: Col, e: CustomEvent) {
		const detail = e.detail as any;
		const items = stripPlaceholder(detail?.items ?? []) as Block[];

		rows = rows.map((r) => {
			if (r.id !== rowId) return r;
			return col === 'left' ? { ...r, leftBlocks: items } : { ...r, rightBlocks: items };
		});

		await reorderColumn(rowId, col, items);
	}

	// --------- TABLE helpers ---------

	function addColumn() {
		if (!draft) return;
		const t = ensureTableData(draft.tableData);
		const columns = [...t.columns, `Coluna ${t.columns.length + 1}`];
		const rows2 = t.rows.map((r) => [...r, '']);
		draft.tableData = { columns, rows: rows2 };
	}

	function removeColumn(idx: number) {
		if (!draft) return;
		const t = ensureTableData(draft.tableData);
		if (t.columns.length <= 1) return;
		const columns = t.columns.filter((_, i) => i !== idx);
		const rows2 = t.rows.map((r) => r.filter((_, i) => i !== idx));
		draft.tableData = { columns, rows: rows2 };
	}

	function addRowCell() {
		if (!draft) return;
		const t = ensureTableData(draft.tableData);
		const rows2 = [...t.rows, Array.from({ length: t.columns.length }, () => '')];
		draft.tableData = { columns: [...t.columns], rows: rows2 };
	}

	function removeRowCell(idx: number) {
		if (!draft) return;
		const t = ensureTableData(draft.tableData);
		if (t.rows.length <= 1) return;
		const rows2 = t.rows.filter((_, i) => i !== idx);
		draft.tableData = { columns: [...t.columns], rows: rows2 };
	}

	// --------- SAVE ---------

	async function saveDraft() {
		if (!draft) return;

		if (draft.type === 'title') {
			const fd = new FormData();
			fd.set('blockId', String(draft.id));
			fd.set('titleText', draft.titleText ?? '');
			const res = await fetch('?/updateTitle', { method: 'POST', body: fd });
			if (res.ok) replaceBlockLocal({ id: draft.id, titleText: draft.titleText ?? '' });
		}

		if (draft.type === 'text') {
			const fd = new FormData();
			fd.set('blockId', String(draft.id));
			fd.set('textValue', draft.textValue ?? '');
			const res = await fetch('?/updateText', { method: 'POST', body: fd });
			if (res.ok) replaceBlockLocal({ id: draft.id, textValue: draft.textValue ?? '' });
		}

		if (draft.type === 'table') {
			const fd = new FormData();
			fd.set('blockId', String(draft.id));
			fd.set('tableData', JSON.stringify(ensureTableData(draft.tableData)));
			const res = await fetch('?/updateTable', { method: 'POST', body: fd });
			if (res.ok) replaceBlockLocal({ id: draft.id, tableData: draft.tableData });
		}

		cancelEditor();
	}

	async function saveImage() {
		if (!draft || draft.type !== 'image') return;
		if (!imageFile) return;

		const fd = new FormData();
		fd.set('blockId', String(draft.id));
		fd.set('image', imageFile);

		const res = await fetch('?/updateImage', { method: 'POST', body: fd });
		if (!res.ok) return;

		replaceBlockLocal({ id: draft.id, imageName: imageFile.name, imageMime: imageFile.type });
		cancelEditor();
	}
</script>

<div class="grid gap-6 lg:grid-cols-12">
	<!-- LEFT -->
	<Card.Root class="lg:col-span-4">
		<Card.Header>
			<Card.Title class="text-base">Linhas e Componentes</Card.Title>
			<Card.Description>
				1) Cria uma linha (1 ou 2 colunas) <br />
				2) Seleciona a coluna (clica) <br />
				3) Adiciona componentes para essa coluna
			</Card.Description>
		</Card.Header>

		<Card.Content class="space-y-3">
			<div class="grid grid-cols-2 gap-2">
				<Button type="button" variant="outline" onclick={() => addRow('1')}>+ Linha 1 col</Button>
				<Button type="button" variant="outline" onclick={() => addRow('2')}>+ Linha 2 col</Button>
			</div>

			<Button
				class="w-full justify-start gap-2"
				variant="outline"
				type="button"
				onclick={() => addBlock('title')}
			>
				<Type class="h-4 w-4" /> Título
			</Button>

			<Button
				class="w-full justify-start gap-2"
				variant="outline"
				type="button"
				onclick={() => addBlock('text')}
			>
				<AlignLeft class="h-4 w-4" /> Texto
			</Button>

			<Button
				class="w-full justify-start gap-2"
				variant="outline"
				type="button"
				onclick={() => addBlock('image')}
			>
				<ImageIcon class="h-4 w-4" /> Imagem
			</Button>

			<Button
				class="w-full justify-start gap-2"
				variant="outline"
				type="button"
				onclick={() => addBlock('table')}
			>
				<Table2 class="h-4 w-4" /> Tabela
			</Button>
		</Card.Content>
	</Card.Root>

	<!-- RIGHT -->
	<div class="space-y-4 lg:col-span-8">
		<div class="rounded-md border p-4">
			<div class="mb-3 text-sm font-medium">Canvas por Linhas</div>

			{#if rows.length === 0}
				<div class="rounded-md border border-dashed p-6 text-sm opacity-70">
					Sem linhas. Cria uma linha do lado esquerdo.
				</div>
			{:else}
				<!-- ✅ DNDZONE DAS LINHAS -->
				<div
					use:dndzone={{
						items: rows,
						flipDurationMs: 150,
						dragHandleSelectors: ['[data-row-dnd-handle]']
					}}
					onconsider={onConsiderRows}
					onfinalize={onFinalizeRows}
					class="space-y-4"
				>
					{#each rows as row (row.id)}
						<Card.Root>
							<Card.Header class="flex flex-row items-center justify-between gap-2">
								<div class="flex items-center gap-2">
									<!-- ✅ HANDLE PARA ARRASTAR A LINHA -->
									<button
										type="button"
										data-row-dnd-handle
										class="cursor-grab active:cursor-grabbing"
										aria-label="Arrastar linha"
										onclick={(e: MouseEvent) => e.stopPropagation()}
									>
										<GripVertical class="h-4 w-4 opacity-50" />
									</button>

									<Card.Title class="text-base">Linha #{row.rowIndex + 1}</Card.Title>
								</div>

								<div class="flex items-center gap-3">
									<div class="text-xs opacity-70">
										{row.cols === '1' ? '1 coluna' : '2 colunas'}
									</div>

									<Button
										type="button"
										size="icon-sm"
										variant="destructive"
										aria-label="Eliminar linha"
										title="Eliminar linha"
										onclick={(e: MouseEvent) => {
											e.stopPropagation();
											askDeleteRow(row.id);
										}}
									>
										<Trash2 class="h-4 w-4" />
									</Button>
								</div>
							</Card.Header>

							<Card.Content>
								{#if row.cols === '1'}
									<!-- 1 coluna -->
									<div
										class="rounded-md border p-3"
										class:ring-2={activeRowId === row.id && activeCol === 'left'}
										role="button"
										tabindex="0"
										aria-label="Selecionar coluna única"
										onclick={() => setActiveTarget(row.id, 'left')}
										onkeydown={(e: KeyboardEvent) => activateOnKey(e, row.id, 'left')}
									>
										<div class="mb-2 text-xs font-medium opacity-70">Coluna Única</div>

										<div
											use:dndzone={{
												items: row.leftBlocks,
												flipDurationMs: 150,
												dragHandleSelectors: ['[data-dnd-handle]']
											}}
											onconsider={(e: CustomEvent) => onConsiderColumn(row.id, 'left', e)}
											onfinalize={(e: CustomEvent) => onFinalizeColumn(row.id, 'left', e)}
											class="space-y-3"
										>
											{#each row.leftBlocks as block (block.id)}
												<div
													class="flex items-center justify-between rounded-md border bg-white px-3 py-3 hover:bg-gray-50"
												>
													<div class="flex w-full items-center gap-3">
														<button
															type="button"
															data-dnd-handle
															class="cursor-grab active:cursor-grabbing"
															aria-label="Arrastar"
															onclick={(e: MouseEvent) => e.stopPropagation()}
														>
															<GripVertical class="h-4 w-4 opacity-50" />
														</button>

														<button
															type="button"
															class="flex w-full flex-col text-left"
															onclick={(e: MouseEvent) => {
																e.stopPropagation();
																openEditor(block);
															}}
														>
															<div class="text-sm font-medium">{typeLabel(block.type)}</div>
															<div class="text-xs opacity-70">
																{#if block.type === 'title'}
																	{block.titleText ?? 'Clique para editar'}
																{:else if block.type === 'text'}
																	{(block.textValue ?? '').slice(0, 40) || 'Clique para editar'}
																{:else if block.type === 'image'}
																	{block.imageName ?? 'Clique para adicionar imagem'}
																{:else}
																	Clique para editar tabela
																{/if}
															</div>
														</button>
													</div>

													<Button
														type="button"
														size="icon-sm"
														variant="destructive"
														onclick={(e: MouseEvent) => {
															e.stopPropagation();
															askDelete(block.id);
														}}
													>
														<Trash2 class="h-4 w-4" />
													</Button>
												</div>
											{/each}
										</div>

										{#if row.leftBlocks.length === 0}
											<div class="mt-2 rounded-md border border-dashed p-4 text-sm opacity-60">
												Clica aqui para selecionar destino e adiciona componentes do lado esquerdo.
											</div>
										{/if}
									</div>
								{:else}
									<!-- 2 colunas -->
									<div class="grid gap-4 md:grid-cols-2">
										<!-- LEFT -->
										<div
											class="rounded-md border p-3"
											class:ring-2={activeRowId === row.id && activeCol === 'left'}
											role="button"
											tabindex="0"
											aria-label="Selecionar coluna esquerda"
											onclick={() => setActiveTarget(row.id, 'left')}
											onkeydown={(e: KeyboardEvent) => activateOnKey(e, row.id, 'left')}
										>
											<div class="mb-2 text-xs font-medium opacity-70">Esquerda</div>

											<div
												use:dndzone={{
													items: row.leftBlocks,
													flipDurationMs: 150,
													dragHandleSelectors: ['[data-dnd-handle]']
												}}
												onconsider={(e: CustomEvent) => onConsiderColumn(row.id, 'left', e)}
												onfinalize={(e: CustomEvent) => onFinalizeColumn(row.id, 'left', e)}
												class="space-y-3"
											>
												{#each row.leftBlocks as block (block.id)}
													<div
														class="flex items-center justify-between rounded-md border bg-white px-3 py-3 hover:bg-gray-50"
													>
														<div class="flex w-full items-center gap-3">
															<button
																type="button"
																data-dnd-handle
																class="cursor-grab active:cursor-grabbing"
																aria-label="Arrastar"
																onclick={(e: MouseEvent) => e.stopPropagation()}
															>
																<GripVertical class="h-4 w-4 opacity-50" />
															</button>

															<button
																type="button"
																class="flex w-full flex-col text-left"
																onclick={(e: MouseEvent) => {
																	e.stopPropagation();
																	openEditor(block);
																}}
															>
																<div class="text-sm font-medium">{typeLabel(block.type)}</div>
																<div class="text-xs opacity-70">
																	{#if block.type === 'title'}
																		{block.titleText ?? 'Clique para editar'}
																	{:else if block.type === 'text'}
																		{(block.textValue ?? '').slice(0, 40) || 'Clique para editar'}
																	{:else if block.type === 'image'}
																		{block.imageName ?? 'Clique para adicionar imagem'}
																	{:else}
																		Clique para editar tabela
																	{/if}
																</div>
															</button>
														</div>

														<Button
															type="button"
															size="icon-sm"
															variant="destructive"
															onclick={(e: MouseEvent) => {
																e.stopPropagation();
																askDelete(block.id);
															}}
														>
															<Trash2 class="h-4 w-4" />
														</Button>
													</div>
												{/each}
											</div>

											{#if row.leftBlocks.length === 0}
												<div class="mt-2 rounded-md border border-dashed p-4 text-sm opacity-60">
													Clica para selecionar esta coluna e adiciona componentes.
												</div>
											{/if}
										</div>

										<!-- RIGHT -->
										<div
											class="rounded-md border p-3"
											class:ring-2={activeRowId === row.id && activeCol === 'right'}
											role="button"
											tabindex="0"
											aria-label="Selecionar coluna direita"
											onclick={() => setActiveTarget(row.id, 'right')}
											onkeydown={(e: KeyboardEvent) => activateOnKey(e, row.id, 'right')}
										>
											<div class="mb-2 text-xs font-medium opacity-70">Direita</div>

											<div
												use:dndzone={{
													items: row.rightBlocks,
													flipDurationMs: 150,
													dragHandleSelectors: ['[data-dnd-handle]']
												}}
												onconsider={(e: CustomEvent) => onConsiderColumn(row.id, 'right', e)}
												onfinalize={(e: CustomEvent) => onFinalizeColumn(row.id, 'right', e)}
												class="space-y-3"
											>
												{#each row.rightBlocks as block (block.id)}
													<div
														class="flex items-center justify-between rounded-md border bg-white px-3 py-3 hover:bg-gray-50"
													>
														<div class="flex w-full items-center gap-3">
															<button
																type="button"
																data-dnd-handle
																class="cursor-grab active:cursor-grabbing"
																aria-label="Arrastar"
																onclick={(e: MouseEvent) => e.stopPropagation()}
															>
																<GripVertical class="h-4 w-4 opacity-50" />
															</button>

															<button
																type="button"
																class="flex w-full flex-col text-left"
																onclick={(e: MouseEvent) => {
																	e.stopPropagation();
																	openEditor(block);
																}}
															>
																<div class="text-sm font-medium">{typeLabel(block.type)}</div>
																<div class="text-xs opacity-70">
																	{#if block.type === 'title'}
																		{block.titleText ?? 'Clique para editar'}
																	{:else if block.type === 'text'}
																		{(block.textValue ?? '').slice(0, 40) || 'Clique para editar'}
																	{:else if block.type === 'image'}
																		{block.imageName ?? 'Clique para adicionar imagem'}
																	{:else}
																		Clique para editar tabela
																	{/if}
																</div>
															</button>
														</div>

														<Button
															type="button"
															size="icon-sm"
															variant="destructive"
															onclick={(e: MouseEvent) => {
																e.stopPropagation();
																askDelete(block.id);
															}}
														>
															<Trash2 class="h-4 w-4" />
														</Button>
													</div>
												{/each}
											</div>

											{#if row.rightBlocks.length === 0}
												<div class="mt-2 rounded-md border border-dashed p-4 text-sm opacity-60">
													Clica para selecionar esta coluna e adiciona componentes.
												</div>
											{/if}
										</div>
									</div>
								{/if}
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- EDIT DIALOG -->
<Dialog.Root bind:open={editOpen}>
	<Dialog.Content class="sm:max-w-lg">
		<Dialog.Header>
			<Dialog.Title>Editar componente</Dialog.Title>
			<Dialog.Description>{draft?.type ? typeLabel(draft.type) : ''}</Dialog.Description>
		</Dialog.Header>

		{#if draft}
			<div class="space-y-4 py-2">
				{#if draft.type === 'title'}
					<div class="space-y-2">
						<div class="text-sm font-medium">Texto do título</div>
						<Input bind:value={draft.titleText} placeholder="Ex: Cartões IPVC" />
					</div>
				{:else if draft.type === 'text'}
					<div class="space-y-2">
						<div class="text-sm font-medium">Texto</div>
						<textarea
							bind:value={draft.textValue}
							class="min-h-[140px] w-full rounded-md border px-3 py-2 text-sm"
							placeholder="Escreve aqui..."
						></textarea>
					</div>
				{:else if draft.type === 'image'}
					<div class="space-y-3">
						<div class="text-sm font-medium">Upload de imagem</div>

						{#if draft.imageName}
							<div class="rounded-md border p-3 text-xs opacity-70">
								Atual: <span class="font-medium">{draft.imageName}</span>
							</div>
						{/if}

						<input
							type="file"
							accept="image/*"
							class="block w-full text-sm"
							onchange={(e: Event) => {
								imageFile = (e.currentTarget as HTMLInputElement).files?.[0] ?? null;
							}}
						/>

						<div class="flex justify-end gap-2 pt-2">
							<Button type="button" variant="outline" onclick={cancelEditor}>Cancelar</Button>
							<Button type="button" onclick={saveImage} disabled={!imageFile}>Guardar</Button>
						</div>
					</div>
				{:else if draft.type === 'table'}
					{@const t = draft.tableData as TableData}

					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<div class="text-sm font-medium">Tabela</div>
							<div class="flex gap-2">
								<Button type="button" variant="outline" size="sm" onclick={addColumn}
									>+ Coluna</Button
								>
								<Button type="button" variant="outline" size="sm" onclick={addRowCell}
									>+ Linha</Button
								>
							</div>
						</div>

						<div class="overflow-auto rounded-md border">
							<table class="w-full text-sm">
								<thead>
									<tr class="border-b bg-gray-50">
										{#each t.columns as _c, cIdx (cIdx)}
											<th class="p-2 align-top">
												<div class="flex items-center gap-2">
													<Input class="h-8" bind:value={draft.tableData.columns[cIdx]} />
													<Button
														type="button"
														variant="outline"
														size="icon-sm"
														onclick={() => removeColumn(cIdx)}
													>
														×
													</Button>
												</div>
											</th>
										{/each}
										<th class="w-[1%] p-2"></th>
									</tr>
								</thead>

								<tbody>
									{#each t.rows as _r, rIdx (rIdx)}
										<tr class="border-b">
											{#each t.columns as _cc, cIdx (cIdx)}
												<td class="p-2">
													<Input class="h-8" bind:value={draft.tableData.rows[rIdx][cIdx]} />
												</td>
											{/each}
											<td class="p-2">
												<Button
													type="button"
													variant="outline"
													size="icon-sm"
													onclick={() => removeRowCell(rIdx)}
												>
													×
												</Button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/if}
			</div>

			{#if draft.type !== 'image'}
				<Dialog.Footer>
					<Button type="button" variant="outline" onclick={cancelEditor}>Cancelar</Button>
					<Button type="button" onclick={saveDraft}>Guardar</Button>
				</Dialog.Footer>
			{/if}
		{/if}
	</Dialog.Content>
</Dialog.Root>

<!-- DELETE BLOCK DIALOG -->
<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Remover componente</AlertDialog.Title>
			<AlertDialog.Description>
				Tens a certeza que queres remover este componente? Esta ação não pode ser revertida.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<AlertDialog.Footer>
			<AlertDialog.Cancel>
				{#snippet child({ props })}
					<Button {...props} type="button" variant="outline" onclick={closeDelete}>Cancelar</Button>
				{/snippet}
			</AlertDialog.Cancel>

			<AlertDialog.Action>
				{#snippet child({ props })}
					<Button
						{...props}
						type="button"
						variant="destructive"
						onclick={async () => {
							if (pendingDeleteId) await deleteBlock(pendingDeleteId);
							closeDelete();
						}}
					>
						Remover
					</Button>
				{/snippet}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<!-- DELETE ROW DIALOG -->
<AlertDialog.Root bind:open={deleteRowOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Remover linha</AlertDialog.Title>
			<AlertDialog.Description>
				Tens a certeza que queres remover esta linha? Todos os componentes dentro dela serão
				apagados.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<AlertDialog.Footer>
			<AlertDialog.Cancel>
				{#snippet child({ props })}
					<Button {...props} type="button" variant="outline" onclick={closeDeleteRow}
						>Cancelar</Button
					>
				{/snippet}
			</AlertDialog.Cancel>

			<AlertDialog.Action>
				{#snippet child({ props })}
					<Button
						{...props}
						type="button"
						variant="destructive"
						onclick={async () => {
							if (pendingRowDeleteId) await deleteRow(pendingRowDeleteId);
							closeDeleteRow();
						}}
					>
						Remover linha
					</Button>
				{/snippet}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
