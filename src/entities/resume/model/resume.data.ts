import type { ResumeData } from "./types";

export const resumeData: ResumeData = {
    name: "Douglas Antonio Braga Novato",
    headline: "Desenvolvedor de Software e Analista de Projetos & Head de Educação Tech",
    summary:
        "Especialista em tecnologia com experiência em desenvolver produtos digitais e idealizador do ecossistema LearnTECH, com atenção em performance e arquitetura fullstack (React, Vue, Node, Laravel, SQL). Uno a visão estratégica à execução técnica avançada, liderando iniciativas educacionais e colaborando ativamente com o ecossistema de tecnologia regional.",
    experiences: [
        {
            id: "byteclass",
            company: "ByteClass & learnTECH Ecosystem",
            role: "Head de Educação e Tecnologia / CTO",
            period: "ago/2025 – atual",
            tier: "atual",
            highlights: [
                "Liderança técnica e arquitetura do ecossistema learnTECH e da escola ByteClass",
                "Estruturação de trilhas modulares (básico, fundamental, intermediário, avançado e bootcamp)",
                "Desenvolvimento de aplicações fullstack e mentoria técnica orientada a projetos reais",
            ],
        },
        {
            id: "freelance",
            company: "Projetos Independentes & Volta Express Brasil",
            role: "Desenvolvedor Fullstack Sênior & Product Specialist",
            period: "mar/2021 – atual",
            tier: "atual",
            highlights: [
                "Arquitetura e desenvolvimento de produtos digitais no ecossistema learnTECH e plataformas logísticas (Volta Express Brasil)",
                "Stack moderna baseada em React, Vue 3, TypeScript, Tailwind CSS, Node e Supabase",
                "Atuação colaborativa no ecossistema de tecnologia da cidade e região, participando ativamente e fomentando eventos locais",
            ],
        },
        {
            id: "mysa",
            company: "Grupo Mysa",
            role: "Tech Growth em CRM | Salesforce",
            period: "fev/2025 – fev/2026",
            tier: "recente",
            status: "a confirmar",
            highlights: [
                "Orquestração e automação de jornadas de comunicação via Salesforce Marketing Cloud para a ABC da Construção",
                "Gestão técnica de agências parceiras, inteligência de dados aplicada ao Full Commerce e governança",
            ],
        },
        {
            id: "abc-construcao",
            company: "ABC da Construção S.A.",
            role: "Growth Hacker & Front-end Specialist",
            period: "jul/2023 – jun/2025",
            tier: "recente",
            highlights: [
                "Automação de marketing multicanal (Zenvia, Constant Contact) e integração de CRM",
                "Manutenção e evolução de front-end em e-commerce (plataforma Wake) focado em conversão",
            ],
        },
        {
            id: "jamboo",
            company: "Jamboo",
            role: "Desenvolvedor Frontend",
            period: "nov/2022 – fev/2023",
            tier: "recente",
            highlights: ["Desenvolvimento em React + TypeScript, Tailwind CSS e componentização avançada"],
        },
        { id: "nvoip", company: "Nvoip", role: "Analista de Desenvolvimento de Sistemas", period: "dez/2020 – ago/2021", tier: "condensado" },
        { id: "almaviva", company: "AlmavivA do Brasil", role: "Supervisor de Operações", period: "jul/2019 – out/2019", tier: "condensado" },
        { id: "brasil-center", company: "Brasil Center Comunicações", role: "Suporte técnico ao cliente", period: "set/2015 – set/2019", tier: "condensado" },
        { id: "oficina-da-net", company: "Oficina da Net", role: "Colunista de Tecnologia", period: "jan/2014 – jun/2015", tier: "condensado" },
        { id: "ufjf-bolsista-web", company: "UFJF", role: "Bolsista em Desenvolvimento Web", period: "fev/2013 – dez/2013", tier: "condensado" },
        { id: "receita-federal", company: "Delegacia de Julgamento da Receita Federal", role: "Estagiário de TI e Planejamento", period: "mai/2011 – jun/2013", tier: "condensado" },
        { id: "ufjf-bolsista-estrutura", company: "UFJF", role: "Bolsista de Estrutura de Dados", period: "fev/2010 – fev/2011", tier: "condensado" },
        { id: "senai", company: "SENAI MG", role: "Aprendiz Industrial em TI", period: "jan/2009 – dez/2009", tier: "condensado" },
    ],
    education: [
        { id: "estacio", institution: "Estácio", degree: "Tecnologia em Análise e Desenvolvimento de Sistemas", period: "2023 – 2025", completed: true },
        { id: "if-sudeste", institution: "IF Sudeste MG", degree: "Técnico em Desenvolvimento Web", period: "2016 – 2017", completed: true },
        { id: "ufjf-dcc", institution: "UFJF", degree: "Bacharelado em Ciência da Computação", period: "2008 – 2015", completed: false },
    ],
};