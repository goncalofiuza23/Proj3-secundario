<script lang="ts">
	import TopBarGeneric from '$lib/components/top-bar/top-bar-generic.svelte';
	import TopBarClass from '$lib/components/top-bar/top-bar-class.svelte';

	const softwareList = [
		{
			name: 'Windows 11 Profissional',
			license: 'Comercial',
			type: 'Sistema Operativo',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Windows 10 Profissional',
			license: 'Comercial',
			type: 'Sistema Operativo',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Windows 7 Profissional',
			license: 'Comercial',
			type: 'Sistema Operativo',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Windows 8 Profissional',
			license: 'Comercial',
			type: 'Sistema Operativo',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Linux Desktop',
			license: 'Livre',
			type: 'Sistema Operativo',
			ipvc: 'Sim',
			personal: 'Sim',
			win: '',
			osx: '',
			linux: 'X',
			available: 'Serviços de Informática'
		},
		{
			name: 'MacOSx',
			license: 'Comercial',
			type: 'Sistema Operativo',
			ipvc: 'Sim',
			personal: 'Não',
			win: '',
			osx: 'X',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Microsoft Office 365',
			license: 'Comercial',
			type: 'Office',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'http://webmail.ipvc.pt'
		},
		{
			name: 'Microsoft Office 2019',
			license: 'Comercial',
			type: 'Office',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Microsoft Office 2016',
			license: 'Comercial',
			type: 'Office',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Microsoft Project',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'LibreOffice',
			license: 'Livre',
			type: 'Office',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'https://www.libreoffice.org/'
		},
		{
			name: 'OpenOffice',
			license: 'Livre',
			type: 'Office',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'http://www.openoffice.org/'
		},
		{
			name: 'MS Security Essentials',
			license: 'Comercial',
			type: 'Antivirus',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Google Chrome',
			license: 'Livre',
			type: 'Browser',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'https://www.google.com/intl/pt-PT/chrome/browser'
		},
		{
			name: 'Mozilla Firefox',
			license: 'Livre',
			type: 'Browser',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://www.mozilla.org/pt-PT/firefox/new/'
		},
		{
			name: 'Safari',
			license: 'Livre',
			type: 'Browser',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'http://www.apple.com/pt/safari/'
		},
		{
			name: 'Teams',
			license: 'Livre',
			type: 'Comunicação',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'https://teams.live.com/free'
		},
		{
			name: 'VLC',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://www.videolan.org/vlc/'
		},
		{
			name: 'K-LITE Codec Pack',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://www.codecguide.com/download_kl.htm'
		},
		{
			name: 'Perian Codec',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: '',
			osx: 'X',
			linux: '',
			available: 'http://www.perian.org/'
		},
		{
			name: 'Flip4Mac',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: '',
			osx: 'X',
			linux: '',
			available: 'http://www.telestream.net/flip4mac/overview.htm'
		},
		{
			name: 'PDF Creator',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'http://sourceforge.net/projects/pdfcreator/'
		},
		{
			name: 'UltraVNC',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://www.uvnc.com/'
		},
		{
			name: 'PDFSAM',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://www.pdfsam.org/'
		},
		{
			name: 'Foxit PDF',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: 'X',
			available: 'https://www.foxit.com/pt/pdf-reader/'
		},
		{
			name: 'Adobe Reader',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://get.adobe.com/reader/'
		},
		{
			name: 'Adobe Flash Player',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://get.adobe.com/flashplayer/'
		},
		{
			name: 'Java JRE',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://www.java.com/'
		},
		{
			name: '7Zip',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: 'X',
			available: 'http://www.7-zip.org/'
		},
		{
			name: 'iZip',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: '',
			osx: 'X',
			linux: '',
			available: 'http://www.izip.com/'
		},
		{
			name: 'Daemon Tools',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'http://www.daemon-tools.cc/'
		},
		{
			name: 'CD Burner XP',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://cdburnerxp.se/'
		},
		{
			name: 'Ccleaner',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'https://www.piriform.com/ccleaner'
		},
		{
			name: 'Vmware Player',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://www.vmware.com/products/player'
		},
		{
			name: 'Graphing calculator',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'http://www.pacifict.com/'
		},
		{
			name: 'Filezilla client',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'https://filezilla-project.org/'
		},
		{
			name: 'Miktek',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://miktex.org/'
		},
		{
			name: 'Notepad++',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://notepad-plus-plus.org/'
		},
		{
			name: 'Wireshark',
			license: 'Livre',
			type: 'Utilitário',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://www.wireshark.org/'
		},
		{
			name: 'Autodesk (Education)',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESTG'
		},
		{
			name: 'SPSS',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: 'X',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'NVIVO 10',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESE e ESS'
		},
		{
			name: 'NVIVO 14',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESA'
		},
		{
			name: 'Solid Works',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Idrisi Taiga',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESA'
		},
		{
			name: 'Arcgis',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESA'
		},
		{
			name: 'Agisoft Photoscan',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESA'
		},
		{
			name: 'Weatherlink 6.0.5',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESA'
		},
		{
			name: 'Fitolog 9000',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática ESA'
		},
		{
			name: 'Ecognition',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Mendeley',
			license: 'Livre',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://www.mendeley.com/'
		},
		{
			name: 'MS Visual Studio 2013 Ultimate',
			license: 'Comercial',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Não',
			win: 'X',
			osx: '',
			linux: '',
			available: 'Serviços de Informática'
		},
		{
			name: 'Octave',
			license: 'Livre',
			type: 'Produtividade',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'https://www.gnu.org/software/octave/'
		},
		{
			name: 'Aptana Studio',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://aptana.com/'
		},
		{
			name: 'Android sdk tools',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://developer.android.com/sdk/index.html/'
		},
		{
			name: 'BlueJ',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://www.bluej.org/'
		},
		{
			name: 'DevC++',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'http://www.bloodshed.net/devcpp.html'
		},
		{
			name: 'GlassFish Server',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'https://glassfish.java.net/'
		},
		{
			name: 'Jedit',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://www.jedit.org/'
		},
		{
			name: 'Xampp',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: 'X',
			linux: 'X',
			available: 'http://www.apachefriends.org/'
		},
		{
			name: 'Netbeans',
			license: 'Livre',
			type: 'Desenvolvimento',
			ipvc: 'Sim',
			personal: 'Sim',
			win: 'X',
			osx: '',
			linux: '',
			available: 'https://netbeans.org/'
		}
	];

	function isLink(text: string) {
		return text.startsWith('http');
	}
