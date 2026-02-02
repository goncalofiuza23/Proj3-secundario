<script lang="ts">
	import pt from '$lib/translations/pt.json';
	import en from '$lib/translations/en.json';
	import type { PageProps } from '../$types';
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';

	type Lang = 'pt' | 'en';

	let { data }: PageProps = $props();

	const lang = ((data as any).lang ?? 'pt') as Lang;
	const dict = lang === 'en' ? en : pt;

	type ContactRow = {
		unitPt: string;
		unitEn: string;
		email: string;
	};

	const contacts: ContactRow[] = [
		{
			unitPt: 'Escola Superior de Educação',
			unitEn: 'School of Education',
			email: 'si@ese.ipvc.pt'
		},
		{
			unitPt: 'Escola Superior Agrária',
			unitEn: 'School of Agriculture',
			email: 'ci@esa.ipvc.pt'
		},
		{
			unitPt: 'Escola Superior de Tecnologia e Gestão',
			unitEn: 'School of Technology and Management',
			email: 'si@estg.ipvc.pt'
		},
		{
			unitPt: 'Escola Superior de Saúde',
			unitEn: 'School of Health',
			email: 'si@ess.ipvc.pt'
		},
		{
			unitPt: 'Escola Superior de Ciências Empresariais',
			unitEn: 'School of Business Sciences',
			email: 'si@esce.ipvc.pt'
		},
		{
			unitPt: 'Escola Superior de Desporto e Lazer',
			unitEn: 'School of Sport and Leisure',
			email: 'si@esdl.ipvc.pt'
		},
		{ unitPt: 'Serviços Centrais', unitEn: 'Central Services', email: 'si@ipvc.pt' },
		{
			unitPt: 'Serviços Centrais Académicos',
			unitEn: 'Academic Central Services',
			email: 'si.academicos@ipvc.pt'
		},
		{
			unitPt: 'Serviços de Ação Social',
			unitEn: 'Social Services',
			email: 'ci@sas.ipvc.pt'
		}
	];
</script>

<TopBarGeneric text={dict.contacts.title} bgColor="foreground" />

<div class="mx-auto max-w-5xl px-4 py-10">
	<div class="mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm">
		<div class="overflow-auto">
			<table class="min-w-full text-sm">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-4 py-3 text-left font-semibold">{dict.contacts.table.unit}</th>
						<th class="px-4 py-3 text-left font-semibold">{dict.contacts.table.email}</th>
					</tr>
				</thead>

				<tbody>
					{#each contacts as row (row.email)}
						<tr class="border-t">
							<td class="px-4 py-3 font-medium">
								{lang === 'en' ? row.unitEn : row.unitPt}
							</td>
							<td class="px-4 py-3">
								<a
									class="text-blue-700 underline-offset-2 hover:underline"
									href={`mailto:${row.email}`}
								>
									{row.email}
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
