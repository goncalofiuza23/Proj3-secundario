<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { menuSchema } from '../../../validation-schemas/menu';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';

	let { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zod4Client(menuSchema)
	});

	const { form: formData, enhance } = form;

	const sections = [
		{ value: 'servicos_globais', label: 'Serviços Globais' },
		{ value: 'servicos_alunos', label: 'Serviços para Alunos' },
		{ value: 'servicos_docentes', label: 'Serviços para Docentes' }
	];

	const triggerContent = $derived(
		sections.find((s) => s.value === $formData.section)?.label ?? 'Selecione uma secção'
	);

	let fileInput: HTMLInputElement | null = null;
	let fileKey = 0;

	function clearFile() {
		$formData.image = null as any;
		if (fileInput) fileInput.value = '';
		fileKey += 1;
	}
</script>

<Card.Root class="mx-auto w-full">
	<Card.Header>
		<Card.Title class="text-2xl">Criar Menu</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" enctype="multipart/form-data" use:enhance>
			<Form.Field {form} name="title">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Titulo</Form.Label>
						<Input {...props} bind:value={$formData.title} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="slug" class="mt-4">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Slug</Form.Label>
						<Input {...props} bind:value={$formData.slug} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="mt-4 flex flex-row gap-8">
				<Form.Field {form} name="image" class="basis-1/3">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Image</Form.Label>
							<Input
								id="picture"
								type="file"
								accept="image/*"
								onchange={(e) => {
									const file = (e.currentTarget as HTMLInputElement).files?.[0];
									$formData.image = file as any;
								}}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="section" class=" basis-2/3">
					<Form.Control>
						{#snippet children()}
							<Form.Label>Secção</Form.Label>
							<Select.Root type="single" name="section" bind:value={$formData.section}>
								<Select.Trigger class="w-full">
									{triggerContent}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each sections as section (section.value)}
											<Select.Item value={section.value} label={section.label}>
												{section.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="mt-4 flex justify-end gap-8">
				<Form.Button variant="destructive" type="button" onclick={() => goto('/backoffice')}
					>Cancelar</Form.Button
				>
				<Form.Button type="submit">Salvar</Form.Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>

<div class="mt-8">
	<SuperDebug data={formData} />
</div>
