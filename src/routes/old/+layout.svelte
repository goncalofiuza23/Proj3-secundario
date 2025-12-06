<script lang="ts">
  import '../app.css';
  // importa componentes se os criares mais tarde, ex:
  // import Logo from '$lib/components/Logo.svelte';
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</svelte:head>

<header>
  <div class="bg-[#157F90] text-white text-sm py-1 px-6 flex justify-end space-x-7" role="navigation" aria-label="top utilities">
    <a href="/recent-changes" class="hover:text-teal-400">Recent Changes</a>
    <a href="/media-manager" class="hover:text-teal-400">Media Manager</a>
    <a href="/site-map" class="hover:text-teal-400">Site Map</a>
  </div>

  <nav class="flex items-stretch w-full min-h-[20px]" aria-label="Main navigation">
    <!-- Lado esquerdo branco -->
    <div class="bg-white flex items-center px-70 py-13" style="min-width: 320px;">
      <!-- Logo aqui: <Logo /> -->
    </div>

    <!-- Lado direito teal -->
    <div class="flex-1 bg-teal-400 flex items-center justify-between px-6 py-4">
      <div class="flex items-center space-x-8 text-lg font-medium text-gray-800">
        <a href="/missao" class="hover:text-white transition duration-150">Missão</a>
        <a href="/contatos_si" class="hover:text-white transition duration-150">Contatos SI</a>
        <a href="/contatos_si_uo" class="hover:text-white transition duration-150">Contatos SI UO</a>
      </div>
      <div class="flex items-center space-x-6">
        <a href="/login" class="flex items-center hover:text-white transition duration-150" aria-label="Login">
          <!-- ícone -->
          Log In
        </a>
        <button class="flex items-center hover:text-white transition duration-150" aria-haspopup="true" aria-expanded="false">
          PT
          <!-- caret icon -->
        </button>
      </div>
    </div>
  </nav>
</header>

<main>
  <slot />
</main>

