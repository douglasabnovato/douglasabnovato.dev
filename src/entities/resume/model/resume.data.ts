import type { ResumeData } from "./types";

export const resumeData: ResumeData = {
    name: "Douglas Antonio Braga Novato",
    headline: "Desenvolvedor Fullstack e Especialista em Educação Tech",
    summary:
        "Head de Educação e Tecnologia na ByteClass, unindo coordenação pedagógica, mentoria técnica e desenvolvimento fullstack. Mais de 5 anos de atuação freelance construindo produtos digitais sob medida.",
    experiences: [
        {
            id: "byteclass",
            company: "ByteClass",
            role: "Head de Educação e Tecnologia",
            period: "ago/2025 – atual",
            tier: "atual",
            highlights: [
                "Estruturação da formação em programação e definição de metodologia",
                "Criação de conteúdos e trilhas práticas orientadas a projetos reais",
                "Mentoria técnica e revisão de código com alunos",
            ],
        },
        {
            id: "freelance",
            company: "Freelance",
            role: "Desenvolvedor de Produtos Digitais (Fullstack — React/Node)",
            period: "mar/2021 – atual",
            tier: "atual",
            highlights: [
                "Stack MERN para aplicações completas, do front ao back",
                "Modelagem de dados e APIs RESTful",
                "Consultoria de produto para microempreendedores",
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
                "Automação de jornadas via Salesforce Marketing Cloud",
                "Gestão técnica de agências parceiras",
            ],
        },
        {
            id: "abc-construcao",
            company: "ABC da Construção S.A.",
            role: "Growth Hacker",
            period: "jul/2023 – jun/2025",
            tier: "recente",
            highlights: [
                "Automação de marketing multicanal (Constant Contact, Zenvia)",
                "Manutenção de front-end de e-commerce (plataforma Wake)",
            ],
        },
        {
            id: "jamboo",
            company: "Jamboo",
            role: "Desenvolvedor Frontend",
            period: "nov/2022 – fev/2023",
            tier: "recente",
            highlights: ["React + TypeScript, Tailwind + styled-components"],
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
        { id: "estacio", institution: "Estácio", degree: "Bachelor of Technology — Computer Programming", period: "2023 – 2025", completed: true },
        { id: "if-sudeste", institution: "IF Sudeste MG", degree: "Técnico em Informática", period: "2016 – 2017", completed: true },
        { id: "ufjf-dcc", institution: "UFJF", degree: "Bacharelado em Ciência da Computação (4 de 8 períodos)", period: "2008 – 2015", completed: false },
    ],
};