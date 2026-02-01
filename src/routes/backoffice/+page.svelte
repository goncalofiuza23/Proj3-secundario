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

	let { data }: PageProps = $props();
	let label = $state('personal');

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

	const SECTION_LABEL: Record<string, string> = {
		servicos_globais: 'Serviços Globais',
		servicos_alunos: 'Serviços para Alunos',
		servicos_docentes: 'Serviços para Docentes'
	};
</script>

<div class="flex justify-end">
	<Button onclick={() => goto('/backoffice/create')}>+ Adicionar menu</Button>
</div>

<div class="mt-6 rounded-md border">
	<div class="grid grid-cols-11 border-b px-4 py-3 font-semibold">
		<div class="col-span-1">Imagem</div>
		<div class="col-span-2">Nome</div>
		<div class="col-span-2">Visibilidade</div>
		<div class="col-span-2">Secção</div>
		<div class="col-span-3">Route</div>
		<div class="col-span-1 text-right">Ações</div>
	</div>

	{#if data.items.length === 0}
		<div class="px-4 py-6 text-sm opacity-70">Sem cartões ainda.</div>
	{:else}
		{#each data.items as item (item.id)}
			<div class="grid grid-cols-11 items-center gap-4 border-b px-4 py-3 text-sm hover:bg-gray-50">
				<div class="col-span-1">
					<img
						src={`/menu-image/${item.id}`}
						alt={item.title}
						class="h-10 w-10 rounded object-contain"
					/>
				</div>
				<div class="col-span-2">{item.title}</div>
				<div class="col-span-2">
					{#if item.isVisible}
						<Eye class="opacity-60" />
					{:else}
						<EyeOff class="opacity-60" />
					{/if}
				</div>
				<div class="col-span-2">{SECTION_LABEL[item.section]}</div>
				<div class="col-span-3">
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
	{/if}
</div>

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
				<button class="cursor-pointer">Cancelar</button>
			</AlertDialog.Cancel>

			<form method="POST" action="?/delete">
				<input type="hidden" name="id" value={deleteItem?.id ?? ''} />
				<AlertDialog.Action>
					{#snippet child({ props })}
						<Button {...props} type="submit" variant="destructive" class="bg:red-600 cursor-pointer"
							>Remover</Button
						>
					{/snippet}
				</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
