import type { MenuItem } from "$lib/types/items.js";
import type { PageLoad } from "./$types.js";
import ArrowDownToLine from '@lucide/svelte/icons/arrow-down-to-line';

export const load: PageLoad = ({ params }) => {

    const globalItems: MenuItem[] = [
        { name: "Eduroam", href: "/eduroam", icon: ArrowDownToLine },
        { name: "E-mail", href: "/e-mail", icon: ArrowDownToLine },
        { name: "B-On", href: "/b-on", icon: ArrowDownToLine },
        { name: "FileSender", href: "/filesender", icon: ArrowDownToLine },
        { name: "Alterar/Recuperar Password", href: "/alterar-recuperar-password", icon: ArrowDownToLine },
        { name: "Software", href: "/software", icon: ArrowDownToLine },
        { name: "On-IPVC", href: "/on-ipvc", icon: ArrowDownToLine },
        { name: "Repositório Científico", href: "/repositorio-cientifico", icon: ArrowDownToLine },
        { name: "Office 365", href: "/office365", icon: ArrowDownToLine },
        { name: "Zoom/Colibri", href: "/zoom-colibri", icon: ArrowDownToLine },
        { name: "Bolsa de Recrutamento", href: "/bolsa-recrutamento", icon: ArrowDownToLine },
        { name: "VPN", href: "/vpn", icon: ArrowDownToLine },
        { name: "Serviço de Impressão", href: "/servico-impressao", icon: ArrowDownToLine },
        { name: "SPSS", href: "/spss", icon: ArrowDownToLine },
        { name: "Cartões IPVC", href: "/cartoes-ipvc", icon: ArrowDownToLine }
    ];

    const studentItems: MenuItem[] = [
        { name: "Faturas Eletrónicas", href: "/faturas-eletronicas", icon: ArrowDownToLine },
        { name: "Matrículas e Inscrições", href: "/matriculas-inscricoes", icon: ArrowDownToLine },
        { name: "Inscrições a Turmas", href: "/inscricoes-turmas", icon: ArrowDownToLine },
        { name: "Inscrições Épocas avaliação", href: "/inscricoes-epocas-avaliacao", icon: ArrowDownToLine },
        { name: "Pedidos de Documentos", href: "/pedidos-documentos", icon: ArrowDownToLine },
        { name: "Erasmus", href: "/erasmus", icon: ArrowDownToLine }
    ];

    const teachersItems: MenuItem[] = [
        { name: "Programa UC", href: "/programa-uc", icon: ArrowDownToLine },
        { name: "Relatórios UC", href: "/relatorios-uc", icon: ArrowDownToLine },
        { name: "Sumários", href: "/sumarios", icon: ArrowDownToLine },
        { name: "Assiduidade", href: "/assiduidade", icon: ArrowDownToLine },
        { name: "Criar Pautas", href: "/criar-pautas", icon: ArrowDownToLine },
        { name: "Pautas de Lançamento", href: "/pautas-lancamento", icon: ArrowDownToLine },
        { name: "Lançamento de Notas", href: "/lancamento-notas", icon: ArrowDownToLine },
        { name: "Consulta de Épocas", href: "/consulta-epocas", icon: ArrowDownToLine },
        { name: "Plágio", href: "/plagio", icon: ArrowDownToLine },
    ];

    return {
        globalItems,
        studentItems,
        teachersItems
    };
};