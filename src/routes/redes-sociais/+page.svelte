<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';

	// Ícones Lucide
	import Facebook from '@lucide/svelte/icons/facebook';
	import Instagram from '@lucide/svelte/icons/instagram';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Twitter from '@lucide/svelte/icons/twitter';
	import Youtube from '@lucide/svelte/icons/youtube';
	import Globe from '@lucide/svelte/icons/globe';
	import Building from '@lucide/svelte/icons/building-2';
	import Users from '@lucide/svelte/icons/users';
	import Music from '@lucide/svelte/icons/music';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';

	// --- DEFINIÇÃO DE TIPOS (A CORREÇÃO ESTÁ AQUI) ---
	interface SocialLink {
		type: string;
		url: string;
	}

	interface CategoryItem {
		name: string;
		desc?: string; // O ponto de interrogação torna o campo opcional
		socials: SocialLink[];
	}

	interface Category {
		title: string;
		icon: any;
		items: CategoryItem[];
	}

	// --- DADOS ---
	const categories: Category[] = [
		{
			title: 'Institucional',
			icon: Building,
			items: [
				{
					name: 'Politécnico de Viana do Castelo',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/ipvc.oficial/' },
						{ type: 'instagram', url: 'https://www.instagram.com/ipvc/?hl=pt' },
						{
							type: 'linkedin',
							url: 'https://pt.linkedin.com/school/instituto-polit-cnico-de-viana-do-castelo/'
						},
						{ type: 'twitter', url: 'https://twitter.com/ipvc_twit/' },
						{ type: 'youtube', url: 'https://www.youtube.com/user/IPVCTV/videos' },
						{ type: 'flickr', url: 'https://www.flickr.com/people/ipvianadocastelo/' },
						{ type: 'tiktok', url: 'https://www.tiktok.com/@ipvianadocastelo' }
					]
				},
				{
					name: 'Internacional (GMCI)',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/internacionalipvc' }]
				},
				{
					name: 'Federação Académica IPVC',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/FAIPVC/' }]
				}
			]
		},
		{
			title: 'Escolas Superiores (UO)',
			icon: GraduationCap,
			items: [
				{
					name: 'ESE - Educação',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/ese.ipvc.pt/' },
						{ type: 'instagram', url: 'https://www.instagram.com/eseipvc/' },
						{
							type: 'youtube',
							url: 'https://www.youtube.com/channel/UCzm-yID1yFhZYvf-DXjtV2A/featured'
						}
					]
				},
				{
					name: 'ESA - Agrária',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/esa.ipvc' },
						{ type: 'instagram', url: 'https://www.instagram.com/esa_ipvc' },
						{ type: 'twitter', url: 'https://twitter.com/EsaIpvc' }
					]
				},
				{
					name: 'ESTG - Tecnologia e Gestão',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/estg.ipvc.pt' },
						{ type: 'instagram', url: 'https://www.instagram.com/estg_ipvc/' }
					]
				},
				{
					name: 'ESS - Saúde',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/ess.ipvc.pt/' }]
				},
				{
					name: 'ESCE - Ciências Empresariais',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/ESCE.IPVC/' },
						{ type: 'instagram', url: 'https://www.instagram.com/esceipvc/?hl=pt' },
						{ type: 'twitter', url: 'https://twitter.com/esceipvc' },
						{ type: 'youtube', url: 'https://www.youtube.com/channel/UCEZxcBB70c0zL9Iuyqvzdgw' }
					]
				},
				{
					name: 'ESDL - Desporto e Lazer',
					socials: [
						{ type: 'facebook', url: 'https://pt-pt.facebook.com/esdl.ipvc' },
						{ type: 'instagram', url: 'https://instagram.com/esdl_ipvc?igshid=12bun3jxdh4cf' }
					]
				}
			]
		},
		{
			title: 'Associações de Estudantes',
			icon: Users,
			items: [
				{
					name: 'AE ESE',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/eseipvc' },
						{ type: 'instagram', url: 'https://www.instagram.com/aeesevc' }
					]
				},
				{
					name: 'AE ESA',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/assestudantesesa/' },
						{ type: 'instagram', url: 'https://instagram.com/aeesapl?igshid=1mpa6i80so71n' }
					]
				},
				{
					name: 'AE ESTG',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/aeestgipvc' },
						{ type: 'website', url: 'http://www.ae.estg.ipvc.pt/' }
					]
				},
				{
					name: 'AE ESS',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/aeescolasuperiordesaude/' }]
				},
				{
					name: 'AE ESCE',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/aeesceipvc' },
						{ type: 'instagram', url: 'https://www.instagram.com/aeesceipvc/' },
						{ type: 'website', url: 'http://ae.esce.ipvc.pt' }
					]
				},
				{
					name: 'AE ESDL',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/AEESDL' }]
				}
			]
		},
		{
			title: 'Tunas Académicas',
			icon: Music,
			items: [
				{
					name: 'Hinoportuna',
					desc: 'Tuna Académica do IPVC',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/hinoportunaipvc/' },
						{ type: 'instagram', url: 'https://www.instagram.com/hinoportuna.tunaacademica/' },
						{
							type: 'youtube',
							url: 'https://www.youtube.com/channel/UC7SzvpGJ75mfD3-NrxFVcUw/featured'
						},
						{ type: 'website', url: 'http://www.hinoportuna.com/' }
					]
				},
				{
					name: 'Tunice',
					desc: 'Tuna Feminina do IPVC',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/tuniceipvc/' }]
				},
				{
					name: 'Ventuna',
					desc: 'Tuna Mista da ESE',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/vemtuna' }]
				},
				{
					name: 'Tesa',
					desc: 'Tuna Masculina da ESA',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/TESAIPVC' }]
				},
				{
					name: 'Tunesa',
					desc: 'Tuna Feminina da ESA',
					socials: [
						{ type: 'facebook', url: 'https://www.facebook.com/Tunesa-IPVC-105208826222998/' }
					]
				},
				{
					name: 'Tunesce',
					desc: 'Tuna Mista da ESCE',
					socials: [{ type: 'facebook', url: 'https://www.facebook.com/tunesce.ipvc' }]
				}
			]
		}
	];

	// Helper para cores de Hover
	function getHoverColor(type: string) {
		switch (type) {
			case 'facebook':
				return 'hover:bg-blue-600 hover:text-white hover:border-blue-600';
			case 'instagram':
				return 'hover:bg-pink-600 hover:text-white hover:border-pink-600';
			case 'linkedin':
				return 'hover:bg-blue-700 hover:text-white hover:border-blue-700';
			case 'youtube':
				return 'hover:bg-red-600 hover:text-white hover:border-red-600';
			case 'twitter':
				return 'hover:bg-black hover:text-white hover:border-black';
			case 'tiktok':
				return 'hover:bg-black hover:text-white hover:border-black';
			case 'flickr':
				return 'hover:bg-pink-500 hover:text-white hover:border-pink-500';
			default:
				return 'hover:bg-primary hover:text-white hover:border-primary';
		}
	}
