<script lang="ts">
	import type { PageProps } from "./$types.js";

  let { data }: PageProps = $props();
  const {items, itemsAlunos} = data;
</script>

<section class="w-full">

  <!-- Serviços Globais -->
  <div class="bg-black text-white font-semibold text-xl px-40 py-10">
    Serviços Globais
  </div> 

  <div class="bg-gray-50 py-20 px-50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-15">
    {#each items as item}
    <a href={item.href}>
      <div class="w-32 h-32 bg-gray-100 shadow-sm border rounded-lg flex flex-col justify-center items-center p-2 hover:shadow-md cursor-pointer transition">        
        <div class="h-12 w-12 bg-teal-500/20 rounded-lg mb-3"></div>    <!-- Tenho que trocar pelos icons -->
      <p class="text-center text-sm font-medium text-[#157F90]">{item.name}</p>
    </div>
    </a>
    {/each}
  </div>
  <!-- Serviços para Alunos / Docentes - Wrapper dividido -->
  <div class="grid grid-cols-1 md:grid-cols-2">

    <!-- Alunos -->
    <div>
      <div class="bg-[#157F90] text-white font-semibold text-xl px-40 py-10">
        Serviços para Alunos
      </div>

      <div class="bg-gray-100 py-10 px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {#each itemsAlunos as item}
        <a href={item.href}>
          <div class="w-32 h-32 bg-gray-100 shadow-sm border rounded-lg flex flex-col justify-center items-center p-2 hover:shadow-md cursor-pointer transition">            <div class="h-12 w-12 bg-teal-500/20 rounded-lg mb-3"></div>
            <p class="text-center text-sm font-medium text-gray-700">{item.name}</p>
          </div>
        </a>
        {/each}
      </div>
    </div>

    <!-- Docentes -->
    <div>
      <div class="bg-black text-white font-semibold text-xl px-40 py-10">
        Serviços para Docentes
      </div>

      <div class="bg-gray-50 py-10 px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {#each [
          "Programas UC", "Relatórios UC", "Sumários", "Assiduidade",
          "Criar Pauta", "Pautas de Lançamento", "Lançamento de Notas",
          "Consulta de Época", "Turnitin"
        ] as item}
            <div class="w-32 h-32 bg-gray-100 shadow-sm border rounded-lg flex flex-col justify-center items-center p-2 hover:shadow-md cursor-pointer transition">        
            <div class="h-12 w-12 bg-teal-500/20 rounded-lg mb-3"></div>
            <p class="text-center text-sm font-medium text-gray-700">{item}</p>
          </div>
        {/each}
      </div>
    </div>

  </div>

</section>
