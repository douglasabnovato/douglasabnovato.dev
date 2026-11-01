/**
 * Curadoria de estudo e ideias de projetos. Cada item nasce de uma issue do
 * GitHub, com texto reescrito: sem nomes de contatos, clientes ou links privados.
 *
 * O status descreve o que existe de fato: nenhum item significa curso concluído,
 * projeto entregue ou cliente atendido.
 */

export type StatusItem = 'a explorar' | 'registro' | 'ideia'

export type TemaCuradoria =
  | 'Escolas e cursos'
  | 'Faculdades e formação'
  | 'Oportunidades e empresas'
  | 'Eventos e comunidade'
  | 'Perfis'
  | 'Ferramentas e produtos'
  | 'Produto e carreira'
  | 'Processo'
  | 'Sites institucionais'
  | 'Sistemas e painéis'
  | 'Projetos de treino'

export interface ItemCuradoria {
  issue: number
  titulo: string
  tema: TemaCuradoria
  status: StatusItem
  resumo: string
  /** Site público conferido em 01/11/2026. */
  link?: string
}

export const REPO_ISSUES = 'https://github.com/douglasabnovato/douglasabnovato.dev/issues'

const curso = (issue: number, titulo: string, resumo: string, link?: string): ItemCuradoria => ({
  issue, titulo, tema: 'Escolas e cursos', status: 'a explorar', resumo, link,
})
const faculdade = (issue: number, titulo: string, resumo: string, link?: string): ItemCuradoria => ({
  issue, titulo, tema: 'Faculdades e formação', status: 'a explorar', resumo, link,
})
const oportunidade = (issue: number, titulo: string, resumo: string, link?: string): ItemCuradoria => ({
  issue, titulo, tema: 'Oportunidades e empresas', status: 'registro', resumo, link,
})
const evento = (issue: number, titulo: string, resumo: string, link?: string): ItemCuradoria => ({
  issue, titulo, tema: 'Eventos e comunidade', status: 'registro', resumo, link,
})

