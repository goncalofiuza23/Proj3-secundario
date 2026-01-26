<!-- <script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types.js';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '../../../validation-schemas/login.js';

	let { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zod4Client(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto my-40 w-full max-w-xl">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password" class="mt-4">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} bind:value={$formData.password} type="password" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button type="submit" class="mt-4 w-full">Login</Form.Button>
		</form>
	</Card.Content>
</Card.Root> -->

<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types.js';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '../../../validation-schemas/login.js';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zod4Client(loginSchema),
		onResult: async ({ result }) => {
			if (result.type === 'redirect') {
				await goto(result.location);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto my-40 w-full max-w-xl">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password" class="mt-4">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} bind:value={$formData.password} type="password" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button type="submit" class="mt-4 w-full">Login</Form.Button>
		</form>
	</Card.Content>
</Card.Root>
