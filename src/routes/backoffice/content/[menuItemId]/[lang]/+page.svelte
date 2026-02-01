<script lang="ts">
	import type { PageProps } from './$types';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import Type from '@lucide/svelte/icons/type';
	import AlignLeft from '@lucide/svelte/icons/align-left';
	import ImageIcon from '@lucide/svelte/icons/image';
	import Table2 from '@lucide/svelte/icons/table-2';
	import GripVertical from '@lucide/svelte/icons/grip-vertical';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import { deserialize } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import { dndzone } from 'svelte-dnd-action';
	import type { ActionResult } from '@sveltejs/kit';

	type TableData = { columns: string[]; rows: string[][] };
	type BlockType = 'title' | 'text' | 'image' | 'table';
	type Block = {
		id: number;
		type: BlockType;
		sortOrder?: number;
		titleText?: string | null;
		textValue?: string | null;
		imageName?: string | null;
		imageMime?: string | null;
		tableData?: any;
	};

	let { data }: PageProps = $props();
	const { menu, lang } = data as any;

	let blocks = $state<Block[]>((data as any).blocks ?? []);

	let editOpen = $state(false);
	let draft = $state<Block | null>(null);
	let imageFile = $state<File | null>(null);

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
		if (draft.type === 'table') draft.tableData = ensureTableData(draft.tableData);
		imageFile = null;
		editOpen = true;
	}

	function cancelEditor() {
		editOpen = false;
		draft = null;
		imageFile = null;
	}

	async function addBlock(type: BlockType) {
		const fd = new FormData();
		fd.set('type', type);

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

		blocks = [...blocks, block].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
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

		blocks = blocks.filter((b) => b.id !== deletedId);
		if (draft?.id === deletedId) cancelEditor();
	}

	function stripPlaceholder(items: any[]) {
		return items.filter((it) => typeof it?.id === 'number' && Number.isFinite(it.id));
	}

	function onConsider(e: any) {
		blocks = stripPlaceholder(e.detail.items);
	}

	async function onFinalize(e: any) {
		blocks = stripPlaceholder(e.detail.items);

		const fd = new FormData();
		blocks.forEach((b) => fd.append('orderedIds', String(b.id)));
		await fetch('?/reorder', { method: 'POST', body: fd });
	}

	function addColumn() {
		if (!draft) return;

		const t = ensureTableData(draft.tableData);

		const columns = [...t.columns, `Coluna ${t.columns.length + 1}`];
		const rows = t.rows.map((r) => [...r, '']);

		draft.tableData = { columns, rows };
	}

	function removeColumn(idx: number) {
		if (!draft) return;

		const t = ensureTableData(draft.tableData);
		if (t.columns.length <= 1) return;

		const columns = t.columns.filter((_, i) => i !== idx);
		const rows = t.rows.map((r) => r.filter((_, i) => i !== idx));

		draft.tableData = { columns, rows };
	}

	function addRow() {
		if (!draft) return;

		const t = ensureTableData(draft.tableData);

		const rows = [...t.rows, Array.from({ length: t.columns.length }, () => '')];

		draft.tableData = { columns: [...t.columns], rows };
	}

	function removeRow(idx: number) {
		if (!draft) return;

		const t = ensureTableData(draft.tableData);
		if (t.rows.length <= 1) return;

		const rows = t.rows.filter((_, i) => i !== idx);

		draft.tableData = { columns: [...t.columns], rows };
	}

	async function saveDraft() {
		if (!draft) return;

		if (draft.type === 'title') {
			const fd = new FormData();
			fd.set('blockId', String(draft.id));
			fd.set('titleText', draft.titleText ?? '');
			const res = await fetch('?/updateTitle', { method: 'POST', body: fd });
			if (res.ok)
				blocks = blocks.map((b) =>
					b.id === draft!.id ? { ...b, titleText: draft!.titleText } : b
				);
		}

		if (draft.type === 'text') {
			const fd = new FormData();
			fd.set('blockId', String(draft.id));
			fd.set('textValue', draft.textValue ?? '');
			const res = await fetch('?/updateText', { method: 'POST', body: fd });
			if (res.ok)
				blocks = blocks.map((b) =>
					b.id === draft!.id ? { ...b, textValue: draft!.textValue } : b
				);
		}

		if (draft.type === 'table') {
			const fd = new FormData();
			fd.set('blockId', String(draft.id));
			fd.set('tableData', JSON.stringify(ensureTableData(draft.tableData)));
			const res = await fetch('?/updateTable', { method: 'POST', body: fd });
			if (res.ok)
				blocks = blocks.map((b) =>
					b.id === draft!.id ? { ...b, tableData: draft!.tableData } : b
				);
		}

		cancelEditor();
	}

	async function saveImage() {
		if (!draft || draft.type !== 'image') return;
		if (!imageFile) return;

		const file = imageFile;

		const fd = new FormData();
		fd.set('blockId', String(draft.id));
		fd.set('image', imageFile);

		const res = await fetch('?/updateImage', { method: 'POST', body: fd });
		if (!res.ok) return;

		blocks = blocks.map((b) =>
			b.id === draft!.id ? { ...b, imageName: file.name, imageMime: file.type } : b
		);

		cancelEditor();
	}

	let deleteOpen = $state(false);
	let pendingDeleteId = $state<number | null>(null);

	function askDelete(blockId: number) {
		pendingDeleteId = blockId;
		deleteOpen = true;
	}

	function closeDelete() {
		deleteOpen = false;
		pendingDeleteId = null;
	}