export const curadoria: ItemCuradoria[] = [
  curso(30, 'Voitto', 'Formações de engenharia fullstack e Lean Seis Sigma, para registrar estudos e projetos.', 'https://voitto.com.br/'),
  curso(39, 'Desafios e trilhas de desenvolvimento', 'Lista de trilhas gratuitas e roadmaps para praticar com projetos originais.', 'https://roadmap.sh/'),
  curso(72, 'Playlist de hard skills', 'Selecionar canais de desenvolvimento e resumir vídeos de cada um.'),
  curso(77, 'Formação em Canva', 'Praticar a criação de landing pages.'),
  curso(78, 'Formação em Figma', 'Praticar a criação de landing pages a partir de vídeos selecionados.', 'https://www.figma.com/'),
  curso(80, 'Formação em JavaScript', 'Estudar os fundamentos e criar projetos de prática.'),
  curso(108, 'Plataformas de formação', 'Grupo que reúne as plataformas usadas para estudar e inspirar conteúdos.'),
  curso(109, 'Fundação Bradesco', 'Entender quais cursos da plataforma fazem sentido e experimentar um.'),
  curso(110, 'Hora de Codar', 'Escola de programação, com o programa Domine ReactJS.', 'https://www.horadecodar.com.br/'),
  curso(111, 'EBAC', 'Cursos e eventos de programação e de produto.', 'https://ebac.art.br/'),
  curso(112, 'Alura', 'Avaliar os cursos da plataforma e a imersão de agentes de IA.', 'https://www.alura.com.br/'),
  curso(113, 'Sujeito Programador', 'Avaliar os cursos e o artigo de dicas para iniciantes.'),
  curso(117, 'DevMedia', 'Conteúdos de formação gratuitos e e-book.', 'https://www.devmedia.com.br/'),
  curso(119, 'Curso em Vídeo', 'Conteúdos gratuitos de programação.', 'https://www.cursoemvideo.com/'),
  curso(120, 'IA: prompts e agentes', 'Pesquisar treinamentos e praticar a implementação.'),
  curso(121, 'Hashtag Programação', 'Conteúdos gratuitos de programação.', 'https://www.hashtagtreinamentos.com/'),
  curso(126, 'Codecon', 'Plataforma para pessoas desenvolvedoras.', 'https://codecon.dev/'),
  curso(130, 'DIO', 'Escola de programação, com trilha de frontend.', 'https://www.dio.me/'),
  curso(131, 'freeCodeCamp', 'Escola de programação gratuita.', 'https://www.freecodecamp.org/'),
  curso(135, 'NoCode StartUp', 'Escola de produtos digitais.', 'https://nocodestartup.io/'),
  curso(139, 'DNV Academy', 'Analisar a grade, a experiência da plataforma e a agenda de eventos.'),
  curso(143, 'PycodeBR', 'Conteúdos de programação em Python.', 'https://pycodebr.com.br/'),
  curso(149, 'W3Schools', 'Teoria e prática de HTML, CSS, JavaScript, React, Node.js e SQL.', 'https://www.w3schools.com/'),
  curso(163, 'Copywriting para campanhas', 'Estudar o tema e treinar um assistente de IA.'),
  faculdade(124, 'Faculdade Impacta', 'Faculdade de tecnologia.', 'https://www.impacta.edu.br/'),
  faculdade(125, 'Universidades federais', 'Cursos on-line gratuitos.'),
  faculdade(127, 'Estácio Juiz de Fora', 'Faculdade com unidade em Juiz de Fora.', 'https://estacio.br/'),
  faculdade(171, 'Pós-graduação e certificações', 'Comparar especialização acadêmica e certificação de mercado.'),
  oportunidade(115, 'TIVIT', 'Programa de trainee SAP, anotado em 2025.', 'https://www.tivit.com/'),
  oportunidade(116, 'Serasa Experian', 'Programa de trainee e vagas, anotados em 2025.', 'https://www.serasaexperian.com.br/carreiras/'),
  oportunidade(123, 'iFood', 'Programas de vagas, anotados em 2025.', 'https://carreiras.ifood.com.br/'),
  oportunidade(133, 'Programas de trainee', 'Pesquisa de programas em Juiz de Fora, Minas Gerais e Brasil, em 2025.'),
  oportunidade(134, 'Kaptas', 'Plataforma de recrutamento e seleção.'),
  oportunidade(136, 'Gateware', 'Programas de trainee e vagas, anotados em 2025.', 'https://www.gateware.com.br/'),
  oportunidade(137, 'Tecnospeed', 'Oportunidade anotada em 2025.', 'https://tecnospeed.com.br/'),
  oportunidade(138, 'Pagar.me', 'Oportunidade anotada em 2025.', 'https://pagar.me/'),
  oportunidade(140, 'Codgo.x', 'Oportunidade anotada em 2025.'),
  oportunidade(145, 'Neon', 'Oportunidade anotada em 2025.', 'https://neon.com.br/'),
  evento(141, 'Rinha de Backend', 'Evento anotado em 2025.', 'https://rinhadebackend.com.br/'),
  evento(142, 'JF Summit', 'Edições do evento, com detalhes em outra issue.'),
  evento(154, 'Chopp da TI: apresentação', 'Preparação de apresentação, com o objetivo tratado em outra issue.'),
  evento(157, 'Workshop de Lovable da PM3', 'Workshop de setembro de 2025, com acesso já encerrado.', 'https://pm3.com.br/'),
  evento(158, 'Live sobre hero sections', 'Live de 2025 sobre a diagramação de landing pages.'),
  evento(167, 'Palestra sobre comunidade e mentoria', 'Roteiro da documentação de uma palestra no Chopp da TI.'),
  { issue: 122, titulo: 'Perfis de carreira', tema: 'Perfis', status: 'a explorar', resumo: 'Profissionais que ajudam quem está avançando na carreira.' },
  { issue: 128, titulo: 'matheusmarques.dev', tema: 'Perfis', status: 'a explorar', resumo: 'Referência para estudar.', link: 'https://matheusmarques.dev/' },
  { issue: 129, titulo: 'devsteph', tema: 'Perfis', status: 'a explorar', resumo: 'Conteúdo sobre como conquistar uma vaga.' },
  { issue: 52, titulo: 'Google Workspace e Apps Script', tema: 'Ferramentas e produtos', status: 'a explorar', resumo: 'Pequenas automações para problemas do dia a dia.', link: 'https://developers.google.com/learn' },
  { issue: 53, titulo: 'Microsoft 365 e Power Platform', tema: 'Ferramentas e produtos', status: 'a explorar', resumo: 'Automações, aplicativos internos e dashboards.', link: 'https://learn.microsoft.com/' },
  { issue: 114, titulo: 'Sistema CNM', tema: 'Ferramentas e produtos', status: 'a explorar', resumo: 'Estudar como funciona uma plataforma de PDV.' },
  { issue: 118, titulo: 'Software House Exponencial', tema: 'Ferramentas e produtos', status: 'a explorar', resumo: 'Fluxo de implantação para software houses.' },
  { issue: 132, titulo: 'Falaê', tema: 'Ferramentas e produtos', status: 'a explorar', resumo: 'Plataforma de pesquisa para o setor de alimentação.', link: 'https://www.falae.app/' },
  { issue: 164, titulo: 'Product Manager e Product Owner', tema: 'Produto e carreira', status: 'a explorar', resumo: 'Papéis, rotina, competências e fontes de estudo.' },
  { issue: 165, titulo: 'MVP: investigação e validação', tema: 'Produto e carreira', status: 'a explorar', resumo: 'Frameworks, ferramentas e métricas para validar hipóteses.' },
  { issue: 33, titulo: 'Governança do fluxo de trabalho', tema: 'Processo', status: 'registro', resumo: 'Modelo de ciclo de vida de issues, branches e comunicação.' },
]

