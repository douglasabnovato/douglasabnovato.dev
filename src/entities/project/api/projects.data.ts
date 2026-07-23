import type { CuratedProject } from "../model/types";

export const featuredProjects: CuratedProject[] = [
    { id: "learn-tech", title: "Learn TECH", description: "Plataforma principal do ecossistema — LXP e hub de engenharia da ByteClass.", url: "https://learn-tech-pied.vercel.app", featured: true, accentColor: "#6d63d8" },
    { id: "bootcamps", title: "Eventos de Tecnologia", description: "Retrospectiva e roteiro de bootcamps, formações e comunidades.", url: "https://bootcamps-dun.vercel.app", featured: true, accentColor: "#00c853" },
    { id: "tools", title: "Ferramentas para Devs", description: "Catálogo curado de ferramentas e hospedagens.", url: "https://douglasabnovato.github.io/tools", featured: true, accentColor: "#0ad2ff" },
    { id: "doctor-care", title: "Site para DoctorCare", description: "Landing page institucional para profissionais autônomos da saúde.", url: "https://douglasabnovato.github.io/doctor-care", featured: true },
    { id: "cracha-virtual", title: "Crachá Virtual", description: "Gerador de crachá digital mobile-first com links sociais.", url: "https://douglasabnovato.github.io/cracha-virtual", featured: true },
    { id: "career", title: "Para a Sua Carreira Tech", description: "Oportunidades, empresas e perfis de devs.", url: "https://douglasabnovato.github.io/career", featured: true, accentColor: "#f97316" },
];

// ⚠️ incompleto — só tenho os nomes do Linktree, faltam URL e descrição reais
export const mvpProjects: CuratedProject[] = [
    { id: "flex-turismos", title: "Flex Turismos", description: "", url: "", featured: false },
    { id: "incrivel-quiz", title: "Incrível Quiz", description: "", url: "", featured: false },
    { id: "doctor-care-mvp", title: "Doctor Care", description: "", url: "", featured: false },
    { id: "meu-portfolio", title: "Meu portfólio", description: "", url: "", featured: false },
    { id: "aplicativos", title: "Aplicativos", description: "", url: "", featured: false },
    { id: "switcher", title: "Switcher", description: "", url: "", featured: false },
    { id: "moveis-planejados", title: "Móveis Planejados", description: "", url: "", featured: false },
    { id: "devcast-player", title: "DevCast Player", description: "", url: "", featured: false },
    { id: "countdown", title: "Countdown", description: "", url: "", featured: false },
    { id: "sidebar", title: "Sidebar", description: "", url: "", featured: false },
];