</script>

<div class="grid gap-6 lg:grid-cols-12">
	<Card.Root class="lg:col-span-4">
		<Card.Header>
			<Card.Title class="text-base">Componentes</Card.Title>
			<Card.Description>Clica para adicionar à estrutura da página.</Card.Description>
		</Card.Header>

		<Card.Content class="space-y-3">
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

	<div class="space-y-4 lg:col-span-8">
		<div class="rounded-md border p-4">
			<div class="mb-3 text-sm font-medium">Estrutura da Página</div>

			{#if blocks.length === 0}
				<div class="rounded-md border border-dashed p-6 text-sm opacity-70">
					Sem conteúdo. Adiciona componentes do lado esquerdo.
				</div>
			{:else}
				<div
					use:dndzone={{
						items: blocks,
						flipDurationMs: 150,
						dragHandleSelectors: ['[data-dnd-handle]']
					}}
					onconsider={onConsider}
					onfinalize={onFinalize}
					class="space-y-3"
				>
					{#each blocks as block (block.id)}
						<div
							class="flex items-center justify-between rounded-md border bg-white px-3 py-3 hover:bg-gray-50"
						>
							<div class="flex w-full items-center gap-3">
								<button
									type="button"
									data-dnd-handle
									class="cursor-grab active:cursor-grabbing"
									aria-label="Arrastar"
									onclick={(e) => e.stopPropagation()}
								>
									<GripVertical class="h-4 w-4 opacity-50" />
								</button>

								<button
									type="button"
									class="flex w-full flex-col text-left"
									onclick={() => openEditor(block)}
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
								onclick={(e) => {
									e.stopPropagation();
									askDelete(block.id);
								}}
							>
								<Trash2 class="h-4 w-4" />
							</Button>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

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
							onchange={(e) => {
								imageFile = (e.currentTarget as HTMLInputElement).files?.[0] ?? null;
							}}
						/>

						<div class="flex justify-end gap-2 pt-2">
							<Button type="button" variant="outline" onclick={cancelEditor}>Cancelar</Button>
							<Button type="button" onclick={saveImage} disabled={!imageFile}>Guardar</Button>
						</div>
					</div>
				{:else if draft.type === 'table'}
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<div class="text-sm font-medium">Tabela</div>
							<div class="flex gap-2">
								<Button type="button" variant="outline" size="sm" onclick={addColumn}
									>+ Coluna</Button
								>
								<Button type="button" variant="outline" size="sm" onclick={addRow}>+ Linha</Button>
							</div>
						</div>

						<div class="overflow-auto rounded-md border">
							<table class="w-full text-sm">
								<thead>
									<tr class="border-b bg-gray-50">
										{#each draft.tableData.columns as _c, cIdx (cIdx)}
											<th class="p-2 align-top">
												<div class="flex items-center gap-2">
													<Input class="h-8" bind:value={draft.tableData.columns[cIdx]} />
													<Button
														type="button"
														variant="outline"
														size="icon-sm"
														onclick={() => removeColumn(cIdx)}>×</Button
													>
												</div>
											</th>
										{/each}
										<th class="w-[1%] p-2"></th>
									</tr>
								</thead>

								<tbody>
									{#each draft.tableData.rows as _r, rIdx (rIdx)}
										<tr class="border-b">
											{#each draft.tableData.columns as _cc, cIdx (cIdx)}
												<td class="p-2">
													<Input class="h-8" bind:value={draft.tableData.rows[rIdx][cIdx]} />
												</td>
											{/each}
											<td class="p-2">
												<Button
													type="button"
													variant="outline"
													size="icon-sm"
													onclick={() => removeRow(rIdx)}>×</Button
												>
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