export const ideias: ItemCuradoria[] = [
  { issue: 18, titulo: 'Sites institucionais e landing pages', tema: 'Sites institucionais', status: 'ideia', resumo: 'Banco de temas e tutoriais para sites de negócios locais.' },
  { issue: 48, titulo: 'Site de comunidade local', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site institucional para uma comunidade de Juiz de Fora.' },
  { issue: 81, titulo: 'Plataforma de delivery', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site institucional a partir de um tutorial.' },
  { issue: 82, titulo: 'Detalhes de produto', tema: 'Sites institucionais', status: 'ideia', resumo: 'Vitrine de produtos com sacola de compras.' },
  { issue: 83, titulo: 'Bebidas e café', tema: 'Sites institucionais', status: 'ideia', resumo: 'Página de detalhes de produtos.' },
  { issue: 84, titulo: 'Presentes', tema: 'Sites institucionais', status: 'ideia', resumo: 'Página de detalhes de produtos.' },
  { issue: 86, titulo: 'Instituição de ensino', tema: 'Sites institucionais', status: 'ideia', resumo: 'Página com os detalhes da instituição.' },
  { issue: 87, titulo: 'E-commerce em React', tema: 'Sites institucionais', status: 'ideia', resumo: 'Exposição das informações dos produtos.' },
  { issue: 95, titulo: 'Engenharia civil: anúncio e portfólio', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site de anúncio e portfólio para esse tipo de serviço.' },
  { issue: 96, titulo: 'Corretagem de imóveis: anúncio e portfólio', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site de anúncio e portfólio para esse tipo de serviço.' },
  { issue: 97, titulo: 'Odontologia: consultoria', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site para apresentar uma consultoria.' },
  { issue: 98, titulo: 'Contabilidade: anúncio e portfólio', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site de anúncio e portfólio para esse tipo de serviço.' },
  { issue: 99, titulo: 'Serviços artesanais', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site para serviços artesanais e manuais.' },
  { issue: 100, titulo: 'Serviço de entrega', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site de anúncio para entregas de motoboy.' },
  { issue: 155, titulo: 'Engenharia civil: site institucional', tema: 'Sites institucionais', status: 'ideia', resumo: 'Site institucional com validação junto a um interessado.' },
  { issue: 168, titulo: 'Clínica de fisioterapia', tema: 'Sites institucionais', status: 'ideia', resumo: 'Especificação de landing page com agendamento por WhatsApp.' },
  { issue: 17, titulo: 'Gestão de frota', tema: 'Sistemas e painéis', status: 'ideia', resumo: 'Algoritmos e processamento para aplicativos comerciais.' },
  { issue: 43, titulo: 'Agro: painel CRUD', tema: 'Sistemas e painéis', status: 'ideia', resumo: 'Desafio a descrever, com repositório próprio.' },
  { issue: 44, titulo: 'Marketplace: frontend', tema: 'Sistemas e painéis', status: 'ideia', resumo: 'Tarefas de frontend com referências de design.' },
  { issue: 45, titulo: 'Peça Agora: painel CRUD', tema: 'Sistemas e painéis', status: 'ideia', resumo: 'Título registrado, ainda sem descrição.' },
  { issue: 50, titulo: 'Plataforma de treinamentos', tema: 'Sistemas e painéis', status: 'ideia', resumo: 'Expor treinamentos com design responsivo.' },
  { issue: 55, titulo: 'Revista digital', tema: 'Sistemas e painéis', status: 'ideia', resumo: 'Versão digital de um tabloide impresso.' },
  { issue: 161, titulo: 'Sistema hospitalar', tema: 'Sistemas e painéis', status: 'ideia', resumo: 'Funcionalidades a especificar.' },
  { issue: 54, titulo: 'Projetos originais a partir de mockups', tema: 'Projetos de treino', status: 'ideia', resumo: 'Analisar sites públicos e criar projetos autorais.' },
  { issue: 60, titulo: 'Projetos de UX', tema: 'Projetos de treino', status: 'ideia', resumo: 'Três projetos seguindo instruções de cursos.' },
  { issue: 153, titulo: 'Comunidade de xadrez', tema: 'Projetos de treino', status: 'ideia', resumo: 'Interação entre membros de um clube de Juiz de Fora.' },
]

export interface CanalDesign {
  nome: string
  url: string
  /** Tecnologia e quantas vezes ela aparece nos títulos dos 15 vídeos mais recentes. */
  tecnologias: [string, number][]
}

const canal = (nome: string, tecnologias: [string, number][]): CanalDesign => ({
  nome,
  url: `https://www.youtube.com/@${nome}`,
  tecnologias,
})

/**
 * Canais que responderam em 01/11/2026, com a contagem feita nos títulos do feed público.
 * Os vídeos não foram assistidos; x.developerr e K2infocom responderam 404 e saíram da lista.
 */
export const canaisDesign: CanalDesign[] = [
  canal('Bedimcode', [['HTML', 15], ['CSS', 15], ['JavaScript', 15]]),
  canal('CarpoolVenom', []),
  canal('CodingNepal', [['TypeScript', 3], ['Figma', 1]]),
  canal('CodingLabYT', [['React', 1]]),
  canal('MrWebDesignerAnas', [['HTML', 7], ['CSS', 7], ['PHP', 4], ['GSAP', 1], ['Python', 1]]),
  canal('GreatStackDev', [['CSS', 12], ['HTML', 10], ['JavaScript', 3], ['React', 1]]),
  canal('gorkcoder', [['React', 10], ['CSS', 6], ['Tailwind', 5], ['Node', 3], ['HTML', 1], ['JavaScript', 1]]),
  canal('codewithsadee', [['React', 6], ['TypeScript', 2], ['Node', 1]]),
  canal('FastCodeWeb', [['Python', 10], ['React', 5]]),
  canal('codehal', [['HTML', 8], ['CSS', 8], ['JavaScript', 5], ['PHP', 3], ['GSAP', 2]]),
  canal('Tech2etc', [['CSS', 4], ['HTML', 3], ['JavaScript', 3]]),
]

/** Issue de origem da lista de canais. */
export const ISSUE_CANAIS = 201
