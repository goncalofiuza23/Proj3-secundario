import type { Item } from "$lib/types/items.js";
import type { itemsAlunos } from "$lib/types/items.js";
import { line } from "drizzle-orm/pg-core";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = ({ params }) => {

    const items: Item[] = [
        {name: "Eduroam", href:"/eduroam"},
        {name: "E-mail",  href: "/email"},
        {name: "B_On",  href: "/b_on"},
        {name: "FileSender",  href: "/filesender"},
        {name: "Alterar/Recuperar Password", href: "/alterar_recuperar_password"},
        {name: "Software", href: "/software"},
        {name: "On-IPVC",  href: "/on_ipvc"},
        {name: "Repositório Científico",  href: "/repositorio_cientifico"},
        {name: "Office 365", href: "/office_365"},
        {name: "Zoom/Colibri",  href: "/zoom_colibri"},
        {name: "Bolsa de Recrutamento",  href: "/bolsa_recrutamento"},
        {name: "VPN",  href: "/vpn"},
        {name: "Serviço de Impressão", href: "/servico_impressao"},
        {name: "SPSS",  href: "/spss"},
        {name: "Cartões IPVC", href: "/cartoes_ipvc"}
    ];
	
    const itemsAlunos: Item[] = [
        {name: "Faturas Eletrónicas", href:"/faturas_eletronicas"},
        {name: "Matrículas e Inscrições", href:"/matriculas_inscricoes"},
        {name: "Inscrições a Turmas", href:"/inscricoes_turmas"},
        {name: "Inscrições Épocas avaliação", href:"/inscricoes_epocas_avaliacao"},
        {name: "Pedidos de Documentos", href:"/pedidos_documentos"},
        {name: "Erasmus", href:"/erasmus"}
    ];
	
    return {
		items
        ,itemsAlunos
	};


};