</script>

<TopBarGeneric text="Serviços Globais" bgColor="foreground" />
<TopBarClass text="Software" bgColor="primary" />

<section class="mx-auto w-full max-w-7xl px-4 py-12">
	<h2 class="mb-6 text-lg font-bold text-teal-700 uppercase">Lista Programas Informáticos</h2>

	<div class="overflow-x-auto rounded-sm border border-gray-300 shadow-sm">
		<table class="w-full border-collapse text-sm text-gray-700">
			<thead class="bg-gray-200 text-gray-800">
				<tr>
					<th rowspan="2" class="border border-gray-300 px-4 py-2 text-left align-middle font-bold"
						>Software</th
					>
					<th rowspan="2" class="border border-gray-300 px-4 py-2 text-left align-middle font-bold"
						>Licença</th
					>
					<th rowspan="2" class="border border-gray-300 px-4 py-2 text-left align-middle font-bold"
						>Tipo</th
					>

					<th colspan="2" class="border border-gray-300 px-4 py-2 text-center font-bold"
						>Computador</th
					>
					<th colspan="3" class="border border-gray-300 px-4 py-2 text-center font-bold"
						>Sistema Operativo</th
					>

					<th rowspan="2" class="border border-gray-300 px-4 py-2 text-left align-middle font-bold"
						>Disponível em:</th
					>
				</tr>
				<tr>
					<th class="border border-gray-300 px-3 py-1 text-center text-xs font-semibold uppercase"
						>IPVC</th
					>
					<th class="border border-gray-300 px-3 py-1 text-center text-xs font-semibold uppercase"
						>Pessoal</th
					>
					<th class="border border-gray-300 px-3 py-1 text-center text-xs font-semibold uppercase"
						>Windows</th
					>
					<th class="border border-gray-300 px-3 py-1 text-center text-xs font-semibold uppercase"
						>OSX</th
					>
					<th class="border border-gray-300 px-3 py-1 text-center text-xs font-semibold uppercase"
						>Linux</th
					>
				</tr>
			</thead>

			<tbody class="bg-white">
				{#each softwareList as item}
					<tr class="transition-colors duration-150 even:bg-gray-50 hover:bg-blue-50">
						<td class="border border-gray-300 px-4 py-2 font-medium">{item.name}</td>
						<td class="border border-gray-300 px-4 py-2">{item.license}</td>
						<td class="border border-gray-300 px-4 py-2">{item.type}</td>

						<td class="border border-gray-300 px-4 py-2 text-center">{item.ipvc}</td>
						<td class="border border-gray-300 px-4 py-2 text-center">{item.personal}</td>
						<td class="border border-gray-300 px-4 py-2 text-center font-bold text-slate-800"
							>{item.win}</td
						>
						<td class="border border-gray-300 px-4 py-2 text-center font-bold text-slate-800"
							>{item.osx}</td
						>
						<td class="border border-gray-300 px-4 py-2 text-center font-bold text-slate-800"
							>{item.linux}</td
						>

						<td class="border border-gray-300 px-4 py-2">
							{#if isLink(item.available)}
								<a
									href={item.available}
									target="_blank"
									rel="noopener noreferrer"
									class="break-all text-blue-600 underline hover:text-blue-800"
								>
									{item.available}
								</a>
							{:else}
								<span class="text-slate-600">{item.available}</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
		<h3 class="font-bold text-teal-700 uppercase">Observações</h3>

		<p>
			<span class="font-bold text-slate-900">Entende-se por computadores do IPVC</span>
			todos os computadores de secretária ou portátil que tenham sido adquiridos pelo Instituto.
		</p>

		<p>
			<span class="font-bold text-slate-900">Entende-se por computadores PESSOAIS</span>
			todos os computadores de secretária ou portátil que não foram adquiridos pelo IPVC, mesmo que estes
			sejam usados para serviço deste.
		</p>
	</div>
</section>
