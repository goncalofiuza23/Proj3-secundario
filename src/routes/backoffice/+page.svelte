<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import MoreHorizontal from '@lucide/svelte/icons/more-horizontal';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import SquarePen from '@lucide/svelte/icons/square-pen';
	import GripVertical from '@lucide/svelte/icons/grip-vertical';

	import { dndzone } from 'svelte-dnd-action';

	type Section = 'servicos_globais' | 'servicos_alunos' | 'servicos_docentes';

	type Item = {
		id: number;
		title: string;
		href: string;
		section: Section;
		order: number | null;
		isVisible: boolean;
	};

	let { data }: PageProps = $props();

	let globalItems = $state<Item[]>(data.globalItems ?? []);
	let studentItems = $state<Item[]>(data.studentItems ?? []);
	let teacherItems = $state<Item[]>(data.teacherItems ?? []);

	let deleteOpen = $state(false);
	let deleteItem = $state<{ id: number; title: string } | null>(null);

	function openDelete(item: { id: number; title: string }) {
		deleteItem = { id: item.id, title: item.title };
		deleteOpen = true;
	}

	function fullRoute(href: string) {
		const path = href.startsWith('/') ? href : `/${href}`;
		return `${$page.url.origin}${base}${path}`;
	}

	const SECTION_LABEL: Record<Section, string> = {
		servicos_globais: 'Serviços Globais',
		servicos_alunos: 'Serviços para Alunos',
		servicos_docentes: 'Serviços para Docentes'
	};

	function stripPlaceholder(items: unknown[]): Item[] {
		return (items as any[]).filter(
			(it) => typeof it?.id === 'number' && Number.isFinite(it.id)
		) as Item[];
	}

	function setList(section: Section, items: Item[]) {
		if (section === 'servicos_globais') globalItems = items;
		if (section === 'servicos_alunos') studentItems = items;
		if (section === 'servicos_docentes') teacherItems = items;
	}

	function getList(section: Section) {
		if (section === 'servicos_globais') return globalItems;
		if (section === 'servicos_alunos') return studentItems;
		return teacherItems;
	}

	async function persistOrder(section: Section, items: Item[]) {
		const fd = new FormData();
		fd.set('section', section);
		items.forEach((it) => fd.append('orderedIds', String(it.id)));

		const res = await fetch('?/reorderSection', { method: 'POST', body: fd });
		if (!res.ok) {
			await goto($page.url.pathname + $page.url.search, { invalidateAll: true });
		}
	}

	function onConsider(section: Section, e: CustomEvent) {
		const detail = e.detail as any;
		const items = stripPlaceholder(detail?.items ?? []);
		setList(section, items);
	}

	async function onFinalize(section: Section, e: CustomEvent) {
		const detail = e.detail as any;
		const items = stripPlaceholder(detail?.items ?? []);
		setList(section, items);
		await persistOrder(section, items);
	}
</script>

<div class="flex justify-end">
	<Button onclick={() => goto('/backoffice/create')}>+ Adicionar menu</Button>
</div>