<footer class="w-full">
  <div class="bg-black text-gray-300 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <hr class="border-t border-gray-700 mb-8">

      <div class="flex flex-col md:flex-row justify-between gap-10 text-sm">

        <div class="flex flex-col sm:flex-row gap-10 md:gap-20">
          
          <div>
            <h3 class="font-bold text-white mb-4">Links úteis</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white transition-colors">Ficha Técnica</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Política de Cookies</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Política de Privacidade e Proteção de Dados</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Sugestões, Elogios e Reclamações</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Denúncias</a></li>
            </ul>
          </div>

          <div>
            <ul class="space-y-2 md:mt-9">
              <li><a href="#" class="hover:text-white transition-colors">Notícias</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Redes Sociais</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Serviços On-line</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Mapa do Site</a></li>
            </ul>
          </div>
        </div>

        <div class="pr-0 md:pr-10">
          <h3 class="font-bold text-white mb-4">Contactos</h3>
          <div class="space-y-2">
            <p class="font-bold text-white">Serviços Centrais e Presidência</p>
            <p>Rua Escola Industrial e Comercial Nun'Álvares, 34<br>4900-347 Viana do Castelo</p>
            <p>geral@ipvc.pt</p>
            <p>+351 258 809 610 | 965 919 650</p>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        
        <p class="text-sm text-gray-700 text-center md:text-left">
          © IPVC 2025
        </p>

        <div class="flex items-center space-x-3">
          
          <a href="#" aria-label="Facebook" class="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
          </a>

          <a href="#" aria-label="X (Twitter)" class="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          
          <a href="#" aria-label="YouTube" class="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 9.82 8.977v6.046L15.194 12Z" clip-rule="evenodd" /></svg>
          </a>
          
          <a href="#" aria-label="Instagram" class="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2.25a.75.75 0 0 1 .75.75V5.25a.75.75 0 0 1-1.5 0V3h-1.5a.75.75 0 0 1 0-1.5h1.5zm-3 0a.75.75 0 0 1 .75.75V5.25a.75.75 0 0 1-1.5 0V3h-1.5a.75.75 0 0 1 0-1.5h1.5zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM6.375 12a5.625 5.625 0 1 1 11.25 0 5.625 5.625 0 0 1-11.25 0zM21.75 9.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM15 2.25a.75.75 0 0 1 .75.75V5.25a.75.75 0 0 1-1.5 0V3h-1.5a.75.75 0 0 1 0-1.5h1.5zM21 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75zM15.75 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM21 15.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM21.75 18a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM18.75 2.25a.75.75 0 0 1 .75.75V5.25a.75.75 0 0 1-1.5 0V3h-1.5a.75.75 0 0 1 0-1.5h1.5zM18.75 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM12 21.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM9 21.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM5.25 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM3 18.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 3 18.75zM3.75 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM2.25 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM2.25 9a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 2.25 9zM3 5.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75zM5.25 3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.s 0V3.75a.75.75 0 0 1 .75-.75z" clip-rule="evenodd" /></svg>
          </a>
          
          <a href="#" aria-label="LinkedIn" class="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" /></svg>
          </a>
          
          <a href="#" aria-label="TikTok" class="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.6-6.6-2.31-1.76-1.71-2.61-4.2-2.6-6.65.02-1.22.18-2.45.47-3.61.57-2.2 1.94-4.06 3.75-5.35.85-.6 1.83-1.04 2.89-1.31.11-.03.21-.07.32-.11.04-.01.08-.02.12-.03.01 0 .02-.01.03-.01.12-.03.24-.06.37-.08.01 0 .01-.01.02-.01l.09-.04c.1-.03.19-.07.29-.1.01 0 .01-.01.02-.01c.11-.04.21-.08.32-.12 0 0 .01 0 .01-.01.12-.04.23-.08.35-.12.02 0 .03-.01.05-.01.12-.04.24-.09.36-.13.01 0 .02 0 .02-.01.12-.04.24-.09.36-.14l.05-.02c.11-.05.23-.09.34-.14.01 0 .02-.01.03-.01.11-.05.22-.1.33-.15.01 0 .02-.01.03-.01.11-.05.22-.1.33-.15l.04-.02c.11-.05.21-.11.32-.16.02 0 .03-.01.05-.02.11-.05.21-.11.32-.17.02 0 .03-.01.04-.02.11-.06.21-.12.32-.18.02 0 .03-.01.04-.02.11-.06.21-.12.32-.19l.04-.02c.11-.06.21-.13.31-.2.01 0 .02-.01.03-.02.11-.06.21-.13.31-.2l.04-.02c.11-.07.2-.14.3-.21.02 0 .03-.01.04-.02.1-.07.2-.14.3-.22l.03-.02c.1-.07.2-.15.29-.23.01 0 .02-.01.03-.02.1-.08.19-.16.29-.24.01 0 .02-.01.03-.02.09-.08.19-.17.28-.26l.03-.03c.09-.09.18-.18.27-.27.01-.01.02-.02.03-.03.09-.09.18-.18.26-.28.03-.03.05-.05.08-.08.09-.09.17-.19.26-.29.02-.03.05-.05.07-.08.09-.1.17-.2.26-.3.02-.03.04-.05.06-.08.08-.1.16-.2.24-.31.02-.03.04-.06.06-.09.08-.11.16-.22.24-.33.02-.03.04-.06.05-.09.07-.11.15-.22.22-.34.02-.03.04-.06.05-.1.07-.11.14-.23.21-.35.02-.03.03-.07.05-.1.07-.12.13-.24.19-.37.02-.03.03-.07.04-.1.06-.12.12-.25.18-.38.02-.03.03-.07.04-.11.06-.13.11-.26.17-.4.01-.03.03-.07.04-.11.05-.13.1-.27.15-.41.01-.03.02-.07.03-.11.05-.14.09-.28.14-.43.01-.03.02-.07.03-.11.04-.14.08-.29.12-.44.01-.04.02-.07.02-.11.04-.15.07-.3.11-.46.01-.04.01-.08.02-.12.03-.15.06-.31.09-.47.01-.04.01-.08.02-.13l.06-.33.02-.13.03-.19.01-.08.01-.09.01-.08.01-.08v-.09l.01-.08V.02z" /></svg>
          </a>

        </div>
      </div>
    </div>
  </div>

</footer>