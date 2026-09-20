import type { ResumeData } from "./types";

/**
 * Fonte única de verdade do currículo.
 * A página /curriculo e o template de impressão (PDF) leem daqui.
 *
 * Itens deliberadamente fora desta base, por falta de confirmação:
 * - percentual de desempenho acima de parâmetro na ABC da Construção
 * - autoria da integração ERP -> Salesforce Marketing Cloud
 * - posição em ranking de empresas juniores de MG
 * - contagem de artigos na Oficina da Net
 * - volumes agregados calculados por multiplicação
 */
export const resumeData: ResumeData = {
    name: "Douglas Antonio Braga Novato",
    shortName: "Douglas A. B. Novato",
    location: "Juiz de Fora — MG",
    headline: "Desenvolvedor de produto digital",
    summary:
        "Front-end em React, integração de dados e automação, e condução de produto da ideação à versão em produção. Atuação também em coordenação de equipes técnicas.",
    objective:
        "Atuar como desenvolvedor de produto digital, participando da construção e da evolução de produtos web — da descoberta e definição de escopo à implementação de front-end e à integração com dados e serviços.",
    careerStart: 2009,

    figures: [
        { id: "inicio", label: "Início da trajetória", value: "2009", source: "datas do histórico" },
        { id: "repos", label: "Repositórios públicos", source: "API do GitHub", live: "repos" },
        { id: "producao", label: "Projetos com link em produção", source: "API do GitHub", live: "producao" },
        { id: "artigos", label: "Artigos publicados no Medium", value: "200+", source: "medium.com/@douglasabnovato" },
    ],

    contacts: [
        { id: "email", label: "E-mail", value: "douglasabnovato@gmail.com", href: "mailto:douglasabnovato@gmail.com" },
        { id: "telefone", label: "Telefone", value: "(32) 98836-7667", href: "tel:+5532988367667" },
        { id: "linkedin", label: "LinkedIn", value: "/in/douglasabnovato", href: "https://linkedin.com/in/douglasabnovato" },
        { id: "github", label: "GitHub", value: "@douglasabnovato", href: "https://github.com/douglasabnovato" },
        { id: "medium", label: "Medium", value: "@douglasabnovato", href: "https://medium.com/@douglasabnovato" },
    ],

    experiences: [
        {
            id: "volta-express",
            company: "Volta Express Brasil",
            role: "Fundador e Especialista em Tecnologia",
            period: "mar/2021 – presente",
            start: "2021-03",
            end: null,
            tier: "atual",
            depth: "full",
            track: "produto",
            context:
                "Startup de logística nascida em hackathon, em fase de validação.",
            deliverables: [
                "Condução do produto desde a ideação, ao longo de 13 versões e 3 pivotagens.",
                "Coordenação do time de desenvolvimento, que chegou a 8 pessoas.",
            ],
        },
        {
            id: "byteclass",
            company: "ByteClass",
            role: "Coordenador de Educação e Tecnologia",
            period: "ago/2025 – presente",
            start: "2025-08",
            end: null,
            tier: "atual",
            depth: "full",
            track: "educacao",
            context: "Escola de programação com aulas presenciais, em Juiz de Fora.",
            deliverables: [
                "Coordenação de equipe de 3 instrutores, 2 conteudistas e 1 desenvolvedor.",
                "Produção de 8 cursos e 3 trilhas; edição e atualização de outros 20 cursos.",
                "6 turmas ativas.",
            ],
        },
        {
            id: "mysa",
            company: "Grupo MYSA",
            role: "Tech Growth CRM · Salesforce Developer",
            period: "fev/2025 – fev/2026",
            start: "2025-02",
            end: "2026-02",
            tier: "recente",
            depth: "full",
            track: "dados",
            context:
                "Holding de varejo físico e digital, serviços financeiros e logística, formada a partir da ABC da Construção, com mais de 400 unidades.",
            deliverables: [
                "Operação sobre base de 800 mil registros integrada do ERP ao Salesforce Marketing Cloud.",
                "Automação, no Marketing Cloud, de rotinas antes executadas manualmente.",
                "Painéis mensais no Looker Studio, consumidos pelas áreas de compras, expansão e marketing.",
                "Time de marketing de duas pessoas.",
            ],
            stack: [
                "Automation Studio",
                "Journey Builder",
                "CloudPages",
                "AMPscript",
                "SSJS",
                "SQL",
                "APIs REST",
                "Webhooks",
                "Looker Studio",
            ],
        },
        {
            id: "abc-construcao",
            company: "ABC da Construção",
            role: "Growth Hacker",
            period: "jul/2023 – fev/2025",
            start: "2023-07",
            end: "2025-02",
            tier: "recente",
            depth: "full",
            track: "dados",
            context: "Rede de acabamentos com 420 franquias.",
            deliverables: [
                "Roadmap semanal de campanhas para clientes internos: 14 a 20 disparos por dia sobre bases de 1.000 a 3.000 contatos, com média de 340 disparos por mês.",
                "Campanhas sazonais sobre bases de até 12.000 contatos, entre elas recuperação de carrinho.",
                "Front-end da recategorização do catálogo do e-commerce: 20 mil SKUs redistribuídos em 60 categorias, com novos parâmetros e menu header passando a exibir imagem por categoria.",
            ],
            stack: ["Constant Contact", "Zenvia", "Plataforma Wake", "HTML", "CSS", "JavaScript"],
        },
        {
            id: "nvoip-dev",
            company: "Nvoip",
            role: "Analista de Desenvolvimento de Sistemas",
            period: "mar/2021 – ago/2021",
            start: "2021-03",
            end: "2021-08",
            tier: "recente",
            depth: "full",
            track: "desenvolvimento",
            context: "Empresa de telefonia sobre IP. Time de 6 desenvolvedores.",
            deliverables: [
                "Front-end do novo dashboard e do painel do produto principal da empresa.",
                "Refatoração da versão vigente e sustentação à equipe de manutenção da versão em produção.",
                "Colaboração no processo de versionamento e no workflow da equipe.",
            ],
            stack: ["React", "Git", "GitHub"],
        },
        {
            id: "medtrem",
            company: "MedTREM · TREMED",
            role: "Consultoria em gestão de projetos e engenharia de software",
            period: "2026 · 2 meses",
            tier: "recente",
            depth: "medium",
            track: "produto",
            context:
                "Distribuidora de materiais e equipamentos hospitalares. Gestão de projetos e apoio técnico em tecnologia e engenharia de software.",
        },
        {
            id: "jamboo",
            company: "Jamboo",
            role: "Desenvolvedor Frontend",
            period: "nov/2022 – fev/2023",
            start: "2022-11",
            end: "2023-02",
            tier: "recente",
            depth: "medium",
            track: "desenvolvimento",
            context:
                "Projeto contratado por indicação: cardápio digital de sushi bar, da ideação à versão 1.",
        },
        {
            id: "brasil-center-sup",
            company: "Brasil Center Comunicações",
            role: "Supervisor de Operações",
            period: "ago/2016 – set/2019",
            start: "2016-08",
            end: "2019-09",
            tier: "condensado",
            depth: "medium",
            track: "operacao",
            context:
                "Operação de atendimento aos produtos Claro (telefonia móvel PF e PJ) e NET (internet e telefonia fixa), nas frentes de suporte técnico, Anatel e cobrança.",
            deliverables: [
                "Equipe de 14 a 22 pessoas, com acompanhamento de 14 indicadores.",
                "Volume por representante: 50 a 80 ligações diárias no receptivo e 13 a 25 no ativo especializado.",
            ],
        },
        {
            id: "almaviva",
            company: "AlmavivA do Brasil",
            role: "Supervisor de Operações",
            period: "jul/2019 – out/2019",
            start: "2019-07",
            end: "2019-10",
            tier: "condensado",
            depth: "medium",
            track: "operacao",
            context: "Implantação da campanha TIM Controle.",
            deliverables: [
                "Equipe de 28 representantes, com média de 100 ligações por representante ao dia.",
            ],
        },
        {
            id: "receita-federal",
            company: "Delegacia de Julgamento da Receita Federal",
            role: "Estágio em TI e Planejamento",
            period: "mai/2011 – jun/2013",
            start: "2011-05",
            end: "2013-06",
            tier: "condensado",
            depth: "medium",
            track: "desenvolvimento",
            context:
                "Unidade de julgamento de processos fiscais com 42 auditores fiscais, 12 analistas tributários e gerência do SERPRO, distribuída em 4 andares.",
            deliverables: [
                "Substituição de 36 desktops e implantação de 43 estações de trabalho.",
                "Aplicação desktop em Delphi com base Access, utilizada pelos auditores fiscais da unidade para extração de dados de processos em PDF.",
                "Participação, junto à gerência, na condução e na validação do plano de transição da unidade para processo digital, com empresa contratada responsável pela execução.",
            ],
            stack: ["Delphi", "Access"],
        },
        {
            id: "nvoip-suporte",
            company: "Nvoip",
            role: "Suporte Técnico",
            period: "dez/2020 – mar/2021",
            start: "2020-12",
            end: "2021-03",
            tier: "condensado",
            depth: "line",
            track: "operacao",
            context: "Transição para a equipe de desenvolvimento após três meses.",
        },
        {
            id: "transicao",
            company: "Transição de carreira",
            role: "Atividades autônomas",
            period: "out/2019 – dez/2020",
            start: "2019-10",
            end: "2020-12",
            tier: "condensado",
            depth: "line",
            track: "transicao",
            context:
                "Período de atividades autônomas durante o início da pandemia, incluindo aulas particulares de matemática e informática a domicílio.",
        },
        {
            id: "brasil-center-suporte",
            company: "Brasil Center Comunicações",
            role: "Suporte Técnico",
            period: "set/2015 – ago/2016",
            start: "2015-09",
            end: "2016-08",
            tier: "condensado",
            depth: "line",
            track: "operacao",
            context: "Atendimento técnico aos clientes Claro e NET.",
        },
        {
            id: "oficina-da-net",
            company: "Oficina da Net",
            role: "Colunista de tecnologia",
            period: "jan/2014 – jun/2015",
            start: "2014-01",
            end: "2015-06",
            tier: "condensado",
            depth: "line",
            track: "educacao",
            context: "Coluna de tecnologia em veículo especializado.",
        },
        {
            id: "ufjf-integra",
            company: "UFJF · Sistema iNtegra",
            role: "Bolsista de desenvolvimento web",
            period: "fev/2013 – dez/2013",
            start: "2013-02",
            end: "2013-12",
            tier: "condensado",
            depth: "line",
            track: "desenvolvimento",
            context: "Front-end do sistema institucional; painel de listagem de alunos cadastrados.",
        },
        {
            id: "ufjf-monitoria",
            company: "UFJF · DCC",
            role: "Monitor de Estrutura de Dados em C",
            period: "fev/2010 – fev/2011",
            start: "2010-02",
            end: "2011-02",
            tier: "condensado",
            depth: "line",
            track: "educacao",
            context: "Atendimento a 3 alunos por dia, dois dias por semana.",
            stack: ["C"],
        },
        {
            id: "senai",
            company: "SENAI MG",
            role: "Aprendiz Industrial em TI",
            period: "jan/2009 – dez/2009",
            start: "2009-01",
            end: "2009-12",
            tier: "condensado",
            depth: "line",
            track: "operacao",
            context: "Formação técnica com prática na Brasil Center.",
        },
    ],

    education: [
        {
            id: "estacio",
            institution: "Estácio",
            degree: "Análise e Desenvolvimento de Sistemas",
            period: "fev/2023 – jul/2025",
            completed: true,
        },
        {
            id: "if-sudeste",
            institution: "IF Sudeste MG",
            degree: "Técnico em Informática com foco em Desenvolvimento Web",
            period: "2016 – 2017",
            completed: true,
        },
        {
            id: "ufjf-dcc",
            institution: "UFJF",
            degree: "Ciência da Computação",
            period: "2008 – 2015",
            completed: false,
            note: "4 de 8 semestres",
        },
    ],

    certifications: [
        {
            id: "udemy-laravel",
            issuer: "Udemy",
            title: "API Rest com Laravel 9 (Eloquent ORM)",
            period: "mar/2023",
        },
        {
            id: "cod3r-react",
            issuer: "Cod3r",
            title: "React e Redux com TypeScript, Next, Node e MongoDB",
            period: "jun/2021",
        },
        {
            id: "solides-oratoria",
            issuer: "Sólides",
            title: "Oratória, comunicação e pitch",
            period: "ago/2019",
        },
        {
            id: "fundacao-estudar",
            issuer: "Fundação Estudar",
            title: "Produtividade e gestão de carreira",
            period: "ago/2018",
        },
    ],

    community: [
        {
            id: "codejr",
            title: "CodeJr — Empresa júnior de Computação da UFJF",
            role: "Analista de Qualidade e, em seguida, Diretor de Qualidade",
            period: "jul/2014 – fev/2016",
            detail:
                "Empresa júnior com 16 a 26 membros e cerca de 2 projetos por mês ao longo do período, incluindo um projeto que atravessou duas gestões. Como Analista de Qualidade, implantou rotinas de mapeamento de processos voltadas a regulamentações e certificações, com superação da meta de arrecadação do semestre, e integrou a equipe de desenvolvimento de software de um cliente da empresa júnior, conduzindo as reuniões de alinhamento de requisitos e entregas. Como Diretor de Qualidade, consolidou a documentação e os treinamentos internos e participou de treinamento de aplicabilidade da ISO. Coordenou a certificação ISO e foi um dos dois responsáveis pela apresentação dos pitches à FEJEMG no Processo Único de Federação (PUF).",
            pdfDetail:
                "Analista e depois Diretor de Qualidade. Mapeamento de processos, certificação ISO e apresentação dos pitches à FEJEMG no Processo Único de Federação (PUF).",
        },
        {
            id: "eventos",
            title: "Organização de eventos de tecnologia",
            period: "2014 – 2026",
            detail:
                "DevOpsDays Juiz de Fora (2025, 2026), Codexperience (2023, 2024, 2025), GDG (2014) e <bq>agendaTECH (1ª e 2ª edições).",
            pdfDetail:
                "DevOpsDays Juiz de Fora (2025, 2026), Codexperience (2023–2025), GDG (2014), <bq>agendaTECH.",
        },
        {
            id: "aiesec",
            title: "AIESEC Juiz de Fora",
            role: "Relações Internacionais Corporativas, Marketing e Finanças",
            period: "mai/2010 – set/2011",
            detail:
                "Vendas B2B junto ao terceiro setor da cidade para fechamento de contratos e captação de estudantes para programas de intercâmbio, em ambiente multicultural.",
            pdfDetail: "Relações Internacionais Corporativas, Marketing e Finanças.",
        },
    ],

    publications: [
        {
            id: "medium",
            title: "Medium — publicação técnica contínua",
            period: "desde 2014",
            detail: "Mais de 200 artigos publicados.",
            url: "https://medium.com/@douglasabnovato",
        },
        {
            id: "oficina",
            title: "Oficina da Net — coluna de tecnologia",
            period: "jan/2014 – jun/2015",
        },
    ],

    languages: [
        { id: "pt", language: "Português", level: "nativo" },
        { id: "en", language: "Inglês", level: "profissional" },
        { id: "es", language: "Espanhol", level: "básico" },
    ],
};