{#each [{ key: 'servicos_globais', label: SECTION_LABEL.servicos_globais }, { key: 'servicos_alunos', label: SECTION_LABEL.servicos_alunos }, { key: 'servicos_docentes', label: SECTION_LABEL.servicos_docentes }] as const as sec}
	{@const section = sec.key}
	{@const items = getList(section)}

	<div class="mt-6 rounded-md border">
		<div class="border-b bg-gray-50 px-4 py-3 font-semibold">
			{sec.label}
		</div>

		<div class="grid grid-cols-12 border-b px-4 py-3 text-sm font-semibold">
			<div class="col-span-1"></div>
			<div class="col-span-1">Imagem</div>
			<div class="col-span-3">Nome</div>
			<div class="col-span-2">Visibilidade</div>
			<div class="col-span-4">Route</div>
			<div class="col-span-1 text-right">Ações</div>
		</div>

		{#if items.length === 0}
			<div class="px-4 py-6 text-sm opacity-70">Sem cartões nesta secção.</div>
		{:else}
			<div
				use:dndzone={{
					items,
					flipDurationMs: 150,
					dragHandleSelectors: ['[data-dnd-handle]']
				}}
				onconsider={(e: CustomEvent) => onConsider(section, e)}
				onfinalize={(e: CustomEvent) => onFinalize(section, e)}
			>
				{#each items as item (item.id)}
					<div
						class="grid grid-cols-12 items-center gap-4 border-b px-4 py-3 text-sm hover:bg-gray-50"
					>
						<div class="col-span-1">
							<button
								type="button"
								data-dnd-handle
								class="cursor-grab active:cursor-grabbing"
								aria-label="Arrastar"
							>
								<GripVertical class="h-4 w-4 opacity-50" />
							</button>
						</div>

						<div class="col-span-1">
							<img
								src={`/menu-image/${item.id}`}
								alt={item.title}
								class="h-10 w-10 rounded object-contain"
							/>
						</div>

						<div class="col-span-3">{item.title}</div>

						<div class="col-span-2">
							{#if item.isVisible}
								<Eye class="opacity-60" />
							{:else}
								<EyeOff class="opacity-60" />
							{/if}
						</div>

						<div class="col-span-4">
							<span class="opacity-70">{fullRoute(item.href)}</span>
						</div>

						<div class="col-span-1 flex justify-end">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											type="button"
											variant="outline"
											size="icon-sm"
											aria-label="Opções"
										>
											<MoreHorizontal />
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>

								<DropdownMenu.Content align="end" class="w-44">
									<DropdownMenu.Item>
										<a href={`/backoffice/edit/${item.id}`} class="flex w-full items-center gap-2">
											<Pencil />
											Editar Menu
										</a>
									</DropdownMenu.Item>

									<DropdownMenu.Item>
										<a
											href={`/backoffice/content/${item.id}/pt`}
											class="flex w-full items-center gap-2"
										>
											<SquarePen class="h-4 w-4" />
											Editar conteúdo (PT)
										</a>
									</DropdownMenu.Item>

									<DropdownMenu.Item>
										<a
											href={`/backoffice/content/${item.id}/en`}
											class="flex w-full items-center gap-2"
										>
											<SquarePen class="h-4 w-4" />
											Editar conteúdo (EN)
										</a>
									</DropdownMenu.Item>

									<form method="POST" action="?/toggleVisible" class="w-full">
										<input type="hidden" name="id" value={item.id} />
										<input type="hidden" name="visible" value={item.isVisible ? '0' : '1'} />
										<DropdownMenu.Item>
											<button type="submit" class="flex w-full items-center gap-2">
												{#if item.isVisible}
													<EyeOff />
													Tornar invisível
												{:else}
													<Eye />
													Tornar visível
												{/if}
											</button>
										</DropdownMenu.Item>
									</form>

									<DropdownMenu.Separator />

									<DropdownMenu.Item class="text-destructive focus:text-destructive">
										<button
											type="button"
											class="flex w-full items-center gap-2"
											onclick={() => openDelete(item)}
										>
											<Trash2 class="h-4 w-4" />
											Remover
										</button>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/each}

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Remover cartão</AlertDialog.Title>
			<AlertDialog.Description>
				Tens a certeza que queres remover “{deleteItem?.title}”? Esta ação não pode ser revertida.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<AlertDialog.Footer>
			<AlertDialog.Cancel>
				<button class="cursor-pointer" type="button">Cancelar</button>
			</AlertDialog.Cancel>

			<form method="POST" action="?/delete">
				<input type="hidden" name="id" value={deleteItem?.id ?? ''} />
				<AlertDialog.Action>
					{#snippet child({ props })}
						<Button {...props} type="submit" variant="destructive" class="cursor-pointer">
							Remover
						</Button>
					{/snippet}
				</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
