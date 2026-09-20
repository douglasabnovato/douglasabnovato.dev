import devFull1 from '../../../assets/home/2-dev-fullstack-1.jpg'
import learnCore from '../../../assets/home/3-learnTECH-1.jpg'
import learnBoot from '../../../assets/home/3-learnTECH-2.jpg'
import learnTools from '../../../assets/home/3-learnTECH-3.jpg'
import learnCareer from '../../../assets/home/3-learnTECH-4.jpg'
import voltaExp1 from '../../../assets/home/4-volta-express-brasil-1.jpg'
import byteclassImg from '../../../assets/home/5-byteclass-1.jpg'
import agendaTechImg from '../../../assets/home/6-bq-1.jpg'

/**
 * Frentes de atuação exibidas na Home.
 *
 * `level` define a hierarquia visual e NÃO é decorativo:
 *   destaque → imagem 16:9 em largura total, cor plena
 *   grupo    → um contexto com filhos em miniatura 3:2
 *   frente   → imagem 4:3 em três colunas, levemente dessaturada
 *
 * `repo` é o nome do repositório no GitHub. Quando preenchido, a Home mostra
 * a data da última atualização daquele projeto, vinda da API. Deixe vazio
 * enquanto não souber — o item simplesmente não exibe a data.
 */

export type EcosystemLevel = 'destaque' | 'grupo' | 'frente'
export type ProjectStatus = 'MVP no ar' | 'Em desenvolvimento' | 'Material de curso'

export interface EcosystemLink {
  label: string
  url: string
}

export interface EcosystemChild {
  id: string
  title: string
  description: string
  image: string
  url: string
  repo?: string
}

export interface EcosystemItem {
  id: string
  level: EcosystemLevel
  /** Rótulo curto, em português, acima do título. */
  kicker: string
  title: string
  description: string
  status?: ProjectStatus
  /** Fato verificável de terceiro, quando houver. */
  note?: string
  image?: string
  repo?: string
  links: EcosystemLink[]
  children?: EcosystemChild[]
}

/** Frase de abertura da Home. Primeira pessoa, sem saudação genérica. */
export const homeIntro =
  '"Desenvolvo produtos digitais que saem do papel e chegam ao usuário. Uso tecnologia para ampliar o alcance de um negócio — hoje, em logística e em educação."'

export const ecosystemData: EcosystemItem[] = [
  {
    id: 'voltaexpress',
    level: 'destaque',
    kicker: 'Startup · logística',
    title: 'Volta Express Brasil',
    description:
      'Plataforma de logística que conduzo desde a ideação, hoje em validação. Passou por 13 versões e 3 pivotagens.',
    status: 'MVP no ar',
    note: 'Aprovada em setembro de 2026 na incubação do Critt — Centro Regional de Inovação e Transferência de Tecnologia da UFJF.',
    image: voltaExp1,
    // repo: 'nome-do-repositorio',
    links: [
      { label: 'Site', url: 'https://voltaexpress.com.br' },
      // Preencha a URL da plataforma. Enquanto vazia, o link não aparece.
      { label: 'Plataforma', url: '' },
    ],
  },
  {
    id: 'learntech',
    level: 'grupo',
    kicker: 'Projeto pessoal',
    title: 'learnTECH',
    description:
      'Ecossistema próprio de educação em tecnologia, em quatro frentes. Recebe atualizações semanais.',
    status: 'Em desenvolvimento',
    links: [],
    children: [
      {
        id: 'lt-core',
        title: 'Core',
        description: 'Plataforma principal',
        image: learnCore,
        url: 'https://learn-tech-pied.vercel.app/',
        // repo: 'learn-tech',
      },
      {
        id: 'lt-bootcamps',
        title: 'Bootcamps',
        description: 'Retrospectiva de eventos',
        image: learnBoot,
        url: 'https://bootcamps-dun.vercel.app/',
        // repo: 'bootcamps',
      },
      {
        id: 'lt-tools',
        title: 'Tools',
        description: 'Catálogo de ferramentas',
        image: learnTools,
        url: 'https://douglasabnovato.github.io/tools/',
        // repo: 'tools',
      },
      {
        id: 'lt-career',
        title: 'Career',
        description: 'Mapeamento de vagas',
        image: learnCareer,
        url: 'https://douglasabnovato.github.io/career/',
        // repo: 'career',
      },
    ],
  },
  {
    id: 'byteclass',
    level: 'frente',
    kicker: 'Escola de programação',
    title: 'ByteClass',
    description:
      'Coordeno a área de educação e tecnologia: equipe de instrutores e conteudistas, produção de cursos e trilhas.',
    image: byteclassImg,
    links: [{ label: 'byteclass.dev', url: 'https://byteclass.dev' }],
  },
  {
    id: 'agendatech',
    level: 'frente',
    kicker: 'Evento de tecnologia',
    title: '<bq>agendaTECH',
    description:
      'Evento que organizo em Juiz de Fora, aproximando quem estuda tecnologia de quem contrata.',
    image: agendaTechImg,
    // Preencha a URL do Sympla. Enquanto vazia, o link não aparece.
    links: [{ label: 'Inscrever-se no evento', url: '' }],
  },
  {
    id: 'linkedin',
    level: 'frente',
    kicker: 'Trabalho CLT',
    title: 'Histórico profissional',
    description:
      'Registro público dos vínculos e das empresas por onde passei, com as datas de cada cargo.',
    image: devFull1,
    links: [{ label: 'Ver no LinkedIn', url: 'https://www.linkedin.com/in/douglasabnovato' }],
  },
]