import profileImg from '../../../assets/home/1-profile.jpg'
import devFull1 from '../../../assets/home/2-dev-fullstack-1.jpg'
import devFull2 from '../../../assets/home/2-dev-fullstack-2.jpg'
import learnCore from '../../../assets/home/3-learnTECH-1.jpg'
import learnBoot from '../../../assets/home/3-learnTECH-2.jpg'
import learnTools from '../../../assets/home/3-learnTECH-3.jpg'
import learnCareer from '../../../assets/home/3-learnTECH-4.jpg'
import voltaExp1 from '../../../assets/home/4-volta-express-brasil-1.jpg'
import voltaExp2 from '../../../assets/home/4-volta-express-brasil-2.jpg'
import byteclassImg from '../../../assets/home/5-byteclass-1.jpg'
import agendaTechImg from '../../../assets/home/6-bq-1.jpg'

export interface EcosystemItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  type: 'card' | 'grid' | 'modal';
  images?: string[];
  links: { label: string; url: string; external?: boolean }[];
  subItems?: { title: string; description: string; image: string; url: string }[];
  modalContent?: {
    subtitle: string;
    highlights: string[];
    objective: string;
  };
}

export const ecosystemData: EcosystemItem[] = [
  {
    id: 'profile', // Usado para o header
    badge: 'ARQUITETO DE SOFTWARE',
    title: 'Douglas A. B. Novato',
    description: 'Especializado em produtos digitais de alta performance, arquitetura de ecossistemas e liderança técnica.',
    type: 'card',
    images: [profileImg],
    links: []
  },
  {
    id: 'linkedin',
    badge: 'AUTORIDADE & POSIÇÃO',
    title: 'Desenvolvedor de Software Especializado em Produtos Digitais',
    description: 'Atuação especializada em produtos digitais, liderança técnica e delegação estratégica para agências.',
    type: 'card',
    images: [devFull1, devFull2],
    links: [{ label: 'Acessar meu LinkedIn', url: 'https://www.linkedin.com/in/douglasabnovato', external: true }]
  },
  {
    id: 'learntech',
    badge: 'EDUCATIONAL HUB',
    title: 'LearnTECH | Hub de Conteúdos',
    description: 'Ecossistema de educação em tecnologia estruturado em quatro frentes modulares.',
    type: 'grid',
    links: [],
    subItems: [
      { title: 'LearnTECH Core', description: 'Plataforma principal.', image: learnCore, url: '#' },
      { title: 'Bootcamps', description: 'Diário de imersões.', image: learnBoot, url: '#' },
      { title: 'Tools', description: 'Catálogo de ferramentas.', image: learnTools, url: '#' },
      { title: 'Career', description: 'Mapeamento de vagas.', image: learnCareer, url: '#' }
    ]
  },
  {
    id: 'voltaexpress',
    badge: 'LOGISTICS & STARTUP',
    title: 'Volta Express Brasil | Startup de Logística',
    description: 'Atuação como Especialista em Tecnologia unindo desenvolvimento, estratégia de plataforma e posicionamento digital.',
    type: 'card',
    images: [voltaExp1, voltaExp2],
    links: [
      { label: 'Landing Page', url: 'https://voltaexpress.com.br', external: true },
      { label: 'Plataforma', url: '#', external: false }
    ]
  },
  {
    id: 'byteclass',
    badge: 'PROGRAMMING SCHOOL',
    title: 'ByteClass Dev | Escola de Programação',
    description: 'Coordenação pedagógica, liderança técnica, desenvolvimento da plataforma e estratégia de marketing.',
    type: 'card',
    images: [byteclassImg],
    links: [{ label: 'Conhecer ByteClass', url: '#', external: true }]
  },
  {
    id: 'agendatech',
    badge: 'COMMUNITY & EVENT',
    title: '<bq> agendaTECH | Evento de Tecnologia',
    description: 'Conectando o ecossistema local, reduzindo a distância entre talentos e desafios reais de empresas.',
    type: 'modal',
    images: [agendaTechImg],
    links: [{ label: 'Ver Detalhes', url: '#', external: false }],
    modalContent: {
      subtitle: 'Conectando o ecossistema de tecnologia regional',
      objective: 'Aproximar talentos locais da realidade de mercado.',
      highlights: ['Networking real', 'Palestras práticas', 'Integração regional']
    }
  }
];