</script>

<TopBarGeneric text="Sobre o IPVC" bgColor="foreground" />
<TopBarClass text="Redes Sociais" bgColor="primary" />

<div class="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-12">
	<div class="flex-grow space-y-16">
		<div class="border-b border-slate-200 pb-4 text-center md:text-left">
			<h2 class="text-2xl font-bold tracking-wide text-primary uppercase">Conecta-te ao IPVC</h2>
			<p class="mt-2 text-slate-600">
				Segue-nos nas redes sociais para ficares a par de todas as novidades, eventos e vida
				académica.
			</p>
		</div>

		{#each categories as category}
			<section>
				<h3 class="mb-8 flex items-center gap-3 text-xl font-bold text-slate-800">
					<span
						class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-primary shadow-sm"
					>
						<svelte:component this={category.icon} class="h-5 w-5" />
					</span>
					{category.title}
				</h3>

				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each category.items as item}
						<div
							class="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
						>
							<div>
								<h4 class="font-bold text-slate-900">{item.name}</h4>

								{#if item.desc}
									<p class="mt-1 text-xs text-slate-500">{item.desc}</p>
								{/if}
							</div>

							<div class="mt-6 flex flex-wrap gap-3">
								{#each item.socials as social}
									<a
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.type}
										class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all {getHoverColor(
											social.type
										)}"
									>
										{#if social.type === 'facebook'}
											<Facebook class="h-5 w-5" />
										{/if}
										{#if social.type === 'instagram'}
											<Instagram class="h-5 w-5" />
										{/if}
										{#if social.type === 'linkedin'}
											<Linkedin class="h-5 w-5" />
										{/if}
										{#if social.type === 'twitter'}
											<Twitter class="h-5 w-5" />
										{/if}
										{#if social.type === 'youtube'}
											<Youtube class="h-5 w-5" />
										{/if}
										{#if social.type === 'website'}
											<Globe class="h-5 w-5" />
										{/if}

										{#if social.type === 'tiktok'}
											<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"
												><path
													d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12-8.84 8.12 9.07 24.48-11.37 19.33-9.46-2.38-1.37-16.71 8.86-13.73 2.65.77 4.93 2.63 5.92 5.23 1.29 3.4 0 7.37-2.91 9.5-2.94 2.14-6.33 2.1-8.52-.39-2.32-2.63-2.88-6.36-1.42-9.43 1.4-2.95 4.36-4.9 7.62-4.93V.02Z"
												/></svg
											>
										{/if}
										{#if social.type === 'flickr'}
											<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"
												><path
													d="M13 12c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm-2 0c0-2.76-2.24-5-5-5S1 9.24 1 12s2.24 5 5 5 5-2.24 5-5z"
												/></svg
											>
										{/if}
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>

			{#if category !== categories[categories.length - 1]}
				<hr class="border-slate-100" />
			{/if}
		{/each}
	</div>

	<footer class="mt-16 flex justify-end border-t border-gray-100 pt-6 text-xs text-gray-400">
		Atualizado em 22/01/2025
	</footer>
</div>
